import {ForceGraphVR} from 'react-force-graph';

import React from 'react';

import SpriteText from 'three-spritetext';

import {l} from "../../autil/log11";
import {connect, useDispatch} from "react-redux";
import {getNormalclick} from "../../autil/GetNormalclick";

function VR(props) {
    const dispatch = useDispatch();
    let all33 = props.all33;
    let dd=all33.dd;
    let c=all33.settings;
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
    let linkWidth= c.VR_linkWidth;
    return <>
        <button onClick={getCameraPosition}>Get Camera Position</button>
        <ForceGraphVR
            graphData={dd}
            nodeAutoColorBy="group"

            onNodeClick={(node, event) => {
                l("Node clicked22222:", node);
                l("Event333333333:", event);
                Normalclick(node);
            }}


            nodeThreeObject={
                node => {
                    const label2 = !node.name ? node.id : node.name;
                    const replaceStringAinB = (strA, strB) => {
                        if (strB.startsWith(strA)) {
                            return strB.replace(strA, 'e');
                        }
                        return strB; // No change if stringB does not start with stringA
                    };
                    let label = replaceStringAinB("everythingallaccount", label2)
                    // if there is a name, we use the name, if there is no, we use the ID.
                    const sprite = new SpriteText(label);
                    sprite.color = node.color;
                    sprite.textHeight = 8;
                    return sprite;
                }
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
