import React, {useRef, useState} from 'react';
import Slider from '@mui/material/Slider';
import {TextField} from "@mui/material";
import {auth} from "../../autil/firebase";
import FileDrop from "./FileDrop";
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import {cgg} from "../../autil/helperfile";
import {connect, useDispatch} from "react-redux";
import {l} from "../../autil/loghelper";
import {
    changeSetting,
    executeCypherQuery,
    fetchAllNodesAndRelations,
    updateNodesPositionsToBackend
} from "../../actions/all33";
import {cccccccccc} from "../../reducers/all33";
import {CHANGE_DATA, CHANGE_USEREMOTE, CHANGE_USING_NEO4J} from "../../actions/types";
import {SAMPLE_CYPHER} from "../../constants";
import Collapsible from "react-collapsible";


const BorderCollapsibleWrapper = ({children, trigger}) => {
    return (
        <BorderWrapper>
            <Collapsible trigger={trigger}>
                {children}
            </Collapsible>
        </BorderWrapper>
    );
};

const BorderWrapper = ({children, style = {}}) => {
    const defaultStyle = {
        border: '2px solid #333',
        // padding: '16px',
        // borderRadius: '8px',
        display: 'inline-block',
        ...style, // allow custom styles via props
    };
    return (
        <div style={defaultStyle}>
            {children}
        </div>
    );
}


