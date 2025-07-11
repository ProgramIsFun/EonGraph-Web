import api from '../autil/api';
import {setAlert} from './alert';

import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_REPOS,
    NO_REPOS, CHANGE_SETTINGS, CHANGE_DATA
} from './types';
import {l} from "../autil/log11";
import {rawdata} from "../autil/helperfile";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await api.get('/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
    dispatch({type: CLEAR_PROFILE});

    try {
        const res = await api.get('/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
    try {
        const res = await api.get(`/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
    try {
        const res = await api.get(`/profile/github/${username}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: NO_REPOS
        });
    }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
    dispatch
) => {
    try {
        const res = await api.post('/profile', formData);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if (!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
    try {
        const res = await api.put('/profile/experience', formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success'));

        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
    try {
        const res = await api.put('/profile/education', formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success'));

        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
    try {
        const res = await api.delete(`/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
    try {
        const res = await api.delete(`/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            await api.delete('/profile');

            dispatch({type: CLEAR_PROFILE});
            dispatch({type: ACCOUNT_DELETED});

            dispatch(setAlert('Your account has been permanently deleted'));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            });
        }
    }
};

export const changeSetting = (key, value) => async (dispatch) => {
    try {
        dispatch({
            type: CHANGE_SETTINGS,
            payload: {"key": key, "value": value}
        });
        dispatch(setAlert('Settings Updated', 'success'));
    } catch (err) {

    }
}

export const fetchData11 = (b) => async (dispatch) => {
    try {

        l("fetching data from ", b + '/api/v0/return_all_nodes111')
        const response = await fetch(b + '/api/v0/return_all_nodes111');
        const jsonData = await response.json();
        rawdata(jsonData);


        let duplicateOriginalIdToJustID=true;
        if (duplicateOriginalIdToJustID) {
            jsonData.nodes.forEach(node => {
                    node.id = node.user_generate_id_7577777777
                }
            )
        }
        dispatch({
            type: CHANGE_DATA,
            payload: {
                nodes: jsonData.nodes,
                links: jsonData.links
            }
        })

    } catch (error) {
        console.error('Error fetching data:', error);
    }

}
export const fetchNodeData = (nodeId) => async (dispatch,getState) => {
    try {

        const state = getState();
        l("fetchNodeData state", state)
        let all33 = state.all33;

        let useremote = all33.useremote;
        let localbackendurl = all33.localbackendurl;
        let remotebackendurl = all33.remotebackendurl;
        let b = useremote ? remotebackendurl : localbackendurl
        l("fetchNodeData b", b)
        const res = await fetch(b+'/api/v0/get_specific_node_with_specific_id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nodeIdAccess: nodeId
            })
        })
        if (!res.ok) {
            l("Network response was not ok", res.statusText);
            throw new Error('Network response was not ok');
        }
        let body= await res.json();
        l("response from fetchNodeData", body)
        l("body.node", body.node[0])
        let ku={
            "labels": [
            "normalNode588888888"
        ],
            "properties": {
            "name": "ionic",
                "user_generate_id_7577777777": "39bbb8f8-19dd-4421-b2de-4ffa90f96a36"
        }
        }
        if (0) {
            dispatch({
                type: 'FETCH_NODE_DATA',
                payload: res.data
            });
        } else {
        }
    } catch (err) {
        dispatch(setAlert('Error fetching node data', 'danger'));
    }
}