import {combineReducers} from "redux";

import netWorthReducer from "../components/reducer";
import statusReducer from "../components/statusReducer";
import exchangeReducer from "../components/exchange/reducer";

export default function createReducer() {
    return combineReducers({
        netWorthReducer,
        statusReducer,
        exchangeReducer
    });
}
