import {Map} from "immutable";

const init = () => {
    return new Map({
        status: "STALE"
    })
};

const statusReducer = (state = init(), action) => {
    switch (action.type) {
        case "LOAD_INITIAL":
            return {status: "LOADING"};
        case "LOAD_SUCCESS":
            return {status: "FRESH"};
        case "LOAD_FAILED":
            return {status: "STALE"};
        case "SAVING":
            return {status: "SAVING"};
        default:
            return state;
    }
};

export default statusReducer;