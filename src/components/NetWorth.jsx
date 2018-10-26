import React, {Component} from "react";
import 'react-table/react-table.css';
import {connect} from "react-redux";
import {loadData} from "./calcs/actions";
import Exchange from "./exchange/Exchange";
import Status from "./status/Status";
import Calcs from "./calcs/Calcs";

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {data: props.data};
        props.loadDataOption();
    }

    render() {
        const {currency} = this.props;

        return(
            <div className="App">
                <Status />
                <div className="App-header">Net Worth Calculator</div>
                <Exchange currency={currency} />
                <Calcs />
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        currency: state.netWorthReducer.get('currency'),
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