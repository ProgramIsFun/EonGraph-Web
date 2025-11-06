import {ForceGraphVR} from 'react-force-graph';

import React, {useEffect} from 'react';

import SpriteText from 'three-spritetext';

import {ee, l} from "../../autil/log11";
import {connect, useDispatch} from "react-redux";
import {getNormalclick} from "../../autil/GetNormalclick";
import {replaceStringAinB} from "../../autil/helperfile";

function VR(props) {
    const dispatch = useDispatch();
    let all33 = props.all33;
    let dd = all33.dd;
    let c = all33.settings;


    let fgRef = props.fgRef;
    let a = c.VR_repulsive_Force_Scale

    useEffect(() => {
        if (fgRef.current) {
            fgRef.current.d3Force('charge').strength(a)
            fgRef.current.d3ReheatSimulation();
            l("updateddddddddddd")
        } else {
            ee("not updateddddddddddd")
        }
    }, [a]);
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
        const label2 = !node.name ? node.id : node.name;

        let label = replaceStringAinB("everythingallaccount", label2)
        // if there is a name, we use the name, if there is no, we use the ID.
        const sprite = new SpriteText(label);
        sprite.color = node.color;
        sprite.textHeight = 8;
        return sprite;
    };
    return <>
        <button onClick={getCameraPosition}>Get Camera Position</button>
        <ForceGraphVR
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
            linkDirectionalParticles={c.linkDirectionalParticles}
            linkDirectionalParticleWidth={c.linkDirectionalParticleWidth}
            linkDirectionalParticleSpeed={c.linkDirectionalParticleSpeed}

        />
    </>
}


export default connect(state => state)(VR);
