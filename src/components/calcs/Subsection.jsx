import React, {Component} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from 'react-bootstrap-table2-editor';
import {connect} from "react-redux";
import {saveData} from "./actions";
import {Glyphicon, Button} from "react-bootstrap";

class Subsection extends Component {
    constructor(props) {
        super(props);
        this.state = {header: props.account.accountType};
    };

    getColumns = () => {
        const {editable, account: {accountType: header}} = this.props;

        return ([
            {
                dataField: 'name',
                text: header,
                editable,
                classes: () => 'Names',
                headerFormatter: this.nameFormatter
            }, {
                dataField: 'value',
                text: 'Amount',
                editable,
                classes: () => 'Values'
            }
        ]);
    }

    nameFormatter = () => {
        const {header} = this.state;
        const {editable} = this.props;

        return (
          <input 
            value={header}
            className={'Subsection-header'}
            onBlur={this.handleRename}
            onChange={this.handleChangeName}
            disabled={!editable}/>
        );
    }

    handleChangeName = (event) => {
        this.setState({header: event.target.value});
    }

    handleRename = () => {
        const newSubsection = this.props.account;
        newSubsection.accountType = this.state.header;
        this.props.renameHeader(newSubsection);
    }

    onEdit = (_oldValue, _newValue, row) => {
        row.homeValue = row.value;
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
                    <Glyphicon glyph="plus-sign"/>
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
            dispatch(saveData());
        },
        renameHeader: (subsection) => {
            dispatch({
                type: "UPDATE_HEADER",
                value: subsection
            });
            dispatch(saveData());
        },
        addAccount: (id) => {
            dispatch({
                type: "ADD_ACCOUNT",
                value: id
            });
            dispatch(saveData());
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