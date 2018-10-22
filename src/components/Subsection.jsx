import React, {Component} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from 'react-bootstrap-table2-editor';
import {connect} from "react-redux";
import {updateData} from "./actions";
import _ from "lodash";
import {Glyphicon, Button} from "react-bootstrap";

class Subsection extends Component {
    constructor(props) {
        super(props);
        this.state = _.cloneDeep(props.account);
        this.columns = [{
            dataField: 'name',
            text: props.account.accountType
          }, {
            dataField: 'value',
            text: 'Amount'
          }
        ];
    }

    addHeaderAndFooter = (data) => {
        const {header} = this.props;
        data.unshift({id: 0, name: header});
        data.push({id: 100, name: `Total ${header}`});
        return data;
    };

    onEdit = () => {
        this.props.patchState(this.state);
    }

    handleAddRow = () => {
        console.log("cur state", this.state);
        const templateRow = {name: "New Account", value: 0};
        const temp = {
            accounts: {
                ...this.state.accounts.push(templateRow)
            },
            ...this.state
        }
        this.setState(temp);
    }
      
    render() {
        const {accounts: data} = this.state;
        console.log("subsection render", this.props);
        // const {accounts: data} = this.props.account;

        return(
            <div>
                <BootstrapTable
                    keyField="_id"
                    data={data}
                    columns={ this.columns }
                    bordered={ false }
                    cellEdit={ cellEditFactory({
                        mode: 'click',
                        blurToSave: true,
                        nonEditableRows: () => [0],
                        afterSaveCell: this.onEdit
                    }) }
                />
                <Button bsSize="small" onClick={this.handleAddRow}>
                    <Glyphicon glyph="plus"/>
                </Button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        patchState: (accounts) => {
            dispatch({
                type: "UPDATE_SUBSECTION",
                value: accounts
            });
            dispatch(updateData());
        }
    };
};

const mapStateToProps = (state, ownProps) => {
    const header = ownProps.account.accountType;
    return {
        ...ownProps,
        data: state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subsection);