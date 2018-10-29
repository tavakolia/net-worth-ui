import {SET_CURRENCY} from "./actions";
import {fromJS} from "immutable";

const init = () => fromJS ({
    "date": "2018-10-19",
    "rates": {
        "CAD": 1,
        "JPY": 86.3383956647,
        "GBP": 0.5888807118,
        "AUD": 1.0747976183,
        "USD": 1.1,
        "EUR": 1.34,
        "CHF": 0.7640998194
    },
    "base": "CAD"
});

const exchangeReducer = (state = init(), action) => {
    switch (action.type) {
        case SET_CURRENCY:
            return state.merge({
                ...action.value,
            })
        default:
            return state;
    }
};

export default exchangeReducer;