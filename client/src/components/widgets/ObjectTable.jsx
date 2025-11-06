import React, {useState} from 'react';
import ReactJson from '@microlink/react-json-view'
import JsonView from '@uiw/react-json-view';

import {removegithubRepoNode, rename} from "../../util/helperfile";
import {l} from "../../util/log11";
import {connect, useDispatch} from "react-redux";


// use the component in your app!
const ObjectTable = (props) => {
    // Convert object entries into an array of [key, value] pairs for easy mapping
    const dispatch = useDispatch();

    let dd = props.dd;
    let setdd = props.setdd;

    const [isExpanded, setIsExpanded] = useState(true);

    let objectToBeInspected = props.all33.objectToBeInspected;

    let setObjectToBeInspected = props.setObjectToBeInspected;


    let entries
    try {
        // l("data2222222222", props)
        entries = Object.entries(props.objectToBeInspected);

    } catch (e) {
        return <div>error</div>
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


    // check if object.reponested.html_url is not undefined, if yes, we get the link
    const link = props.objectToBeInspected.reponested && props.objectToBeInspected.reponested.html_url;
    let aaaaaaa = {
        "--w-rjv-color": "#9cdcfe",
        "--w-rjv-key-number": "#268bd2",
        "--w-rjv-key-string": "#9cdcfe",
        "--w-rjv-background-color": "#000000ff",
        "--w-rjv-line-color": "#36334280",
        "--w-rjv-arrow-color": "#838383",
        "--w-rjv-edit-color": "#9cdcfe",
        "--w-rjv-info-color": "#9c9c9c7a",
        "--w-rjv-update-color": "#9cdcfe",
        "--w-rjv-copied-color": "#9cdcfe",
        "--w-rjv-copied-success-color": "#28a745",
        "--w-rjv-curlybraces-color": "#d4d4d4",
        "--w-rjv-colon-color": "#d4d4d4",
        "--w-rjv-brackets-color": "#d4d4d4",
        "--w-rjv-ellipsis-color": "#cb4b16",
        "--w-rjv-quotes-color": "#9cdcfe",
        "--w-rjv-quotes-string-color": "#ce9178",
        "--w-rjv-type-string-color": "#ce9178",
        "--w-rjv-type-int-color": "#b5cea8",
        "--w-rjv-type-float-color": "#b5cea8",
        "--w-rjv-type-bigint-color": "#b5cea8",
        "--w-rjv-type-boolean-color": "#569cd6",
        "--w-rjv-type-date-color": "#b5cea8",
        "--w-rjv-type-url-color": "#3b89cf",
        "--w-rjv-type-null-color": "#569cd6",
        "--w-rjv-type-nan-color": "#859900",
        "--w-rjv-type-undefined-color": "#569cd6"
    }
    let aaaaaaa1 = async () => {
        await removegithubRepoNode(objectToBeInspected, dd, setdd, dispatch);
    }
    return (
        <div>
            <button style={buttonStyle} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'Collapse' : 'Expand'} Table
            </button>
            {1 ? <div style={tableStyle}>

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
                            // l("collapsinggggggggggggg")
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
                        }}>
                        {objectToBeInspected.collapsed ? 'Expand' : 'Collapse'}
                    </button>


                    {link && <a href={link} target="_blank" rel="noreferrer">
                        View on GitHub</a>
                    }
                    {
                        1 ?
                        <JsonView value={objectToBeInspected}

                                  style={aaaaaaa}
                        /> :
                        <ReactJson src={props.objectToBeInspected}
                        />
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
                </table>}
        </div>
    );
};


export default connect(state => state)(ObjectTable);
