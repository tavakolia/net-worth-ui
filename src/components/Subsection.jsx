import React, {Component} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from 'react-bootstrap-table2-editor';

class Subsection extends Component {
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

    onEdit = (oldValue, newValue, row, column) => { console.log("newVal", newValue);}
      
    render() {
        const {account: {accountType: header, accounts: data}} = this.props;
        // const data = this.addHeaderAndFooter(this.products);

        // console.log("subsection data", data);

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

export default Subsection;