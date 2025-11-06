import {ForceGraphVR} from 'react-force-graph';

import React from 'react';


import cloneDeep from 'lodash/cloneDeep';

import SpriteText from 'three-spritetext';

export function AAAA1({dd,...props}) {
    // console.log(dd)
    console.log("spriteTextttttttttttttttttttttttt", SpriteText)
    console.log("enteringVR, deepclone property,await mutation to original prop")

    let c= props.c;


    const newdd = cloneDeep(dd);
    return <>
        <button onClick={() => {}}>Click to do something</button>
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

            // backgroundColor="rgba(0,0,0,0)"

            // nodeThreeObjectExtend={true}

            linkWidth={c.linkWidth}
            linkDirectionalParticles={c.linkDirectionalParticles}
            linkDirectionalParticleWidth={c.linkDirectionalParticleWidth}
            linkDirectionalParticleSpeed={c.linkDirectionalParticleSpeed}

        /></>
}