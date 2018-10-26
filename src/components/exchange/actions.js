/*
 * action types
 */
export const SET_RATES = "SET_RATES";
export const SET_CURRENCY = "SET_CURRENCY";

const baseURL = 'http://localhost:3030/rates';

/*
 * action creators
 */
export function setRates(rates) {
    return {
        type: SET_RATES,
        value: rates
    };
}

export function updateRates(baseCur) {
    return async (dispatch, _getState) => {
        const response = await fetchRates(baseCur);
        if (response.error) {
            dispatch({type: "ERROR", value: response.error})
        }
    }
}

export const fetchRates = async (baseCur) => {
    const url = new URL(baseURL);
    url.search = new URLSearchParams({base:baseCur});

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.json();
    }
    catch (error) {
        console.error('Error:', error);
        //TODO: handle error
        return {};
    }
}