const ControlPanel = (props) => {

    const dispatch = useDispatch();


    l("ControlPanel render", props);
    let all33 = props.all33;
    const [tempNumber, setTempNumber] = useState(3);
    const emptyGraph = props.emptyGraph;
    const loadSample = props.loadSample;
    const saveGraph = props.saveGraph;
    const loadGraphFromLastSave = props.loadGraphFromLastSave;
    const notice = props.notice;
    const fileContent2 = props.fileContent2;
    const setFileContent2 = props.setFileContent2;

    const executeCypherQuery = props.executeCypherQuery;

    const dd = all33.dd;
    const setdd = props.setdd;

    const graphtypeee = all33.graphtypeee;
    const getRepoData = props.getRepoData;
    const setrepo = props.setrepo;
    const fileContent = props.fileContent;
    const setFileContent = props.setFileContent;
    const fgRef = props.fgRef;
    const returnListRepo = props.returnListRepo;


    const objectToBeInspected = all33.objectToBeInspected;

    const fixing = props.fixing;
    const setFixing = props.setFixing;

    const istreemaxlevelrestricted = props.istreemaxlevelrestricted;
    const setistreemaxlevelrestricted = props.setistreemaxlevelrestricted;
    const treemaxlevel = props.treemaxlevel;
    const settreemaxlevel = props.settreemaxlevel;
    const fetchData11 = props.fetchData11;
    const updateNodesPositionsToBackend = props.updateNodesPositionsToBackend;

    const inputRef1 = useRef(null);


    const search = props.search;
    const setSearch = props.setSearch;
    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };
    const filterdd = props.filterdd;

    const usingNEO4J = all33.usingNEO4J;


    const changeSetting = props.changeSetting;


    const [value, setValue] = React.useState(SAMPLE_CYPHER);

    const handleChange = (e) => {
        setValue(e.target.value);
    };


    const [value2, setValue2] = React.useState("12");
    const handleChange2 = (e) => {
        setValue2(e.target.value);
    };

    let c = all33.settings;
    l("ControlPanel c", c);


    const [isVisible, setIsVisible] = useState(true); // State to manage the visibility

    // Function to toggle visibility
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const fixAllNodes = () => {
        setFixing(true);
        // we're trying to put an FX and FY value in all node objects
        dd.nodes.forEach((node) => {
            node.fx = node.x;
            node.fy = node.y;
        });

        // const simulation = fgRef.current.d3Force('charge');
        //
        // if (simulation) {
        //     simulation.stop(); // Step 1: Pause the simulation
        // }
    }

    const unfixAllNodes = () => {

        setFixing(false);
        // we're trying to remove the FX and FY value in all node objects
        dd.nodes.forEach((node) => {
            delete node.fx;
            delete node.fy;
        });

        // const simulation = fgRef.current.d3Force('charge');
        //
        // if (simulation) {
        //     simulation.restart(); // Step 1: Pause the simulation
        // }
    }

    let useremote = all33.useremote;
    let localbackendurl = all33.localbackendurl;
    let remotebackendurl = all33.remotebackendurl;
    const fetchData111 = async () => {
        let baseUrl = useremote ? remotebackendurl : localbackendurl
        fetchData11(baseUrl)
    };

    let prefix = graphtypeee
    let map = Object.keys(c)
        .filter(key => key.startsWith(graphtypeee))
        .map(
            (key) => {

                let max = cccccccccc[key].max
                let min = cccccccccc[key].min
                let step = cccccccccc[key].step
                return (
                    <div key={key} className="horizontal-bar">

                        {key}
                        <Slider
                            aria-label={key}
                            value={typeof c[key] === 'number' ? c[key] : 0}
                            onChange={
                                (event, newValue) => {
                                    l("Slider changed", key, newValue);
                                    changeSetting(key, newValue);
                                }
                            }
                            min={min}
                            max={max}
                            step={step}
                        />
                        {c[key]}
                    </div>
                )
            });
    return (


        <>
            {isVisible ? (
                <div
                    className="floating-control-panel"
                    style={{
                        overflow: "scroll",
                        height: "80vh",
                    }}
                >
                    <button onClick={toggleVisibility}>Hide this menu</button>
                    <br/>


                    <BorderCollapsibleWrapper trigger="Global control">
                        <p>
                            usingNEO4J: {usingNEO4J ? 'True' : 'False'}
                            <input
                                type="checkbox"
                                checked={usingNEO4J}
                                onChange={(event) => {
                                    let a = event.target.checked;
                                    dispatch({"type": CHANGE_USING_NEO4J, payload: a})
                                }}
                            />
                            (if set to true, some changes of the graph would affect db)
                        </p>
                        <br/>
                        <p>useremote: {useremote ? 'True' : 'False'}
                            <input
                                type="checkbox"
                                checked={useremote}
                                onChange={
                                    (event) => {
                                        dispatch({"type": CHANGE_USEREMOTE, payload: event.target.checked})
                                    }
                                }
                            />(false=local backend, true=remote backend)
                        </p>
                    </BorderCollapsibleWrapper>
                    <BorderCollapsibleWrapper trigger="cypher area">
                        <div>
                        <textarea
                            rows={10}
                            cols={50}
                            value={value}
                            onChange={handleChange}
                            placeholder="Type your text here..."
                            style={{padding: '10px', fontSize: '16px'}}
                        />
                            <button
                                onClick={() => {
                                    executeCypherQuery(value)
                                }}
                            >execute cypher
                            </button>
                        </div>
                        <br/>
                        <br/>
                    </BorderCollapsibleWrapper>

                    <BorderCollapsibleWrapper trigger="graph data management(read,write)">
                        <button onClick={
                            () => {
                                fetchData111()
                            }
                        }>get the graph from nE04J
                        </button>
                        <br/>
                        <br/>

                        <p>add prop value to all node (local)</p>
                        <button onClick={
                            () => {
                                let key = prompt("Enter the property key:");
                                let value = prompt("Enter the property value:");
                                if (key !== null
                                    && value !== null
                                ) {
                                    let inplace=true
                                    if (inplace) {
                                        dd.nodes.forEach(node => {
                                            // Directly modify each node object
                                            node[key] = value;
                                        });
                                        dispatch({
                                            type: CHANGE_DATA,
                                            payload: {
                                                nodes: dd.nodes,     // `dd.nodes` has been modified in place
                                                links: dd.links,
                                                nodeIdaccessor: all33.nodeIdaccessor
                                            }
                                        });
                                    }else {
                                        let newNodes = dd.nodes.map(node => ({
                                            ...node,
                                            [key]: value
                                        }));
                                        dispatch({
                                            type: CHANGE_DATA,
                                            payload: {
                                                nodes: newNodes,
                                                links: dd.links,
                                                nodeIdaccessor: all33.nodeIdaccessor
                                            }
                                        });
                                    }
                                }
                            }
                        }>add prop to all node</button>
                        <br/>

                        <p>delete prop from all node (local)</p>
                        <button onClick={
                            () => {
                                let key = prompt("Enter the property key to delete:");
                                if (key !== null) {
                                    let inplace=true
                                    if (inplace) {
                                        dd.nodes.forEach(node => {
                                            // Directly modify each node object
                                            delete node[key];
                                        });
                                        dispatch({
                                            type: CHANGE_DATA,
                                            payload: {
                                                nodes: dd.nodes,     // `dd.nodes` has been modified in place
                                                links: dd.links,
                                                nodeIdaccessor: all33.nodeIdaccessor
                                            }
                                        });
                                    }else {
                                        let newNodes = dd.nodes.map(node => {
                                            const {[key]: _, ...rest} = node; // Destructure to exclude the key
                                            return rest; // Return the new object without the key
                                        });
                                        dispatch({
                                            type: CHANGE_DATA,
                                            payload: {
                                                nodes: newNodes,
                                                links: dd.links,
                                                nodeIdaccessor: all33.nodeIdaccessor
                                            }
                                        });
                                    }
                                }
                            }
                        }>delete prop from all node</button>




                        <p>list of subgraph id</p>
                        <br/>
                        <br/>

                        <p>subgraphid right now</p>
                        <br/>
                        <br/>

                        <BorderWrapper>
                            <>overwrite current graph with json (will not affect db), assume node id is named id</>
                            <div>
                                <textarea
                                    rows={10}
                                    cols={50}
                                    value={value2}
                                    onChange={handleChange2}
                                    placeholder="Type your text here..."
                                    style={{padding: '10px', fontSize: '16px'}}
                                />
                                <button
                                    onClick={() => {
                                        let ggg = JSON.parse(value2)
                                        dispatch({
                                            type: CHANGE_DATA,
                                            payload: {
                                                nodes: ggg.nodes,
                                                links: ggg.links,
                                                nodeIdaccessor: "id"
                                            },

                                        })
                                    }}
                                >execute import
                                </button>
                            </div>
                        </BorderWrapper>
                        <BorderWrapper>
                            <button onClick={
                                () => {

                                }}>
                                add current graph to db(plz make sure the unique id exist on all node in the current
                                graph)
                                positions will be ignored
                                (prefer you add a subgraph id property to all nodes, so that you can load this subgraph
                                later)
                            </button>
                        </BorderWrapper>
                        <br/>
                        <br/>
                        <button onClick={
                            () => {
                                updateNodesPositionsToBackend()
                            }
                        }>update nodes positions to Backend
                        </button>

                        <button id="emit-particles-btn" onClick={emptyGraph}>emptyGraph</button>
                        <button id="emit-particles-btn" onClick={loadSample}>loadSample</button>
                        <button id="emit-particles-btn" onClick={saveGraph}>saveGraph</button>
                        <button id="emit-particles-btn" onClick={loadGraphFromLastSave}>loadGraphFromLastSave</button>
                        <FileDrop
                            fileContent={fileContent2}
                            setFileContent={setFileContent2}
                            setdd={setdd}
                            text={"loadGraphFromLocal"}
                        ></FileDrop>
                    </BorderCollapsibleWrapper>

                    <br></br>
                    <BorderCollapsibleWrapper trigger="view mode control">

                        <BorderCollapsibleWrapper trigger={"Render control"}>
                            <button
                                onClick={
                                    fixAllNodes
                                }
                            > stop
                            </button>
                            <button
                                onClick={
                                    unfixAllNodes
                                }
                            > start
                            </button>
                        </BorderCollapsibleWrapper>

                        <button id="emit-particles-btn" onClick={
                            () => {
                                dispatch({
                                        "type": "SET_GRAPHTYPEEE",
                                        payload: 'ThreeD'
                                    }
                                );
                            }
                        }>ThreeD
                        </button>
                        <button id="emit-particles-btn" onClick={
                            () => {
                                dispatch({
                                        "type": "SET_GRAPHTYPEEE",
                                        payload: "VR"
                                    }
                                );
                            }
                        }>VR
                        </button>
                        <button id="emit-particles-btn" onClick={() => {
                            dispatch({

                                    "type": "SET_GRAPHTYPEEE",
                                    payload: 'TwoD'
                                }
                            );
                        }
                        }>TwoD
                        </button>

                        <br></br>

                        <button id="emit-particles-btn" onClick={() => {
                            fgRef.current.zoomToFit(400)
                        }}>fit all
                        </button>

                        <button id="emit-particles-btn" onClick={() => {
                            fgRef.current.centerAt(0, 0, 1000);
                        }}>center
                        </button>
                        <button id="emit-particles-btn" onClick={() => {
                            let ggg = objectToBeInspected.x
                            let ggg2 = objectToBeInspected.y
                            if (ggg) {

                                fgRef.current.centerAt(ggg, ggg2, 1000);
                            }
                        }}>zoom at selected node
                        </button>

                        <button id="emit-particles-btn" onClick={() => {
                            const bloomPass = new UnrealBloomPass();
                            bloomPass.strength = 4;
                            bloomPass.radius = 1;
                            bloomPass.threshold = 0;
                            fgRef.current.postProcessingComposer().addPass(bloomPass);
                        }}>zoomToFit
                        </button>
                        {map
                        }
                    </BorderCollapsibleWrapper>
                    <br/>
                    <BorderCollapsibleWrapper trigger="github repo related">

                        {
                            <button id="emit-particles-btn"
                                    onClick={getRepoData}
                            >getAllRepos</button>
                        }
                        {
                            <FileDrop
                                fileContent={fileContent}
                                setFileContent={setFileContent}
                                setrepo={setrepo}
                                text={"load repo list from local"}
                            >
                            </FileDrop>
                        }
                        <div
                            // we want to take its overflow.  so that we can scroll it
                            style={{
                                border: "3px solid red",
                                overflow: "auto",
                                height: "100px"
                            }}
                        >{returnListRepo()}</div>
                    </BorderCollapsibleWrapper>
                    <br/>
                    <BorderCollapsibleWrapper trigger="search area">
                        <TextField
                            label="Enter something"   // You can change the label text here
                            variant="outlined"        // Style variant, options: "filled", "outlined", "standard"
                            value={search}
                            onChange={handleInputChange}
                        />
                        <div style={
                            {
                                overflow: "scroll",
                                height: "100px"
                            }
                        }>{filterdd.map((item) => {
                            return <li onClick={() => {
                                l("Please implement this functionality to inspect the item");
                                // setObjectToBeInspected(item);

                            }}>{item.name}</li>
                        })}

                        </div>

                    </BorderCollapsibleWrapper>
                    <br/>

                    <BorderCollapsibleWrapper trigger="deprecated">
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={istreemaxlevelrestricted}
                                    onChange={() => {
                                        setistreemaxlevelrestricted(!istreemaxlevelrestricted);

                                    }}
                                />
                                istreemaxlevelrestricted
                            </label>
                        </div>
                        <div>
                            <input
                                type="text"
                                value={tempNumber}
                                onChange={(e) => setTempNumber(e.target.value)}
                                placeholder="Enter a number"
                            />
                            <button onClick={() => {
                                const parsedNumber = parseInt(tempNumber, 10); // Ensure we're working with a number
                                // Use a basic validation to check if the input is a number
                                if (!isNaN(parsedNumber)) {
                                    settreemaxlevel(parsedNumber);
                                }
                            }}>Update treemaxlevel
                            </button>
                        </div>
                        <div>
                            <p>istreemaxlevelrestricted: {istreemaxlevelrestricted ? 'True' : 'False'}</p>
                            <p>treemaxlevel: {treemaxlevel}</p>
                        </div>

                    </BorderCollapsibleWrapper>

                </div>
            ) : (
                <div className="floating-control-icon" onClick={toggleVisibility}>
                    {/* Replace with your icon, using a placeholder emoji for example */}
                    ⚙click to show
                </div>
            )}
        </>
    );
};

export default connect(
    state => state,
    {
        changeSetting,
        fetchData11: fetchAllNodesAndRelations,
        updateNodesPositionsToBackend,
        executeCypherQuery
    }
)(ControlPanel);
