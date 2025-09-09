// avoid doing state calculations inside your action creators (or thunks)
// , even after asynchronous API calls.
//     Instead, you should dispatch an action describing what happened,
//     and let the reducer calculate the next state

import {
    CHANGE_SETTINGS,
    CHANGE_DATA,
    CHANGE_LINKS,
    CHANGE_USING_NEO4J,
    ADD_NODE,
    SET_OBJECT_TO_BE_INSPECTED,
    SET_USEREMOTE, CHANGE_USEREMOTE, FETCH_NODE_DATA
} from '../actions/types';
import {localBackendUrl, NODE_ID_ACCESSOR, remoteBackendUrl, SAMPLE_CYPHER} from "../constants";

export const cccccccccc = {
    // 2D
    "TwoD_global_scale_adjustment_coefficient":
        {"value": 0.5, "min": 0.1, "max": 1, "step": 0.1},
    "TwoD_repulsive_Force_Scale":
        {"value": -100, "min": -1000, "max": 1, "step": 1},
    "TwoD_node_font_size":
        {"value": 6, "min": 1, "max": 20, "step": 1},
    "TwoD_linkOpacity":
        {"value": 0.6, "min": 0, "max": 1, "step": 0.1},
    "TwoD_linkWidth":
        {"value": 0.3, "min": 0, "max": 1, "step": 0.1},
    "TwoD_linkDirectionalParticles":
        {"value": 4, "min": 1, "max": 10, "step": 1},
    "TwoD_linkDirectionalParticleWidth":
        {"value": 2, "min": 1, "max": 10, "step": 1},
    "TwoD_linkDirectionalParticleSpeed":
        {"value": 0.002, "min": 0.001, "max": 0.01, "step": 0.001},
    // VR
    "VR_global_scale_adjustment_coefficient":
        {"value": 0.5, "min": 0.1, "max": 1, "step": 0.1},
    "VR_repulsive_Force_Scale":
        {"value": -100, "min": -1000, "max": 1, "step": 1},
    "VR_node_font_size":
        {"value": 6, "min": 1, "max": 200, "step": 1},
    "VR_linkOpacity":
        {"value": 0.6, "min": 0, "max": 1, "step": 0.1},
    "VR_linkWidth":
        {"value": 0.6, "min": 0, "max": 1, "step": 0.1},
    "VR_linkDirectionalParticles":
        {"value": 0, "min": 0, "max": 10, "step": 1},
    "VR_linkDirectionalParticleWidth":
        {"value": 2, "min": 1, "max": 10, "step": 1},
    "VR_linkDirectionalParticleSpeed":
        {"value": 0.002, "min": 0.000, "max": 0.01, "step": 0.001},
    "VR_highlightHaloOpacity":
        {"value": 0.15, "min": 0, "max": 1, "step": 0.01},
    "VR_highlightHaloColor":
        {"value": 0xffff00, "min": 0x000000, "max": 0xffffff, "step": 1},

}


const initialState = {
    settings: {
        // 2D
        "TwoD_global_scale_adjustment_coefficient": 0.5,
        "TwoD_repulsive_Force_Scale": -100,
        "TwoD_node_font_size": 6,
        "TwoD_linkOpacity": 0.6,
        "TwoD_linkWidth": 0.3,
        "TwoD_linkDirectionalParticles": 4,
        "TwoD_linkDirectionalParticleWidth": 2,
        "TwoD_linkDirectionalParticleSpeed": 0.002,
        // VR
        "VR_global_scale_adjustment_coefficient": 0.5,
        "VR_repulsive_Force_Scale": -100,
        "VR_node_font_size": 6,
        "VR_linkOpacity": 0.6,
        "VR_linkWidth": 0.6,
        "VR_linkDirectionalParticles": 0,
        "VR_linkDirectionalParticleWidth": 2,
        "VR_linkDirectionalParticleSpeed": 0.002,
        "VR_highlightHaloOpacity": 0.15,
        "VR_highlightHaloColor": 0xffff00,
    },
    dd: {nodes: [], links: []},
    nodeIdAccessor: NODE_ID_ACCESSOR, // this is the accessor for the node id, it can be changed to any property of the node object, like "name" or "label"
    
    usingNEO4J: true,
    objectToBeInspected: {},
    localBackendUrl: localBackendUrl,
    remoteBackendUrl: remoteBackendUrl,
    useRemote: false, // true means use remote backend, false means use local backend
    graphTypeRender: 'VR',
    useNodeLocationWhenLoadingGraph: true,
    cypherEditorMainContent: SAMPLE_CYPHER, // not used
};

function all33Reducer(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case CHANGE_SETTINGS:
            let key = payload.key;
            let value = payload.value;

            return {
                ...state,
                settings:
                    {
                        ...state.settings,
                        [key]: value
                    }
            };
        case CHANGE_DATA:
            return {
                ...state,
                dd: {
                    nodes: payload.nodes,
                    links: payload.links
                },
                nodeIdAccessor: payload.nodeIdAccessor !== undefined
                    ? payload.nodeIdAccessor
                    : state.nodeIdAccessor
            };

        case ADD_NODE:
            return {
                ...state,
                dd: {
                    ...state.dd,
                    nodes: [...state.dd.nodes, payload]
                }
            };

        case CHANGE_LINKS:
            return {
                ...state,
                dd: {
                    ...state.dd,
                    links: payload
                }
            };
        case CHANGE_USING_NEO4J:
            return {
                ...state,
                usingNEO4J: payload
            };
        case SET_OBJECT_TO_BE_INSPECTED:
            return {
                ...state,
                objectToBeInspected: payload
            };
        case SET_USEREMOTE:
            return {
                ...state,
                useRemote: payload
            };
        case 'SET_GRAPHTYPEEE':
            return {
                ...state,
                graphTypeRender: payload
            };
        case CHANGE_USEREMOTE:
            return {
                ...state,
                useRemote: payload
            };
        case FETCH_NODE_DATA:
            l("not implemented yet, payload", payload)
            return {
                ...state
            };

        default:
            return state;
    }
}

export default all33Reducer;

