import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  NO_REPOS,
  CHANGE_SETTINGS
} from '../actions/types';

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
