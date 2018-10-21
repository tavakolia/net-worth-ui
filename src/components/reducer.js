import _ from "lodash";

const init = {
    data: {
        assets: [
            {
                accounts: [
                    {
                        _id: 1,
                        name: "Chequing",
                        value: 660
                    }
                ],
                _id: 5,
                accountType: "Cash"
            }
        ],
        liabilities: [
            {
                accounts: [
                    {
                        _id: 3,
                        name: "Debt",
                        value: 100
                    }
                ],
                _id: 4,
                accountType: "LT Debts"
            }
        ],
        totalAssets: 660,
        totalLiabilities: 100,
        netWorth: 560
    },
    _id: "6",
    currency: "USD"
};

const netWorthReducer = (state = init, action) => {
    switch (action.type) {
        case "UPDATE":
            let subTotals = calculateSubTotals(action.value);
            console.log("Update", state);
            return {
                ...subTotals,
                ...action.value
            };
        case "UPDATE_SUBSECTION":
            updateSubSection(state, action.value);
            const newState = {
                ...state,
                ...calculateSubTotals(state)
            }
            console.log("newState", newState);
            return newState;
        default:
            return state;
    }
};

const calculateSubTotals = (state) => {
    const totalAssets = getTotal(state.data.assets),
        totalLiabilities = getTotal(state.data.liabilities);
    return {
        totalAssets,
        totalLiabilities,
        netWorth: totalAssets - totalLiabilities
    }
}

const getTotal = (data) => {
    let total = 0;
    const flat = _.flatMap(data, acc => acc.accounts);
    _.forEach(flat, acc => {
        total += parseInt(acc.value);
    })
    return total;
}

const updateSubSection = (state, account) => {
    _.forEach(state.data, (section, key) => { 
        const sectionKey = _.findKey(section, acc => acc._id === account._id);
        debugger;
        console.log("section", sectionKey);
        if (sectionKey) {
            state.data[key][sectionKey] = account;
            return;
        }
    });
}

export default netWorthReducer;
