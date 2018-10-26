import React, {Component} from "react";
import {connect} from "react-redux";

class View extends Component {
    render() {
        const { status } = this.props;

        return(
            <div className="Status">
                {status === "FRESH" ? "" : status}
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        status: state.statusReducer.status
    };
};

const Status = connect(mapStateToProps, null)(View)

export default Status;