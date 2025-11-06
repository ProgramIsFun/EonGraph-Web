import React, {useState} from 'react';
import ReactJson from '@microlink/react-json-view'
import JsonView from '@uiw/react-json-view';

import {aaaaaaa, removegithubRepoNode, rename} from "../../autil/helperfile";
import {l} from "../../autil/loghelper";
import {connect, useDispatch} from "react-redux";
import {fetchSingleNodeData} from "../../actions/all33";


// use the component in your app!
const ObjectTable = (props) => {
    // l("ObjectTable render", props);
    // Convert object entries into an array of [key, value] pairs for easy mapping
    const dispatch = useDispatch();
    let all33 = props.all33;
    let graphTypeRender = all33.graphTypeRender;
    let dd = props.dd;
    let setdd = props.setdd;
    let fetchNodeData= props.fetchNodeData;

    const [isExpanded, setIsExpanded] = useState(true);

    let objectToBeInspected = all33.objectToBeInspected;
    l("objectToBeInspected111", objectToBeInspected, '__threeObj' in objectToBeInspected);
    const {__threeObj, ...objectToBeInspected2} = objectToBeInspected;
    let setObjectToBeInspected = props.setObjectToBeInspected;


    let entries
    try {
        // l("data2222222222", props)
        entries = Object.entries(props.objectToBeInspected);

    } catch (e) {
        l("Error converting object to entries:", e);
        entries = [];
    }

    // Define styles for the floating table
    const tableStyle = {
        position: 'fixed',
        top: '0',
        right: '0',
        margin: '15px',
        // background: 'white',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        zIndex: 1000,
        borderCollapse: 'collapse',
        display: isExpanded ? 'table' : 'none', // Control display based on isExpanded state
    };

    // Optional: Define styles for table cells for better appearance
    const cellStyle = {
        padding: '1px',
        border: '1px solid #ddd',
    };

    // Button style
    const buttonStyle = {
        position: 'fixed',
        top: '5px',
        right: '5px',
        zIndex: 1001, // Ensure the button is above the table
    };


    // isRepo
    const link = props.objectToBeInspected.reponested
        && props.objectToBeInspected.reponested.html_url;

    let aaaaaaa1 = async () => {
        await removegithubRepoNode(objectToBeInspected, dd, setdd, dispatch);
    }
    let element = 1
        ?
        <>
            {graphTypeRender == 4 ?
                <JsonView value={objectToBeInspected}

                          style={aaaaaaa}
                /> :
                <><JsonView value={objectToBeInspected2}

                            style={aaaaaaa}
                /></>
            }
        </>
        :
        <>
            <ReactJson
                src={objectToBeInspected}
            />
        </>;
    let element1 = 1
        ?
        <div style={tableStyle}>
            <button onClick={() => {
                fetchNodeData(objectToBeInspected.id)
            }}
                    >refetch</button>
            <button onClick={() => {
                rename(props.objectToBeInspected, "node")
            }}>
                rename
            </button>

            <button onClick={() => {
                aaaaaaa1()
            }}>
                remove github repo
            </button>

            <button onClick={
                () => {
                    l("collapsinggggggggggggg")
                    if (0) {
                        setdd(dd => {
                            return {
                                ...dd,
                                nodes: dd.nodes.map(node => {
                                    if (node.id === objectToBeInspected.id) { // Replace 'specificNodeId' with the actual id or condition to find your node
                                        // l("collapsinggggggggggggg2")

                                        return {...node, collapsed: !node.collapsed};
                                    }
                                    return node;
                                })
                            };
                        });
                        setObjectToBeInspected({})
                    } else {
                        l("not implemented yet")
                    }
                }}>
                {objectToBeInspected.collapsed ? 'Expand' : 'Collapse'}
            </button>


            {
                link &&
                <a href={link} target="_blank" rel="noreferrer">
                    View on GitHub
                </a>
            }
            {
                element
            }


        </div>
        :
        <table style={tableStyle}>
            <thead>
            <tr>
                <th style={cellStyle}>Property</th>
                <th style={cellStyle}>Value</th>
            </tr>
            </thead>
            <tbody>
            {entries.map(([key, value]) => (
                <tr key={key}>
                    <td style={cellStyle}>{key}</td>
                    <td style={cellStyle}>{value}</td>
                </tr>
            ))}
            </tbody>
        </table>;
    return (
        <div>
            <button style={buttonStyle} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'Collapse' : 'Expand'} Table
            </button>
            {
                element1
            }
        </div>
    );
};


export default connect(state => state,{fetchNodeData: fetchSingleNodeData})(ObjectTable);
