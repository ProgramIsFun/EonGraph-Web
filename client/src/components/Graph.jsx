import React, {useEffect, useMemo, useRef, useState} from "react";
import ThreeD from "./MainGraphDir/ThreeD";
import VR from "./MainGraphDir/VR";
import {dbbbbb, repoooooo} from "../autil/firebase/firebase";

import * as firebase from 'firebase/app'
import {calculateCollapseddd, datassss, keydownnnnnn, rawdata} from "../autil/helperfile";

import TwoD from "./MainGraphDir/TwoD";
import FloatingControlPanel from "./widgets/ControlPanel";
import {v4 as uuidv4} from "uuid";
import ObjectTable from "./widgets/ObjectTable";
import _ from "lodash";
import {l} from "../autil/log11";
import {connect, useDispatch} from "react-redux";
import {CHANGE_DATA} from "../actions/types";


function Graph(props) {
    const dispatch = useDispatch();

    const [globalscale, setglobalscale] = useState(1)
    const [fixing, setFixing] = useState(false);
    const [dd2, setdd] = useState(
        {nodes: [], links: []}
    )
    let all33 = props.all33
    let dd = all33.dd
    let nc = dd.nodes
    let lc = dd.links

    const [restrictdd, setrestrictdd] = useState(
        {nodes: [], links: []}
    )
    const [istreemaxlevelrestricted, setistreemaxlevelrestricted] = useState(false)
    const [treemaxlevel, settreemaxlevel] = useState(3)

    let graphtypeee = all33.graphtypeee;
    const [repo, setrepo] = useState(0)
    const [notice, setnotice] = useState("")

    const [fileContent, setFileContent] = useState("aaaa");
    const [fileContent2, setFileContent2] = useState("aaaabbbbbb");

    let localbackendurl = all33.localbackendurl;
    let remotebackendurl = all33.remotebackendurl;
    const [useremote2, setUseremote] = useState(false);
    let useremote = all33.useremote;
    const [search, setSearch] = useState("")
    const [filterdd, setFilterdd] = useState([])
    const [objectToBeInspected, setObjectToBeInspected] = useState({})

    const collapseddd = useMemo(
        calculateCollapseddd(dd),
        [dd]
    );
    l("collapseddd is now ", collapseddd)
    useEffect(() => {
        if (istreemaxlevelrestricted) {

            if (dd.nodes.length === 0) {
                return
            }

            const maxDepth = treemaxlevel;
            const levelNodes = []; // Nodes to include up to the maxDepth level
            const levelLinks = []; // Links to include up to the maxDepth level
            const visited = new Set(); // To keep track of visited nodes

            const queue = [{id: 'root', depth: 1}];

            while (queue.length > 0) {
                const {id, depth} = queue.shift(); // Get the first item in the queue

                if (!visited.has(id)
                    &&
                    depth <= maxDepth   /////////////////////////////////////
                ) {
                    visited.add(id);
                    levelNodes.push(dd.nodes.find(n => n.id === id));

                    // Find and queue all direct children of this node for the next level
                    const childrenLinks = dd.links.filter(link => link.source === id);
                    levelLinks.push(...childrenLinks);

                    childrenLinks.forEach(link => {
                        const childNode = dd.nodes.find(n => n.id === link.target);
                        if (childNode && !visited.has(childNode.id)) {
                            queue.push({id: childNode.id, depth: depth + 1});
                        }
                    });
                }
            }

            // Return a graph object only containing the levels up to maxDepth
            let ddddddddd = {
                nodes: levelNodes, links: levelLinks.filter(link => {
                    // Filter out any link that connects beyond our max depth level
                    const sourceInDepth = visited.has(link.source);
                    const targetInDepth = visited.has(link.target);
                    return sourceInDepth && targetInDepth;
                })
            };

            setrestrictdd(ddddddddd)

        }
    }, [dd, istreemaxlevelrestricted, treemaxlevel]);

    const link111 = objectToBeInspected.reponested && objectToBeInspected.reponested.html_url;

    const fgRef = useRef();


    const handleScroll = (event) => {
        if (event.deltaX !== 0) {
            console.log('Scrolled horizontally by ' + event.deltaX);
        }
    };

    useEffect(() => {
        const handleKeyDown = keydownnnnnn(
            setObjectToBeInspected,
            saveGraph,
            objectToBeInspected,
            dd,
            setdd,
            link111,
            lc,
            graphtypeee,
            dispatch
        );
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('wheel', handleScroll);
        // Cleanup
        return () => {
            l("removing event listeners for keydown and wheel");
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('wheel', handleScroll);
        };
    }, [objectToBeInspected, link111, dd, graphtypeee]); // Empty dependency array means this effect runs once on mount


    // every time search changes, we want to filter the repo
    useEffect(() => {
            if (search === "") {
                setFilterdd([])
                return
            }
            setFilterdd(
                prev => dd.nodes.filter(item => item.name.toLowerCase().includes(search.toLowerCase())))
        }, [search]
    )

    const loadSample = () => {
        const clonedObject = _.cloneDeep(datassss);
        dispatch({
            type: CHANGE_DATA,
            payload: {
                nodes: clonedObject.nodes,
                links: clonedObject.links
            }
        })
    }
    const checkExistInGraph = (item) => {

        // if such repo exist in graph

        // if we take repoid in node to be the real identifier
        let index1 = nc.findIndex(node => node.repoid === item.id)
        return index1 === -1;
    }
    const addRepoInGraph = (item) => {

        // inject the repo into graph
        // if we take repoid in node to be the real identifier
        let index1 = nc.findIndex(
            node => node.repoid === item.id
        )

        if (index1 === -1) {

            const newNode = {
                id: uuidv4(),
                x: 0,
                y: 0,
                name: item.full_name,
                repoid: item.id,
                reponested: item,
                ...fixing ? {fx: 0, fy: 0} : {}
            }

            // Update state in an immutable way
            setdd(prevNc => ({
                ...prevNc, // Spread to copy other properties of nc, if there are any
                nodes: [...prevNc.nodes, newNode], // Create a new array with all old nodes plus the new one
            }));


        } else {
            console.log("already exist!!!!!!!!!!")
        }

    }

    const returnListRepo = () => {

        // when graph change this will rerender
        if (repo) {

            return repo.sort((a, b) => {
                // If a exists in graph but b does not, a comes first
                if (checkExistInGraph(a) && !checkExistInGraph(b)) {
                    return -1;
                }
                // If b exists in graph but a does not, b comes first
                if (!checkExistInGraph(a) && checkExistInGraph(b)) {
                    return 1;
                }
                // If both exist or don't exist in graph, maintain original order
                return 0;
            }).map(item => {
                if (checkExistInGraph(item)) {
                    return <li key={item.id} onClick={
                        () => addRepoInGraph(item)}>{item.full_name}</li>   // need clickable so that it adds to graph
                } else {
                    return <li key={item.id} style={{color: 'gray'}}>{item.full_name}</li>
                }
            })
        }
    }

    const returnGraph1 = (graphtypeee) => {
                let component;
                switch (graphtypeee) {
                    case "ThreeD":
                    case 0:
                        component = <ThreeD dd={dd} fgRef={fgRef}/>;
                        break;
                    case "VR":
                    case 2:
                        component = <VR fgRef={fgRef}/>;
                        break;
                    case "TwoD":
                    case 4:
                        component = <TwoD dd={dd}
                                          setdd={setdd}
                                          collapseddd={collapseddd}
                                          repo={repo}

                                          fgRef={fgRef}
                                          checkExistInGraph={checkExistInGraph}
                                        returnListRepo={returnListRepo}
                                        setObjectToBeInspected={setObjectToBeInspected}
                                        fixing={fixing}
                                        setFixing={setFixing}
                                        restrictdd={restrictdd}
                                        setrestrictdd={setrestrictdd}
                                        istreemaxlevelrestricted={istreemaxlevelrestricted}


                />;
                break;
            default:
                component = <div>No component found for this index.</div>;
                break;
        }

        return <div>{component}</div>;
    }


    function processData(dd) {
        // for node, just store the id and the display name
        let hinode = dd.nodes.map(({id, name, repoid, ...keepAttrs}) => {

                return {
                    id,
                    name: name === undefined ? "dummyname" : name,
                    repoid: repoid === undefined ? 0 : repoid   // 0 is any custom added node ( not repo)
                }


            }
        )
        let hilinks = dd.links.map(({index, source, target, ...keepAttrs}) => {
                return {
                    index,
                    source: source.id,
                    target: target.id
                }
            }
        )

        console.log("after process data, dd is now ", dd)
        return {nodes: hinode, links: hilinks}
    };


    const ddRef = useRef(dd);
    ddRef.current = dd;
    const saveGraph = async () => {
        // Problem: all graph will add custom objects into graph
        //                SO what to save
        // QUESTION: https://github.com/vasturiano/react-force-graph/issues/376
        // ANS: save x y z is enough if u need position

        // console.log("processing data , saving only important properties", dd, ddRef)
        const dd = ddRef.current
        setnotice(" start saving graph. ")
        try {
            const cleanedData = {
                nodes: dd.nodes.map(node => {
                    const {x, y, vx, vy, ...cleanNode} = node;
                    return cleanNode;
                }),
                links: dd.links.map(link => {
                    const {source, target, ...cleanLink} = link;
                    // If `source` and `target` are object references, replace them with IDs
                    cleanLink.source = typeof source === 'object' ? source.id : source;
                    cleanLink.target = typeof target === 'object' ? target.id : target;
                    return cleanLink;
                })
            };


            const json = JSON.stringify(cleanedData);
            const blob = new Blob([json], {type: 'application/json'});
            const href = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = href;
            link.download = "state.json"; // or another filename of your choosing
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        } catch (e) {
            setnotice(p => p + " Fail to download json file.")
            console.log("Fail to download json file.")
            return
        } finally {
        }


        try {

            // so here  just filter the object to contain important.
            let finalData = processData(dd)
            setnotice(p => p + "removed unused attributes ")

            var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
            // save graph to db
            await dbbbbb.collection(" users").doc(auth().currentUser.uid).collection("graphsavedtest").doc().set({
                graphdata: finalData,
                time: myTimestamp

            })
            setnotice(p => p + "saved")
        } catch (e) {
            setnotice(p => p + " Fail to save to database.")
            console.log("Fail to save to database.")

        } finally {
        }


    }

    const loadGraphFromLastSave = async () => {
        // filter the latest time saved graph from firebase firestore
        let loadeddata = await dbbbbb.collection("users")
            .doc(auth().currentUser.uid)
            .collection("graphsavedtest")
            .orderBy("time", "desc")
            .limit(1)
            .get()
        loadeddata.forEach(doc => {
            console.log(doc.id, '=>', doc.data().graphdata);
            setdd(doc.data().graphdata)
        });

    }

    const getRepoData = repoooooo(setnotice, setrepo);

    const emptyGraph = async () => {
        dispatch({
            type: CHANGE_DATA,
            payload: {
                nodes: [],
                links: []
            }
        })
    }

    let showBasicInfo = false
    return (
        <>
            <FloatingControlPanel
                emptyGraph={emptyGraph}
                loadSample={loadSample}
                saveGraph={saveGraph}
                loadGraphFromLastSave={loadGraphFromLastSave}
                notice={notice}
                fileContent2={fileContent2}
                setFileContent2={setFileContent2}
                dd={dd}
                setdd={setdd}
                page={graphtypeee}
                getRepoData={getRepoData}
                setrepo={setrepo}
                fileContent={fileContent}
                setFileContent={setFileContent}
                fgRef={fgRef}
                useremote={useremote}
                setUseremote={setUseremote}
                returnListRepo={returnListRepo}
                fixing={fixing}
                setFixing={setFixing}
                search={search}
                setSearch={setSearch}
                filterdd={filterdd}
                objectToBeInspected={objectToBeInspected}
                setObjectToBeInspected={setObjectToBeInspected}
                istreemaxlevelrestricted={istreemaxlevelrestricted}
                setistreemaxlevelrestricted={setistreemaxlevelrestricted}
                treemaxlevel={treemaxlevel}
                settreemaxlevel={settreemaxlevel}
            ></FloatingControlPanel>
            {
                showBasicInfo &&
                <>
                    number of nodes:
                    {JSON.stringify(dd.nodes.length)}
                    {" "}

                    number of links:
                    {JSON.stringify(dd.links.length)}
                    {" "}

                    collapseddd nodes:
                    {JSON.stringify(collapseddd.nodes.length)}
                    {" "}

                    collapseddd links:
                    {JSON.stringify(collapseddd.links.length)}
                    {" "}

                    restrictdd nodes:
                    {JSON.stringify(restrictdd.nodes.length)}
                    {" "}
                    restrictdd links:
                    {JSON.stringify(restrictdd.links.length)}
                    {" "}

                    globalscale
                    {/*(this value could be gets by looking into the function by nodeCanvasObject.):*/}
                    {JSON.stringify(globalscale)}
                </>
            }
            <ObjectTable
                objectToBeInspected={objectToBeInspected}
                setObjectToBeInspected={setObjectToBeInspected}
                dd={dd}
                setdd={setdd}
            >
            </ObjectTable>
            <div
                style={{
                    // border: "3px solid purple",
                }}
            >
                {returnGraph1(graphtypeee)}
            </div>
        </>

    );
}


export default connect(state => state, {})(Graph);
