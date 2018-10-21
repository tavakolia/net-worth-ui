import React, {Component} from "react";

class Exchange extends Component {
    changeCurrency() {
        console.log("change currency");

    }
    render() {
        const {currency} = this.props;
        return(
            <div onClick={this.changeCurrency}>
                Currency: {currency}
            </div>
        );
    }
}

export default Exchange;
