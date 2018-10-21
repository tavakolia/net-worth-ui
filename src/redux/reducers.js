import {combineReducers} from "redux";

import netWorthReducer from "../components/reducer";
import statusReducer from "../components/statusReducer";

export default function createReducer() {
    return combineReducers({
        netWorthReducer,
        statusReducer
    });
}
