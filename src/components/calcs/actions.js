import {changeStatus} from "../status/actions";
import {setRates} from "../exchange/actions";

const baseURL = 'http://localhost:3030';

export const loadData = () => {
    return async (dispatch) => {
        const response = await getLastCalc()
        
        if(!response.error) {
            dispatch({type: "UPDATE", value: response});
            dispatch(setRates());
            dispatch(changeStatus("LOAD_SUCCESS"));
        } else {
            dispatch({type: "LOAD_FAILED", value: response.error})
        }
    }
}

export const saveData = () => {
    return async (dispatch, getState) => {
        dispatch({type: "SAVING"});
        const response = await patchState(dispatch, getState());
        dispatch({type: "UPDATE", value: response});
    }
}

const patchState = async (dispatch, state) => {
    const url = baseURL + '/calc/' + state.netWorthReducer.get('_id');
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state.netWorthReducer.toJS())
        });
        dispatch({type: "LOAD_SUCCESS"});
        return response.json();
    }
    catch (error) {
        console.error('Error saving:', error);
        dispatch({type: "LOAD_FAILED", value: error})
    }
}

const getLastCalc = async () => 
{
    const url = baseURL + "/lastCalc";
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }
    catch (error) {
        console.error('Error:', error);
        //TODO: handle error
        return {
            error
        };
    }
};
