/*
 * action types
 */
export const SET_RATES = "SET_DATE_RANGE";

/*
 * action creators
 */
export function setDateRange(rates) {
    return {
        type: SET_RATES,
        value: rates
    };
}