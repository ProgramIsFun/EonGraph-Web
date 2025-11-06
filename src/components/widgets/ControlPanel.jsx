import React, {useRef, useState} from 'react';
import Slider from '@mui/material/Slider';
import {TextField} from "@mui/material";
import {auth} from "../../autil/firebase";
import FileDrop from "./FileDrop";
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import {cgg} from "../../autil/helperfile";
import {connect, useDispatch} from "react-redux";
import {l} from "../../autil/loghelper";
import {changeSetting, fetchData11} from "../../actions/all33";
import {cccccccccc} from "../../reducers/all33";
import {CHANGE_USEREMOTE, CHANGE_USING_NEO4J} from "../../actions/types";


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

    const inputRef1 = useRef(null);


    const search = props.search;
    const setSearch = props.setSearch;
    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };
    const filterdd = props.filterdd;

    const usingNEO4J = all33.usingNEO4J;


    const changeSetting = props.changeSetting;
    const [value, setValue] = React.useState(30);

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                <div className="floating-control-panel"

                     style={{
                         overflow: "scroll",
                         height: "80vh",
                     }}>
                    <button onClick={toggleVisibility}>Hide</button>

                    <br/>

                    <button
                        onClick={() => {
                            cgg("signing out");
                            auth.getAuth().signOut();
                        }}
                    >
                        Logout
                    </button>
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

                    <br/>

                    <br/>

                    <p>usingNEO4J: {usingNEO4J ? 'True' : 'False'}<input
                        type="checkbox"
                        checked={usingNEO4J}
                        onChange={(event) => {
                            let a = event.target.checked;
                            dispatch({"type": CHANGE_USING_NEO4J, payload: a})
                        }}
                    /> if set to true, any change of the graph would be sent
                        to database.

                    </p>


                    <br/>

                    <p>useremote: {useremote ? 'True' : 'False'} , false=local backend, true=remote backend.</p>
                    <input
                        type="checkbox"
                        checked={useremote}
                        onChange={
                            (event) => {
                                dispatch({"type": CHANGE_USEREMOTE, payload: event.target.checked})
                            }
                        }
                    />


                    <p>{notice}</p>

                    <br/>
                    <>graph data management</>
                    <button onClick={
                        () => {
                            fetchData111()
                        }
                    }>get the graph from nE04J
                    </button>
                    <button onClick={
                        () => {

                        }
                    }>update nodes positions to NEO4J
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


                    <br></br>
                    <br></br>
                    <>view mode control</>
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


                    <br/>

                    <br/>
                    <p>repo related</p>
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

                    <div>search</div>
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

                    {map
                    }
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
    {changeSetting, fetchData11}
)(ControlPanel);
