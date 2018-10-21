import React, {Component} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from 'react-bootstrap-table2-editor';
import {connect} from "react-redux";
import {updateData} from "./actions";

class Subsection extends Component {
    constructor(props) {
        super(props);
        this.state = props.account;
    }

    columns = [{
        dataField: 'name',
        text: 'Account'
      }, {
        dataField: 'value',
        text: 'Amount'
      }
    ];

    addHeaderAndFooter = (data) => {
        const {header} = this.props;
        data.unshift({id: 0, name: header});
        data.push({id: 100, name: `Total ${header}`});
        return data;
    };

    onEdit = (oldValue, newValue, row, column) => {
        this.props.patchState(this.state);
        // if(newValue !== oldValue) {
        //     console.log("state", this.state);
        //     const stateRow = _.find(this.state.accounts, account => account._id === row._id);
        //     debugger;
        //     this.setState();
        // }
        // console.log("newState", this.state);
    }
      
    render() {
        const {accountType: header, accounts: data} = this.state;
        // const data = this.addHeaderAndFooter(this.products);

        return(
            <BootstrapTable
                keyField="_id"
                data={data}
                columns={ this.columns }
                cellEdit={ cellEditFactory({
                    mode: 'click',
                    blurToSave: true,
                    nonEditableRows: () => [0],
                    afterSaveCell: this.onEdit
                }) }
            />
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        patchState: (accounts) => {
            // dispatch({
            //     type: "UPDATE_SUBSECTION",
            //     value: accounts
            // });
            dispatch(updateData());
        }
    };
};

export default connect(undefined, mapDispatchToProps)(Subsection);