import React, {Component} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from 'react-bootstrap-table2-editor';
import {connect} from "react-redux";
import {updateData} from "./actions";
import _ from "lodash";

class Subsection extends Component {
    constructor(props) {
        super(props);
        this.state = _.cloneDeep(props.account);
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

    onEdit = () => {
        this.props.patchState(this.state);
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
            console.log("accounts", accounts);
            dispatch({
                type: "UPDATE_SUBSECTION",
                value: accounts
            });
            dispatch(updateData());
        }
    };
};

export default connect(undefined, mapDispatchToProps)(Subsection);