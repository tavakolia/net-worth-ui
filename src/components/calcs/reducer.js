import _ from "lodash";
import {fromJS} from "immutable";

const ROUNDING_DECIMALS = 2;

const init = () => {
    return fromJS(
    {
        data: {
            assets: [],
            liabilities: []
        },
        totalAssets: 0,
        totalLiabilities: 0,
        netWorth: 0,
        _id: "1",
        currency: "GBP"
    });
};

const getTemplateAccount = () => 
{
    return ({
        name: "New Account",
        value: 0
    });
}

const getTemplateSection = () => {
    return ({
        accounts: [],
        accountType: "Account Type"
    });
};

const netWorthReducer = (state = init(), action) => {
    switch (action.type) {
        case "ADD_ACCOUNT":
            return state.merge({
                ...addTemplateAccount(state.toJS(), action.value)
            });
        case "ADD_SECTION":
            return state.merge({
                ...addTemplateSection(state.toJS(), action.value)
            });
        case "UPDATE_SUBSECTION":
            const updatedSubsection = updateSubSection(state.toJS(), action.value);
            const newState = {
                ...updatedSubsection,
                ...calculateSubTotals(state.toJS())
            };
            return state.merge(newState);
        case "UPDATE_HEADER":
            return state.merge({
                ...updateHeader(state.toJS(), action.value)
            });
        case "UPDATE":
            let subTotals = calculateSubTotals(action.value);
            const updatedState = state.merge({
                ...subTotals,
                ...action.value
            });
            return updatedState;
        case "EXCHANGE_CURRENCY":
            const newData = exchangeCurrency(state.toJS(), action.value);
            return state.merge({
                ...calculateSubTotals(newData),
                ...newData
            });
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
                    account.value = (account.homeValue * rate).toFixed(ROUNDING_DECIMALS);
                })
            })
    });
    return data;
}

const addTemplateAccount = (state, id) => {
    const account = findEntity(state.data, id);
    account.accounts.push(getTemplateAccount());
    return state;
}

const updateHeader = (state, newHeader) => {
    const account = findEntity(state.data, newHeader._id);
    if(account) {
        _.assign(account, newHeader);
    }
    return state;
}

const addTemplateSection = (state, type) => {
    const sectionType = state.data[type];
    sectionType.push(getTemplateSection());
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

const findEntity = (data, id) => {
    const sections = _.toArray(data);
    for (let i=0; i < sections.length; i++) {
        const section = sections[i];
        if(id === section._id) {
            return section;
        }
        for(let j=0; j < section.length; j++) {
            const subsection = section[j];
            if(subsection._id && id === subsection._id) {
                return subsection;
            }
            for(let k=0; k < subsection.accounts.length; k++) {
                const account = subsection.accounts[k];
                if(account._id && id === account._id) {
                    return account;
                }
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
    let curAccount = findEntity(state.data, newAccount._id);
    if (curAccount) {
        _.assign(curAccount, newAccount);
        if(_.isString(curAccount._id) && curAccount._id.startsWith("temp")) {
            delete curAccount._id;
        }
    };
    return state;
}

export default netWorthReducer;
