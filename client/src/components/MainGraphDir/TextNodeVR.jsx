import {ForceGraphVR} from 'react-force-graph';

import React from 'react';

import SpriteText from 'three-spritetext';

import {l} from "../../util/log11";

function TextNodeVR(props) {
    let dd = props.dd;
    let c = props.c;
    const newdd = (dd);

    return <>
        <ForceGraphVR
            graphData={newdd}
            nodeAutoColorBy="group"

            onNodeClick={(node, event) => {
                l("Node clicked22222:", node);
                l("Event333333333:", event);
            }}


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


            backgroundColor={"#000000"}

            // backgroundColor="rgba(0,0,0,0)"
            // nodeThreeObjectExtend={true}


            linkWidth={c.linkWidth}
            linkDirectionalParticles={c.linkDirectionalParticles}
            linkDirectionalParticleWidth={c.linkDirectionalParticleWidth}
            linkDirectionalParticleSpeed={c.linkDirectionalParticleSpeed}

        /></>
}


export default connect(state => state)(TextNodeVR);
