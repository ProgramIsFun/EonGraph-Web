import React, { useState, useEffect, useRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import * as d3 from 'd3';
import dat from 'dat.gui';
import {l} from "../firebase/firebase";
// import './App.css'; // Assuming you’ll have some CSS

const useForceUpdate = () => {
    const setToggle = useState(false)[1];
    return () => setToggle(b => !b);
};

const ForceTree = ({ data }) => {

    l("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2", data)
    // return (<> </>)
    const fgRef = useRef();
    const [controls] = useState({ 'DAG Orientation': 'td' });
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        const gui = new dat.GUI();
        gui.add(controls, 'DAG Orientation', ['td', 'bu', 'lr', 'rl', 'radialout', 'radialin', null]).onChange(forceUpdate);
        // Make sure to remove the GUI when this component unmounts to prevent memory leaks
        return () => gui.destroy();
    }, [forceUpdate, controls]);

    useEffect(() => {
        fgRef.current.d3Force('collision', d3.forceCollide(node => Math.sqrt(100 / (node.level + 1))));
    }, []);

    return (
        <ForceGraph2D
            ref={fgRef}
            graphData={data}

            dagMode={controls['DAG Orientation']}
            dagLevelDistance={300}

            backgroundColor="#101020"

            linkColor={() => 'rgba(255,255,255,0.2)'}

            nodeRelSize={1}
            nodeId="path"
            nodeVal={node => 100 / (node.level + 1)}
            nodeLabel="path"
            nodeAutoColorBy="module"
            linkDirectionalParticles={2}
            linkDirectionalParticleWidth={2}
            d3VelocityDecay={0.3}
        />
    );
};

function App() {

    const [data, setData] = useState({ nodes: [], links: [] });
    l("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data)
    useEffect(() => {


        l("fetching dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        const fetchData = async () => {

            let response;
            try {
                response = await fetch('/d3-dependencies.csv');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

            } catch (e) {
                l("errorrrrrrrrrrrrrrrrrrrrrr", e)
            } finally {
            }


            const rawData = await response.text();
            // l("rawData", rawData)
            const parsedData = d3.csvParse(rawData);
            l("parsedData", parsedData)
            const nodes = [], links = [];

            parsedData.forEach(({ size, path }) => {
                /* Your data processing logic */
                const levels = path.split('/'),
                    level = levels.length - 1,
                    module = level > 0 ? levels[1] : null,
                    leaf = levels.pop(),
                    parent = levels.join('/');

                const node = {
                    path,
                    leaf,
                    module,
                    size: +size || 20,
                    level
                };

                nodes.push(node);

                if (parent) {
                    links.push({source: parent, target: path, targetNode: node});
                }
            });

            setData({ nodes, links });
        };

        fetchData();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <ForceTree data={data} />
            </header>
        </div>
    );
}

export default App;
