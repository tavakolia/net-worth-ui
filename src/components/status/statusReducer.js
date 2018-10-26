import {Map} from "immutable";
import {LOADING} from "./actions";

const init = () => {
    return new Map({
        status: "STALE",
        message: ""
    })
};

const statusReducer = (state = init(), action) => {
    switch (action.type) {
        case LOADING:
            return {status: "LOADING"};
        case "LOAD_SUCCESS":
            return {status: "FRESH"};
        case "LOAD_FAILED":
            return {
                status: "ERROR",
                message: action.value
            };
        case "SAVING":
            return {status: "SAVING"};
        default:
            return state;
    }
};

export default statusReducer;