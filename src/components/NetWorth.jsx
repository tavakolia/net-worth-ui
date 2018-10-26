import React, {Component} from "react";
import {connect} from "react-redux";
import {loadData} from "./calcs/actions";
import Exchange from "./exchange/Exchange";
import Status from "./status/Status";
import {changeStatus, LOADING} from "./status/actions";

import Calcs from "./calcs/Calcs";

class NetWorth extends Component {
    constructor(props) {
        super(props);
        this.state = {data: props.data};
        props.loadDataOption();
    }

    render() {
        return(
            <div className="App">
                <div className="App-header">Net Worth Calculator</div>
                <Status />
                <Exchange />
                <Calcs />
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        loadDataOption: () => {
            dispatch(changeStatus(LOADING));
            dispatch(loadData());
        }
    };
};

export default connect(undefined, mapDispatchToProps)(NetWorth);