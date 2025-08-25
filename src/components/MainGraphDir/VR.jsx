import {ForceGraphVR} from 'react-force-graph';

import React, {useEffect} from 'react';

import SpriteText from 'three-spritetext';

import {ee, l} from "../../autil/loghelper";
import {connect, useDispatch} from "react-redux";
import {getNormalclick} from "../widgets/GetNormalClick";
import {replaceStringAinB} from "../../autil/helperfile";

function VR(props) {
    const dispatch = useDispatch();
    let all33 = props.all33;
    let dd = all33.dd;
    let c = all33.settings;
    let nodeId=all33.nodeIdaccessor;

    let fgRef = props.fgRef;
    let repulsiveForceScale = c.VR_repulsive_Force_Scale
    let node_font_size=c.VR_node_font_size;
    let linkDirectionalParticles= c.VR_linkDirectionalParticles;
    let linkDirectionalParticleWidth=c.VR_linkDirectionalParticleWidth;
    let linkDirectionalParticleSpeed=c.VR_linkDirectionalParticleSpeed;
    useEffect(() => {
        if (fgRef.current) {
            fgRef.current.d3Force('charge').strength(repulsiveForceScale)
            fgRef.current.d3ReheatSimulation();
            l("d3Force charge strength updated to:", repulsiveForceScale);
        } else {
            ee("not updated, fgRef.current is not defined or not ready yet.");
        }
    }, [repulsiveForceScale]);
    let objectToBeInspected = all33.objectToBeInspected;

    let getCameraPosition = () => {
        var scene = document.querySelector('a-scene');
        if (scene) {
            // a-scene exists; now access camera
            var cameraEl = scene.camera && scene.camera.el;
            if (cameraEl && cameraEl.object3D && cameraEl.object3D.position) {
                var position = cameraEl.object3D.position;
                // use position here
                console.log(position);
            } else {
                console.warn('Camera or its position is not available yet.');
            }
        } else {
            console.warn('<a-scene> tag not found in the document.');
        }
    }
    const Normalclick = getNormalclick(objectToBeInspected, dispatch, dd)
    let linkWidth = c.VR_linkWidth;

    let nodeThreeObject = node => {
        // Node object accessor function or attribute for generating a custom 3d object to render as graph nodes.
        // Should return an instance of ThreeJS Object3d.
        // If a falsy value is returned, the default 3d object type will be used instead for that node.

        const label2 = !node.name ? node.id : node.name;

        let label = replaceStringAinB("everythingallaccount", label2)
        // if there is a name, we use the name, if there is no, we use the ID.
        const sprite = new SpriteText(label);
        sprite.color = node.color;
        sprite.textHeight = node_font_size;
        return sprite;
    };

    return <>
        <button onClick={getCameraPosition}>Get Camera Position</button>
        <ForceGraphVR
            nodeId={nodeId}
            ref={fgRef}
            graphData={dd}
            nodeAutoColorBy="group"
            onNodeClick={(node, event) => {
                l("Node clicked22222:", node);
                l("Event333333333:", event);
                Normalclick(node);
            }}
            nodeThreeObject={
                nodeThreeObject
            }


            backgroundColor={"#000000"}
            // backgroundColor="rgba(0,0,0,0)"
            // nodeThreeObjectExtend={true}
            linkWidth={linkWidth}
            linkDirectionalParticles={linkDirectionalParticles}
            linkDirectionalParticleWidth={linkDirectionalParticleWidth}
            linkDirectionalParticleSpeed={linkDirectionalParticleSpeed}

        />
    </>
}


export default connect(state => state)(VR);
