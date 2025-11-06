import {ForceGraphVR} from 'react-force-graph';

import React, {useEffect} from 'react';

import SpriteText from 'three-spritetext';
import * as THREE from 'three';
import {ee, l} from "../../autil/loghelper";
import {connect, useDispatch} from "react-redux";
import {getNormalclick} from "../widgets/GetNormalClick";
import {replaceStringAinB} from "../../autil/helperfile";

function VR(props) {
    const dispatch = useDispatch();
    let all33 = props.all33;
    let dd = all33.dd;
    let c = all33.settings;
    let nodeId=all33.nodeIdAccessor;

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


    const HIGHLIGHT_HALO_OPACITY = c.VR_highlightHaloOpacity; // or whatever you like
    const HIGHLIGHT_HALO_COLOR = c.VR_highlightHaloColor; // yellow, or "#ff0", or 0xffffff for white
    const HIGHLIGHT_HALO_RADIUS = node_font_size * 2.5; // slightly larger than the sprite size
    const HIGHLIGHT_HALO_WIDTH_SEGMENTS = 24; // number of segments to make the sphere smooth
    const HIGHLIGHT_HALO_HEIGHT_SEGMENTS = 24;
    const HIGHLIGHT_HALO_TRANSPARENCY = true;
    const HIGHLIGHT_HALO_DEPTH_WRITE = false;
    const nodeThreeObject = node => {
        // Group to hold the sprite and highlight sphere
        const group = new THREE.Group();

        const label2 = !node.name ? node.id : node.name;
        let label = replaceStringAinB("everythingallaccount", label2);
        // SpriteText node
        const sprite = new SpriteText(label);
        sprite.color = node.color;
        sprite.textHeight = node_font_size;

        group.add(sprite);

        let shouldGrow=true
        if (shouldGrow) {
            const geoOuter = new THREE.SphereGeometry(HIGHLIGHT_HALO_RADIUS, HIGHLIGHT_HALO_WIDTH_SEGMENTS, HIGHLIGHT_HALO_HEIGHT_SEGMENTS);
            const matOuter = new THREE.MeshBasicMaterial({
                color: HIGHLIGHT_HALO_COLOR,
                transparent: HIGHLIGHT_HALO_TRANSPARENCY,
                opacity: HIGHLIGHT_HALO_OPACITY,
                depthWrite: HIGHLIGHT_HALO_DEPTH_WRITE
            });
            const sphereOuter = new THREE.Mesh(geoOuter, matOuter);
            group.add(sphereOuter);
        }

        return group;
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
