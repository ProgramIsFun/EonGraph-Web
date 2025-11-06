import {
  CHANGE_SETTINGS,
  CHANGE_DATA,
  CHANGE_LINKS, CHANGE_USING_NEO4J
} from '../actions/types';

export const cccccccccc = {

  // 2D
  "TwoD_global_scale_adjustment_coefficient":
      {"value": 0.5, "min": 0.1, "max": 1, "step": 0.1},
  "TwoD_repulsive_Force_Scale":
      {"value": -100, "min": -1000, "max": 1, "step": 1},
  "TwoD_node_font_size":
      {"value": 6, "min": 1, "max": 20, "step": 1},

  "TwoD_link_opacity":
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
        {"value": 6, "min": 1, "max": 20, "step": 1},
  "VR_linkOpacity":
        {"value": 0.6, "min": 0, "max": 1, "step": 0.1},
  "VR_linkWidth":
      {"value": 0.6, "min": 0, "max": 1, "step": 0.1},
    "VR_linkDirectionalParticles":
        {"value": 4, "min": 1, "max": 10, "step": 1},
    "VR_linkDirectionalParticleWidth":
            {"value": 2, "min": 1, "max": 10, "step": 1},
    "VR_linkDirectionalParticleSpeed":
            {"value": 0.002, "min": 0.001, "max": 0.01, "step": 0.001},

}


const initialState = {
  settings:{

    // 2D
    "TwoD_global_scale_adjustment_coefficient": 0.5,
    "TwoD_repulsive_Force_Scale": -100,
    "TwoD_node_font_size": 6,
    "TwoD_link_opacity": 0.6,
    "TwoD_linkWidth": 0.3,
    "TwoD_linkDirectionalParticles": 4,
    "TwoD_linkDirectionalParticleWidth": 2,
    "TwoD_linkDirectionalParticleSpeed": 0.002,

    // VR
    "VR_global_scale_adjustment_coefficient": 0.5,
    "VR_repulsive_Force_Scale": -100,
    "VR_node_font_size": 6,
    "VR_linkOpacity": 0.6,
    "VR_linkWidth":0.6,
    "VR_linkDirectionalParticles": 4,
    "VR_linkDirectionalParticleWidth": 2,
    "VR_linkDirectionalParticleSpeed": 0.002,
  },
  dd:{nodes: [], links: []},
  usingNEO4J:true
};

function all33Reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_SETTINGS:
      let key=payload.key;
      let value=payload.value;

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
        }
      };
    case CHANGE_LINKS:
        return {
            ...state,
            dd: {
            ...state.dd,
            links: payload.links
            }
        };
    case CHANGE_USING_NEO4J:
        return {
            ...state,
            usingNEO4J: payload
        };
    default:
      return state;
  }
}

export default all33Reducer;

