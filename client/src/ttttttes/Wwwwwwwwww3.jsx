import React, { useState, useEffect, useRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import * as d3 from 'd3';
import dat from 'dat.gui';

import {l} from "../util/log11";
// import {useReadCypher} from "use-neo4j";
// import * as neo4j from "neo4j-driver";
// import './App.css'; // Assuming you’ll have some CSS



function App() {



    const handleZoom = (event) => {
        d3.select('#group').attr('transform', event.transform);
    }

    useEffect(()=>{
        const zoom = d3
            .zoom()
            .filter(function (event) {
                if (!event) return false;
                return event.which === 2 || event.type === 'wheel';
            })
            .scaleExtent([-10, 10])
            .on('zoom', handleZoom);
        d3.select('#workflow').call(zoom)
    }, [handleZoom])


    return (
        <svg id="workflow">
            <g id="group">
                <foreignObject x="100" y="50">
                    <div>Node 1</div>
                </foreignObject>
                <foreignObject x="200" y="150">
                    <div>Node 2</div>
                </foreignObject>
            </g>
        </svg>
    );
}

export default App;
