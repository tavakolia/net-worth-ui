import React, {Component} from "react";
import Subsection from "./Subsection";
import {connect} from "react-redux";

class Section extends Component {
    render() {
        const {data, header, subTotal} = this.props;
        console.log("re-render", data);

        return(
            <div className="Section">
                <div>{header}</div>
            {data.map(account => 
                <Subsection key={account._id} account={account} />
            )}
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
        subTotal: state.netWorthReducer[subTotalKey]
    }
}

export default connect(mapStateToProps)(Section);
