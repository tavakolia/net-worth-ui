import _ from "lodash";
import {fromJS} from "immutable";

const init = () => {
    return fromJS(
    {
        data: {
            assets: [
                {
                    accounts: [
                        {
                            _id: 1,
                            name: "Chequing",
                            value: 200
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
                    accountType: "Long-Term Debts"
                }
            ]
        },
        totalAssets: 200,
        totalLiabilities: 100,
        netWorth: 100,
        _id: "6",
        currency: "GBP"
    });
};

const templateAccount = {
    name: "New Account",
    value: 0
}

const netWorthReducer = (state = init(), action) => {
    switch (action.type) {
        case "ADD_ACCOUNT":
            return state.merge({
                ...addTemplateAccount(state.toJS(), action.value)
            })
        case "UPDATE_SUBSECTION":
            const updatedSubsection = updateSubSection(state.toJS(), action.value);
            const newState = {
                ...updatedSubsection,
                ...calculateSubTotals(state.toJS())
            }
            return state.merge(newState);
        case "UPDATE":
            let subTotals = calculateSubTotals(action.value);
            const updatedState = state.merge({
                // data: exchangeValues(action.value.data, 1),
                ...subTotals,
                ...action.value
            });
            return updatedState;
        case "EXCHANGE_CURRENCY":
            const newData = exchangeCurrency(state.toJS(), action.value);
            return state.merge({
                ...calculateSubTotals(newData),
                ...newData
            })
        default:
            return state;
    }
};

const exchangeCurrency = (state, exchange) => {
    return {
        data: exchangeValues(state.data, exchange.rate),
        currency: exchange.currency
    };
}

const exchangeValues = (data, rate) => {
    _.forEach(data, (section) => { 
        _.forEach(section, subsection => {
            _.forEach(subsection.accounts, account => {
                    account.homeValue = account.homeValue || account.value;
                    account.value = account.homeValue * rate;
                })
            })
    });
    return data;
}

const addTemplateAccount = (state, id) => {
    const account = findAccount(state, id);
    account.accounts.push(templateAccount);
    return state;
}

const calculateSubTotals = (state) => {
    const totalAssets = getTotal(state.data.assets),
        totalLiabilities = getTotal(state.data.liabilities);
    return {
        totalAssets,
        totalLiabilities,
        netWorth: totalAssets - totalLiabilities
    }
}

const findAccount = (data, id) => {
    const accountTypes = _.toArray(data.data);
    for (let i=0; i < accountTypes.length; i++) {
        const accountType = accountTypes[i];
        for(let j=0; j < accountType.length; j++) {
            const subsection = accountType[j];
            if(id === subsection._id) {
                return subsection;
            }
        }
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

const updateSubSection = (state, newAccount) => {
    _.forEach(state.data, (section) => { 
        _.forEach(section, subsection => {
            const oldAccount = _.find(subsection.accounts, account => account._id === newAccount._id);
            if (oldAccount) {
                _.assign(oldAccount, newAccount);
            }
            return;
        })
    });
    return state;
}

export default netWorthReducer;
