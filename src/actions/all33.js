import api from '../autil/api';
import {setAlert} from './alert';

import {
    ACCOUNT_DELETED,
    CHANGE_DATA,
    CHANGE_SETTINGS,
    CLEAR_PROFILE,
    GET_PROFILE,
    GET_PROFILES,
    GET_REPOS,
    NO_REPOS,
    PROFILE_ERROR,
    UPDATE_PROFILE
} from './types';
import {l} from "../autil/loghelper";
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

export const fetch_all_nodes_and_relations = (baseUrl) => async (dispatch) => {
    try {

        l("fetching data from ", baseUrl + '/api/v0/return_all_nodes111')
        const response = await fetch(baseUrl + '/api/v0/return_all_nodes111');
        const jsonData = await response.json();
        rawdata(jsonData);

        let injectCustomTolinks=true;
        if (injectCustomTolinks) {
            // add a custom property to each link in jsonData.links
            // random value
            jsonData.links.forEach(link => {
                link.custom123 = Math.random().toString(36).substring(7);
            });
        }

        let duplicateOriginalIdToJustID = false;
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

export const updateNodesPositionsToBackend = () => async (dispatch, getState) => {
    try {


        // get the nodes from the state, only with id, x, y, z

        const state = getState();
        l("updateNodesPositionsToBackend state", state)

        let nodeIDXYZ=state.all33.dd.nodes.map(
            node => ({
            id: node.id,
            x: node.x,
            y: node.y,
            z: node.z
            })
        )
        let all33 = state.all33;
        let useremote = all33.useremote;
        let localbackendurl = all33.localbackendurl;
        let remotebackendurl = all33.remotebackendurl;
        let b = useremote ? remotebackendurl : localbackendurl
        l("updateNodesPositionsToBackend b", b)
        const res = await fetch(b + '/api/v0/update_nodes_positions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nodes: nodeIDXYZ
            })
        })
        if (!res.ok) {
            l("Network response was not ok", res.statusText);
            throw new Error('Network response was not ok');
        }
        let body = await res.json();
        l("response from updateNodesPositionsToBackend", body)
        // dispatch(setAlert('Node positions updated to backend', 'success'));
    } catch (err) {
        l("error in updateNodesPositionsToBackend", err)
        // dispatch(setAlert('Error updating node positions to backend', 'danger'));
    }
}


export const fetchSingleNodeData = (nodeId) => async (dispatch, getState) => {
    try {

        const state = getState();
        l("fetchSingleNodeData state", state)
        let all33 = state.all33;

        let useremote = all33.useremote;
        let localbackendurl = all33.localbackendurl;
        let remotebackendurl = all33.remotebackendurl;
        let b = useremote ? remotebackendurl : localbackendurl
        l("fetchSingleNodeData b", b)
        const res = await fetch(b + '/api/v0/get_specific_node_with_specific_id', {
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
        let body = await res.json();
        l("response from fetchSingleNodeData", body)
        l("body.node", body.node[0])
        let ku = {
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

// cypher query
export const executeCypherQuery = (cypherQuery) => async (dispatch, getState) => {
    try {
        // throw "not implemented yet"
        const state = getState();
        l("executeCypherQuery state", state)
        let all33 = state.all33;

        let useremote = all33.useremote;
        let localbackendurl = all33.localbackendurl;
        let remotebackendurl = all33.remotebackendurl;
        let b = useremote ? remotebackendurl : localbackendurl
        l("executeCypherQuery b", b)
        l("executeCypherQuery cypherQuery", cypherQuery)
        const res = await fetch(b + '/api/v0/run_any_cypher', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: cypherQuery
            })
        })
        l("after fetch executeCypherQuery")

        if (!res.ok) {
            l("Network response was not ok", res.statusText);
            throw new Error('Network response was not ok');
        }
        let body = await res.json();
        l("response from executeCypherQuery", body)


        if (body) {
            l("body is 123321", body)
            // dispatch({
            //     type: CHANGE_DATA,
            //     payload: {
            //         nodes: body.nodes,
            //         links: body.links
            //     }
            // })

            // dispatch(setAlert('Cypher query executed and data updated', 'success'));
        } else {
            // dispatch(setAlert('No nodes or links returned from query', 'warning'));
        }

    } catch (err) {
        l("error in executeCypherQuery", err)
        // dispatch(setAlert('Error executing cypher query', 'danger'));
    }
}
