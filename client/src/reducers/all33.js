import {
  CHANGE_SETTINGS,
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  NO_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE
} from '../actions/types';


export const cccccccccc = {
  "repulsive_Force_Scale":
      {"value": -100, "min": -1000, "max": 1, "step": 1},
  "node_font_size": {"value": 6, "min": 1, "max": 20, "step": 1},
  "global_scale_adjustment_coefficient": {"value": 0.5, "min": 0.1, "max": 1, "step": 0.1},
  "link_opacity": {"value": 0.6, "min": 0, "max": 1, "step": 0.1},
  "linkWidth": {"value": 0.3, "min": 0, "max": 1, "step": 0.1},
  "linkDirectionalParticles": {"value": 4, "min": 1, "max": 10, "step": 1},
  "linkDirectionalParticleWidth": {"value": 2, "min": 1, "max": 10, "step": 1},
  "linkDirectionalParticleSpeed": {"value": 0.002, "min": 0.001, "max": 0.01, "step": 0.001}
}



const initialState = {
  settings:{
    "repulsive_Force_Scale": -100,
    "node_font_size": 6,
    "global_scale_adjustment_coefficient": 0.5,
    "link_opacity": 0.6,
    "linkWidth": 0.3,
    "linkDirectionalParticles": 4,
    "linkDirectionalParticleWidth": 2,
    "linkDirectionalParticleSpeed": 0.002
  },
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
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
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: []
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    case NO_REPOS:
      return {
        ...state,
        repos: []
      };
    default:
      return state;
  }
}

export default all33Reducer;

