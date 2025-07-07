import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ForceGraph2D} from "react-force-graph";

import {v4 as uuidv4} from 'uuid';
import {draggggggg, removeNodeAndRelatedLinks} from "../../util/helperfile";
import {ee, l} from "../../util/log11";
import {connect} from "react-redux";
import {useDispatch} from 'react-redux';
import {ADD_NODE, CHANGE_LINKS} from "../../actions/types";


function BuildGraph(props) {

    const dispatch = useDispatch();
    let c = props.all33.settings
    const dd = props.all33.dd
    // l("BuildGraph props",  dd)
    // const dd = props.dd
    let setdd = props.setdd
    let repo = props.repo
    let rr = props.all33
    l("BuildGraph props1", props)

    // l("we're using a ref because we want to store something and some time not to rerender the whole thing.")
    const fgRef = props.fgRef


    const collapseddd = props.collapseddd
    const updateGraphData = props.updateGraphData
    const objectToBeInspected = props.objectToBeInspected
    const setObjectToBeInspected = props.setObjectToBeInspected
    const fixing = props.fixing
    const restrictdd = props.restrictdd
    const istreemaxlevelrestricted = props.istreemaxlevelrestricted
    const graphData = istreemaxlevelrestricted ?
        restrictdd :
        1
            ?
            collapseddd
            :
            dd
    const [hoverNode, setHoverNode] = useState(null);

    const paintRing = useCallback((node, ctx) => {

        if (!(node === objectToBeInspected || node.collapsed)) {
            return
        }
        const NODE_R = 8;

        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_R * 1.4, 0, 2 * Math.PI, false);

        if (0) {
            ctx.fillStyle = node === !hoverNode ? 'red' : 'orange';
            ctx.fill();
        } else {
            ctx.strokeStyle = node === objectToBeInspected ? 'orange' : 'red'; // Notice the corrected condition check

            // Set the line width of the border
            ctx.lineWidth = 3; // You can adjust the border thickness by changing the value

            // Draw the border
            ctx.stroke();

        }

        if (node.collapsed) {
            ctx.fillStyle = 'red';
            ctx.fill();
        }


    }, [objectToBeInspected]);


    const nodeIdCounter = useRef(0)

    let nc = dd.nodes
    let lc = dd.links

    let a = c.TwoD_repulsive_Force_Scale
    useEffect(() => {
        if (fgRef.current) {
            fgRef.current.d3Force('charge').strength(a)
            fgRef.current.d3ReheatSimulation();
            l("updateddddddddddd")
        } else {
            ee("not updateddddddddddd")
        }
    }, [a]);


    const distance = (node1, node2) => {
        return Math.sqrt(Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2));
    };

    const rename = (nodeOrLink, type) => {
        let value = prompt('Name this ' + type + ':', nodeOrLink.name);
        if (!value) {
            return;
        }
        nodeOrLink.name = value;
        updateGraphData();
    };

    const removeLink = link => {
        if (!link.id) {
            l("link has no id", link);
            return;
        }
        const remaininglinks = dd.links.filter(l => l.id !== link.id);
        l("remaining links length", remaininglinks.length, "link id", link.id, "dd links length", dd.links.length)
        setdd(
            prev => {
                return {...prev, links: remaininglinks}
            }
        );
        dispatch({type: CHANGE_LINKS, payload: remaininglinks})

    };


    const removeNode = node => {
        if (1) {
            removeNodeAndRelatedLinks(dd, node, setdd, setObjectToBeInspected);
        } else {
            l("before remove node: lc length", lc.length, "nc length", nc.length)
            let lc2 = lc.filter(
                link => {
                    l("link source id", link.source.id, "link target id", link.target.id, "node id", node.id)
                    let noteBelongsToSourceOrTargetOfAnyLink = link.source === node || link.target === node
                    let noteBelongsToSourceOrTargetOfAnyLink2 = link.source.id === node.id || link.target.id === node.id
                    let shouldRemove = noteBelongsToSourceOrTargetOfAnyLink || noteBelongsToSourceOrTargetOfAnyLink2
                    return (shouldRemove)
                }
            );

            l("lc2 length", lc2.length)

            lc2.forEach(link => removeLink(link));

            nc.splice(nc.indexOf(node), 1);
            l("after remove node: lc length", lc.length, "nc length", nc.length)

        }

    };


    ////////////////////////////////////////////////////////////////////////////////
    const Focus = useCallback(node => {
        // Aim at node from outside it
        let m = "2d"
        if (m == "3d") {
            const distance = 40;
            const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
            fgRef.current.cameraPosition(
                {x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio}, // new position
                node, // lookAt ({ x, y, z })
                3000  // ms transition duration
            );
        } else {
            fgRef.current.centerAt(node.x, node.y, 1000);
            fgRef.current.zoom(8, 2000);
        }
    }, [fgRef]);


    const Normalclick = (node) => {
        console.log("received node click", node)
        if (1) {
            if (Object.keys(objectToBeInspected).length === 0) {
                l("setting objectToBeInspected", node)

                setObjectToBeInspected(node)


                setHoverNode(node)
            } else {
                if (objectToBeInspected === node) {
                    l("clicked on the same node, unsetting objectToBeInspected")
                    setObjectToBeInspected({})
                } else {
                    // Check if the link already exists
                    let shouldAddLink = false;
                    // check if any link in the links have the same source and target.
                    shouldAddLink = !lc.some(link => {
                            let lll = (link.source.id === objectToBeInspected.id && link.target.id === node.id) || (link.source.id === node.id && link.target.id === objectToBeInspected.id)
                            if (lll) {
                                l("link already exists!!!!!!!!!", link.source.id, objectToBeInspected.id, link.target.id, node.id)
                            }
                            return lll
                        }
                    )
                    if (shouldAddLink) {
                        let linkId = uuidv4()
                        l("objectToBeInspected.id", objectToBeInspected.id, "node.id", node.id)
                        const interimLink = {
                            id: linkId,
                            source: objectToBeInspected.id,
                            target: node.id,
                            name: 'link_' + linkId
                        };
                        setdd(prevNc => ({
                            ...prevNc, // Spread to copy other properties of nc, if there are any
                            links: [...prevNc.links, interimLink], // Create a new array with all old nodes plus the new one
                        }));
                        setObjectToBeInspected({})
                    }


                }
            }

        } else {
            rename(node, 'nodeeeeeee')
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    const dragSourceNode = useRef(null)
    const linkIdCounter = useRef(0)
    const interimLink = useRef(null)
    const dragFun = draggggggg(linkIdCounter, interimLink, dd.links, updateGraphData, removeLink, dragSourceNode, dd.nodes, distance);
    /////////////////////////////////////////////////


    let enableDragging = false


    const nodeCanvasObject = (node, ctx, globalScale) => {

        if (1) {
            paintRing(node, ctx);
        }
        if (1) {
            const label2 = !node.name ? node.id : node.name;

            const replaceStringAinB = (strA, strB) => {
                // Check if stringB starts with stringA
                if (strB.startsWith(strA)) {
                    // Replace stringA with '1' in stringB
                    return strB.replace(strA, 'e');
                }
                return strB; // No change if stringB does not start with stringA
            };

            let label = replaceStringAinB("everythingallaccount", label2)

            const fontSize = node_font_size / (globalScale * global_scale_adjustment_coefficient);
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding


            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';


            let BackgroundColor = false
            if (BackgroundColor) {
                // This fill a white background to text
                // ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                // ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

                ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
                ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
            }
            ctx.fillStyle = 'white'; // Set text color to white here
            // ctx.fillStyle = node.color;
            ctx.fillText(label, node.x, node.y);

            node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint

        }


    }


    let onBackgroundClick = event => {
        console.log("received background click")
        //https://github.com/vasturiano/react-force-graph/issues/378
        // use screen2GraphCoords to get the graph coordinates of the click
        let coords = fgRef.current.screen2GraphCoords(event.layerX, event.layerY);
        console.log("coords", coords, "currentNodeId", nodeIdCounter)
        let nodeId = nodeIdCounter.current++;
        const newNode = {
            id: uuidv4(), // Assuming uuidv4 is correctly imported and used to generate unique IDs
            x: coords.x,
            y: coords.y,
            name: `node_${nodeId}`,
            ...(fixing && {fx: coords.x, fy: coords.y})
        };
        dispatch({type: ADD_NODE, payload: newNode});
        updateGraphData();
    }


    let node_font_size = c.TwoD_node_font_size
    let global_scale_adjustment_coefficient = c.TwoD_global_scale_adjustment_coefficient
    let linkWidth = c.TwoD_linkWidth
    let linkDirectionalParticles = c.TwoD_linkDirectionalParticles
    let linkDirectionalParticleWidth = c.TwoD_linkDirectionalParticleWidth
    let linkDirectionalParticleSpeed = c.TwoD_linkDirectionalParticleSpeed

    let onNodeDrag = enableDragging ? dragFun : undefined;
    let onNodeDragEnd = enableDragging
        ?
        () => {
            dragSourceNode.current = null;
            interimLink.current = null;
            updateGraphData();

        } :
        undefined;
    let onNodeClick = 0 ? Focus : Normalclick;
    let onNodeRightClick = (node) => {
        if (1) {
            removeNode(node)
        }
    };
    let onLinkClick = (link) => {
        if (0) {
            rename(link, 'link')
        }
    };
    let onLinkRightClick = (link) => removeLink(link);
    return <>


        <div style={{
            // border: "3px solid green",
        }}>
            <ForceGraph2D

                ref={fgRef}

                graphData={graphData}

                //drag

                onNodeDrag={onNodeDrag}
                onNodeDragEnd={onNodeDragEnd}

                //click

                onNodeClick={onNodeClick}
                onNodeRightClick={onNodeRightClick}
                onLinkClick={onLinkClick}
                onLinkRightClick={onLinkRightClick}
                onBackgroundClick={onBackgroundClick}

                //links
                linkDirectionalArrowLength={1 ? undefined : 8}
                linkDirectionalArrowRelPos={1 ? undefined : 1}

                linkColor={link => link === interimLink.current ? 'orange' : '#bbbbbb'}
                linkLineDash={link => link === interimLink.current ? [2, 2] : []}

                linkWidth={linkWidth}
                linkDirectionalParticles={linkDirectionalParticles}
                linkDirectionalParticleWidth={linkDirectionalParticleWidth}
                linkDirectionalParticleSpeed={linkDirectionalParticleSpeed}


                // nodes

                nodeCanvasObjectMode={
                    node => {
                        if (0) {
                            return objectToBeInspected === node
                                ?
                                'before'
                                :
                                "replace"
                        } else {
                            return 'replace'
                        }
                    }
                }

                nodeCanvasObject={
                    nodeCanvasObject
                }

                nodePointerAreaPaint={(node, color, ctx) => {
                    ctx.fillStyle = color;
                    const bckgDimensions = node.__bckgDimensions;
                    bckgDimensions && ctx.fillRect(
                        node.x - bckgDimensions[0] / 2,
                        node.y - bckgDimensions[1] / 2,
                        ...bckgDimensions
                    );
                }}
            />
        </div>
    </>

}

export default connect(state => state)(BuildGraph);
