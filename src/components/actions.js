const baseURL = 'http://localhost:3030';

export function loadData() {
    return async (dispatch) => {
        const response = await getInitial()
        dispatch({type: "UPDATE", value: response});
        dispatch({type: "LOAD_SUCCESS"});
    }
}

export function updateData() {
    return async (dispatch, getState) => {
        dispatch({type: "SAVING"});
        const response = await patchState(getState());
        if (response.error) {
            dispatch({type: "ERROR", value: response.error})
        }
    }
}

const patchState = async (state) => {
    const url = baseURL + '/calc/' + state.netWorthReducer.get('_id');
    try {
        const res = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state.netWorthReducer.toJS())
        });
        const response = await res.json();
        return response;
    }
    catch (error) {
        console.error('Error saving:', error);
        return {error};
    }
}

const getInitial = async () => 
{
    const url = baseURL + '/exchange/1';
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
        return {};
    }
};
