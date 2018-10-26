import React, {Component} from "react";
import {DropdownButton, MenuItem} from "react-bootstrap";
import {connect} from "react-redux";
import _ from "lodash";

class Exchange extends Component {
    changeCurrency = (event) => {
        const {updateValues, rates} = this.props;
        updateValues({rate: rates[event], currency: event});
    }

    render() {
        const {currency, homeCurrency, rates} = this.props;

        return(
            <div>
                <div>Home: {homeCurrency}</div>
                <DropdownButton
                    title="Currency"
                    onSelect={this.changeCurrency}
                    key={1}
                    id={`dropdown-basic-${1}`}
                >
                {_.keys(rates).map((key, index)=> {
                    return (<MenuItem
                                active={key === currency ? true : false}
                                key={key}
                                eventKey={key}>
                                {key}
                            </MenuItem>);
                })}
                </DropdownButton>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        rates: state.exchangeReducer.get('rates').toJS(),
        homeCurrency: state.exchangeReducer.get('base'),
        currency: state.netWorthReducer.get('currency'),
        ...ownProps
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateValues: (exchange) => {
            dispatch({
                type: "EXCHANGE_CURRENCY",
                value: exchange
            });
        },
        ...ownProps
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);
