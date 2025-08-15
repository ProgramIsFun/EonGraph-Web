import {l} from "./loghelper";
import {CHANGE_LINKS, SET_OBJECT_TO_BE_INSPECTED} from "../actions/types";
import {v4 as uuidv4} from "uuid";

export function getNormalclick(objectToBeInspected, dispatch, dd) {
    return (node) => {
        console.log("received node click..............................................", node)
        if (1) {
            if (Object.keys(objectToBeInspected).length === 0) {
                l("setting objectToBeInspected", node)
                l("In VR mode this will crash whole website ")
                dispatch({type: SET_OBJECT_TO_BE_INSPECTED, payload: node})
            } else {


                if (objectToBeInspected === node) {
                    l("clicked on the same node, unsetting objectToBeInspected")
                    dispatch({type: SET_OBJECT_TO_BE_INSPECTED, payload: {}})
                } else {
                    l("clicked on a different node")
                    let enableLinking = true
                    if (enableLinking) {
                        let shouldAddLink = false;

                        // check if any link in all the links have the same source and target.
                        let some = dd.links.some(
                            link => {
                                let lll = (
                                    link.source.id === objectToBeInspected.id
                                    && link.target.id === node.id
                                ) || (
                                    link.source.id === node.id &&
                                    link.target.id === objectToBeInspected.id
                                )
                                if (lll) {
                                    l("link already exists!!!!!!!!!", link.source.id, objectToBeInspected.id, link.target.id, node.id)
                                } else {

                                }
                                return lll
                            }
                        );
                        shouldAddLink = !some
                        l("shouldAddLink", shouldAddLink, "objectToBeInspected.id", objectToBeInspected.id, "node.id", node.id)
                        if (shouldAddLink) {
                            let linkId = uuidv4()
                            l("objectToBeInspected.id", objectToBeInspected.id, "node.id", node.id)
                            const interimLink = {
                                id: linkId,
                                source: objectToBeInspected.id,
                                target: node.id,
                                name: 'link_' + linkId
                            };
                            let payload = [
                                ...dd.links, interimLink
                            ];
                            l("payload3333333333333333", payload)
                            dispatch({
                                type: CHANGE_LINKS, payload: payload
                            })
                            dispatch({type: SET_OBJECT_TO_BE_INSPECTED, payload: {}})
                        }
                    } else {
                    }
                }
            }

        }
    };
}
