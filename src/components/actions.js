const baseURL = 'http://localhost:3030';

export function loadData() {
    return (dispatch, getState) => {
        getInitial().then((res) => {
            dispatch({type: "UPDATE", value: res});
            dispatch({type: "LOAD_SUCCESS"});
        });
    }
}

export function updateData() {
    return (dispatch, getState) => {
        // dispatch({type: "SAVING"});
        console.log("getState", getState());
        patchState(getState());
    }
}

const patchState = async (state) => {
    const url = baseURL + '/calc/' + state.netWorthReducer._id;
    try {
        const res = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state.netWorthReducer)
        });
        const response = await res.json();
        // console.log('Success:', JSON.stringify(response));
        return response;
    }
    catch (error) {
        console.error('Error:', error);
        return {};
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

const update = () => {

}

const changeCurrency = () => {

}