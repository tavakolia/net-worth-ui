
const init = {
    data: {
        assets: [
            {
                accounts: [
                    {
                        _id: 1,
                        name: "Chequing",
                        value: 660
                    },
                    {
                        _id: 2,
                        name: "Bank",
                        value: 1100
                    }
                ],
                _id: 5,
                accountType: "MaybeCash"
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
        ]
    },
    _id: "5bcacfbc1768f834f754d2b2",
    currency: "USD",
    updatedAt: "2018-10-20T17:47:27.251Z",
    created_at: "2018-10-20T17:47:27.251Z"
};

const netWorthReducer = (state = init, action) => {
    switch (action.type) {
        case "UPDATE":
            return action.value;
        default:
            return state;
    }
};

export default netWorthReducer;
