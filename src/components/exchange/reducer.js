import {SET_RATES, SET_CURRENCY, fetchRates} from "./actions";
import {Map} from "immutable";

const init = () => new Map ({
    "date": "2018-10-19",
    "rates": {
        "CAD": 1.24,
        "JPY": 86.3383956647,
        "GBP": 0.5888807118,
        "AUD": 1.0747976183,
        "USD": 1,
        "EUR": 0.6690305747,
        "CHF": 0.7640998194
    },
    "base": "USD"
});

const exchangeReducer = (state = init(), action) => {
    switch (action.type) {
        case SET_RATES:
        const updatedRates = fetchRates(action.value);
        console.log("updated", updatedRates);
            return state.merge({
                ...fetchRates(action.value)
            })
        case SET_CURRENCY:
            return state.merge({
                base: action.value,
                ...state
            })
        default:
            return state;
    }
};

export default exchangeReducer;