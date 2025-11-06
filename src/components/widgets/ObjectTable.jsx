import React, {useState} from 'react';
import MicrolinkJsonView from '@microlink/react-json-view'

import UiwJsonView from '@uiw/react-json-view';
import ReactJson from 'react-json-view'
import {aaaaaaa, removegithubRepoNode, rename} from "../../autil/helperfile";
import {l} from "../../autil/loghelper";
import {connect, useDispatch} from "react-redux";
import {fetchSingleNodeData} from "../../actions/all33";
import Demo from "./ExampleJson";


const ObjectTable = (props) => {

    const dispatch = useDispatch();
    let all33 = props.all33;
    l("ObjectTable all33", all33)
    let graphTypeRender = all33.graphTypeRender;
    let nodeIdAccessor= all33.nodeIdAccessor;
    let dd = props.dd;
    let setdd = props.setdd;
    let fetchNodeData = props.fetchNodeData;

    const [isExpanded, setIsExpanded] = useState(true);

    let objectToBeInspected = all33.objectToBeInspected;

    l("graphTypeRender obj", graphTypeRender)
    const {__threeObj, ...objectToBeInspectedWithoutThreeObj} = objectToBeInspected;
    let setObjectToBeInspected = props.setObjectToBeInspected;


    let entries
    try {
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



    const link = props.objectToBeInspected.reponested
        && props.objectToBeInspected.reponested.html_url;

    let removeGithubRepo = async () => {
        await removegithubRepoNode(objectToBeInspected, dd, setdd, dispatch);
    }

    let allowThreeObjInJsonForRender=false
    let objForJsonView = allowThreeObjInJsonForRender?objectToBeInspected:objectToBeInspectedWithoutThreeObj;



    function renderViewer(coreViewer) {
        switch (coreViewer) {
            case 1:
                return (
                    <>
                        {/*<Demo />*/}
                        <UiwJsonView
                            value={objForJsonView}
                            style={aaaaaaa}
                        />
                    </>
                );
            case 2:
                return (
                    <>
                        <MicrolinkJsonView
                            src={objForJsonView}
                        />
                    </>
                );
            case 3:
                return (
                    <>
                        <ReactJson src={objForJsonView}
                        onEdit={(t)=>{
                            l("onedited",t)
                        }}
                        />
                    </>
                );
            default:
                return null;
        }
    }



    let coreViewer = renderViewer(1);

    let useLibrary=true

    let interfaceTable = useLibrary
        ?
        <div style={tableStyle}>

            <button onClick={() => {
                let id=objectToBeInspected[nodeIdAccessor]
                l("refetching data for node id:", id)
                fetchNodeData(id)
            }}
            >refetch data
            </button>

            <button onClick={() => {
                rename(props.objectToBeInspected, "node")
            }}>
                rename
            </button>

            <button onClick={() => {
                removeGithubRepo()
            }}>

                remove github repo
            </button>

            <button onClick={
                () => {
                    l("collapsing this node so it is invisible in the graph view")
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
                coreViewer
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
            <button
                style={buttonStyle}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? 'Collapse' : 'Expand'} Table
            </button>

            {
                interfaceTable
            }
        </div>
    );
};


export default connect(state => state, {fetchNodeData: fetchSingleNodeData})(ObjectTable);
