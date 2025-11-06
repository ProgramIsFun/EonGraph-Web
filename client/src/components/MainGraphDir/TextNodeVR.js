import {ForceGraphVR} from 'react-force-graph';

import React, {useEffect, useState} from 'react';


import cloneDeep from 'lodash/cloneDeep';

// let SpriteText=window.SpriteText
// import SpriteText from "//unpkg.com/three-spritetext/dist/three-spritetext.mjs";
import SpriteText from 'three-spritetext';

export default function TextNodeVR({dd,...props}) {
    // console.log(dd)
    console.log("spriteTextttttttttttttttttttttttt", SpriteText)
    console.log("enteringVR, deepclone property,await mutation to original prop")
    
    let c= props.c;


    const newdd = cloneDeep(dd);
    return <>
        <p>Use W-A-S-D to move,    drag mouse to change view angle</p>
        <ForceGraphVR
        graphData={newdd}
        nodeAutoColorBy="group"
        nodeThreeObject={node => {
            // if there is a name, we use the name, if there is no, we use the ID.
            const sprite = new SpriteText(node.name || node.id);
            sprite.color = node.color;
            sprite.textHeight = 8;
            return sprite;
        }}





        // nodeThreeObjectExtend={true}


        linkWidth={c.linkWidth}
        linkDirectionalParticles={c.linkDirectionalParticles}
        linkDirectionalParticleWidth={c.linkDirectionalParticleWidth}
        linkDirectionalParticleSpeed={c.linkDirectionalParticleSpeed}

        /></>
}