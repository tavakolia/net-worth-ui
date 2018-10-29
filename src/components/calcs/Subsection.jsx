import React, {Component} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from 'react-bootstrap-table2-editor';
import {connect} from "react-redux";
import {updateData} from "./actions";
import {Glyphicon, Button} from "react-bootstrap";
import _ from "lodash";

class Subsection extends Component {
    getColumns = () => {
        const {editable, account: {accountType: header}} = this.props;

        return ([
            {
                dataField: 'name',
                text: header,
                editable,
                classes: () => 'Names'
            }, {
                dataField: 'value',
                text: 'Amount',
                editable,
                classes: () => 'Values'
            }
        ]);
    }

    onEdit = (_oldValue, _newValue, row) => {
        row.homeValue = row.value;
        if(_.isString(row._id) && row._id.startsWith("temp")) {
            row = _.omit(row, '_id');
        }
        this.props.patchState(row);
    }

    handleAddRow = () => {
        const {addAccount, account} = this.props;
        addAccount(account._id);
    }
      
    render() {
        const {accounts: data} = this.props.account;

        return(
            <div>
                <BootstrapTable
                    keyField="_id"
                    data={data}
                    columns={ this.getColumns() }
                    bordered={ false }
                    cellEdit={ cellEditFactory({
                        mode: 'click',
                        blurToSave: true,
                        nonEditableRows: () => [0],
                        afterSaveCell: this.onEdit
                    }) }
                />
                <Button bsSize="xsmall" onClick={this.handleAddRow}>
                    <Glyphicon glyph="plus"/>
                </Button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        patchState: (row) => {
            dispatch({
                type: "UPDATE_SUBSECTION",
                value: row
            });
            dispatch(updateData());
        },
        addAccount: (id) => {
            dispatch({
                type: "ADD_ACCOUNT",
                value: id
            })
        }
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        editable: state.exchangeReducer.get('base') === state.netWorthReducer.get('currency'),
        ...ownProps
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Subsection);