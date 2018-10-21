import React, {Component} from "react";

class Row extends Component {
    render() {
        const {name, value} = this.props;
        return(
            <span>
                <div>
                    {name}
                </div>
                <div>
                    {value}
                </div>
            </span>);
    }
}

export default Row;