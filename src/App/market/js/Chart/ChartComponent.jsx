import React from "react";
import Chart from './Chart';

class ChartComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.market_data == null) {
            return <div>Loading...</div>
        }
        return (
            <Chart data={this.props.market_data}/>
        )
    }
}

export default ChartComponent