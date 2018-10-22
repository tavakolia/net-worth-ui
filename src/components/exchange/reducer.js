import {SET_RATES} from "./actions";

const init = {
    "date": "2018-10-19",
    "rates": {
        "CAD": 1,
        "JPY": 86.3383956647,
        "GBP": 0.5888807118,
        "AUD": 1.0747976183,
        "USD": 0.7673780692,
        "EUR": 0.6690305747,
        "CHF": 0.7640998194
    },
    "base": "CAD"
}

const exchangeReducer = (state = init, action) => {
    switch (action.type) {
        case SET_RATES:
            return action.value
        default:
            return state;
    }
};

export default exchangeReducer;