import React, {Component} from "react";
import Subsection from "./Subsection";
import {connect} from "react-redux";
import _ from "lodash";

class Section extends Component {
    render() {
        const {data, header, subTotal} = this.props;

        return(
            <div className="Section">
                <div className='Section-header'>{header}</div>
            {data.toJS().map(account => {
                const lastAccount = _.last(account.accounts);
                if(!lastAccount._id) {
                    lastAccount._id = _.uniqueId('temp');
                }
                return(<Subsection key={account._id} account={account} />);
            })}
                <div className='Section-footer'>
                    Total {header}: {subTotal}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const subTotalKey = `total${ownProps.header}`;
    return {
        ...ownProps,
        subTotal: state.netWorthReducer.get(subTotalKey)
    }
}

export default connect(mapStateToProps)(Section);
