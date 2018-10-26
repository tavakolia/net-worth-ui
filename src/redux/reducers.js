import {combineReducers} from "redux";

import netWorthReducer from "../components/calcs/reducer";
import statusReducer from "../components/status/statusReducer";
import exchangeReducer from "../components/exchange/reducer";

export default function createReducer() {
    return combineReducers({
        netWorthReducer,
        statusReducer,
        exchangeReducer
    });
}
