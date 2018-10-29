import React, {Component} from "react";
import Subsection from "./Subsection";
import {connect} from "react-redux";
import {Glyphicon, Button} from "react-bootstrap";
import _ from "lodash";
import {updateData} from "./actions";


class Section extends Component {
    handleAddSection = () => {
        const {addSection} = this.props;
        addSection();
    }

    render() {
        const {data, header, subTotal} = this.props;

        return(
            <div className="Section">
                <div className='Section-header'>
                {header}
                    <Button className="Add-section" bsSize="xsmall" onClick={this.handleAddSection}>
                        <Glyphicon glyph="plus"/>
                    </Button>
                </div>
            {data.toJS().map(account => {
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        addSection: () => {
            dispatch({
                type: "ADD_SECTION",
                value: _.lowerCase(ownProps.header)
            });
            dispatch(updateData());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Section);
