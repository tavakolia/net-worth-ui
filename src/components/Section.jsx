import React, {Component} from "react";
import Subsection from "./Subsection";
import _ from "lodash";

class Section extends Component {
    getTotal() {
        const {data} = this.props;
        let total = 0;
        const flat = _.flatMap(data, acc => acc.accounts);
        _.forEach(flat, acc => {
            if(_.isNumber(acc.value)) {
                total += acc.value;
            }
        })
        return total;
    }
    render() {
        const {data, header} = this.props;
        const total = this.getTotal();
        return(
            <div>
                <div>{header}</div>
            {data.map(account => 
                <Subsection key={account._id} account={account} />
            )}
                <div className='Section-footer'>
                    Total {header}: {total}
                </div>
            </div>
        );
    }
}

export default Section;
