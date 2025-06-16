import {ForceGraphVR} from 'react-force-graph';

import React from 'react';


import cloneDeep from 'lodash/cloneDeep';

// let SpriteText=window.SpriteText
// import SpriteText from "//unpkg.com/three-spritetext/dist/three-spritetext.mjs";
import SpriteText from 'three-spritetext';
import {l} from "../../firebase/firebase";

export default function TextNodeVR({dd,...props}) {
    const [text, setText] = React.useState("hello world");
    l("text333333333333333", text)
    let c= props.c;


    // const newdd = cloneDeep(dd);   If you do deep clone it seems the graph will render For state change, Because the engine never got to modify the original state
    const newdd = (dd);

    return <>
        <button onClick={() => {setText(d=> d+'1')}}>Change Text</button>
        <p>Use W-A-S-D to move,    drag mouse to change view angle</p>
        <ForceGraphVR
        graphData={newdd}
        nodeAutoColorBy="group"







        nodeThreeObject={node => {


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





            // if there is a name, we use the name, if there is no, we use the ID.
            const sprite = new SpriteText(label);
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