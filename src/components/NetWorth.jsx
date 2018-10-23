import React, {Component} from "react";
import 'react-table/react-table.css';
import Section from "./Section";
import {connect} from "react-redux";
import {loadData} from "./actions";
import Exchange from "./exchange/Exchange";

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {data: props.data};
        props.loadDataOption();
    }

    render() {
        const { data, currency, status, netWorth } = this.props;

        return(
            <div className="App">
                <div>{status.status === "LOADING" ? "Loading..." : ""}</div>
                <div className="App-header">Net Worth Calculator</div>
                <Exchange currency={currency} />
                <div className="Net-Worth">Net Worth: {netWorth}</div>
                <Section header="Assets" data={data.get('assets')} />
                <Section header="Liabilities" data={data.get('liabilities')} />
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        status: state.statusReducer,
        data: state.netWorthReducer.get('data'),
        currency: state.netWorthReducer.get('currency'),
        netWorth: state.netWorthReducer.get('netWorth')
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        loadDataOption: () => {
            dispatch({
                type: "LOAD_INITIAL",
            });
            dispatch(loadData());
        }
    };
};

const NetWorth = connect(mapStateToProps, mapDispatchToProps)(View)

export default NetWorth;