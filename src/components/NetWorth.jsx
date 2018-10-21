import React, {Component} from "react";
import 'react-table/react-table.css';
import Section from "./Section";
import {connect} from "react-redux";
import {loadData} from "./actions";
import Exchange from "./Exchange";

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {data: props.data};
        props.loadDataOption();
    }

    render() {
        const { data, currency } = this.props;
        const { status } = this.props;

        return(
            <div className="App">
                <div>{status.status === "LOADING" ? "Loading..." : ""}</div>
                <div className="App-header">Net Worth Calculator</div>
                <Exchange currency={currency} />
                <Section header="Assets" data={data.assets} />
                <Section header="Liabilities" data={data.liabilities} />
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        status: state.statusReducer,
        data: state.netWorthReducer.data,
        currency: state.netWorthReducer.currency
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