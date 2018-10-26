import React, {Component} from "react";
import {connect} from "react-redux";
import Section from "./Section";

class View extends Component {
    render() {
        const { data, netWorth } = this.props;

        return(
            <div>
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
        data: state.netWorthReducer.get('data'),
        netWorth: state.netWorthReducer.get('netWorth')
    };
};

const Calcs = connect(mapStateToProps, null)(View)

export default Calcs;