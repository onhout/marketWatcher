import React from "react";
import {Card, CardText, CardTitle, Col, Row} from 'reactstrap';
import 'react-input-range/lib/css/index.css';

class Order_Panel extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        if (this.props.quote === undefined) {
            return (
                <div> Loading account stuff... </div>
            )
        } else {
            // this.setState({
            //     shares: this.props.account_data.cash / this.props.quote.last_trade_price
            // });
            // console.log(this.state);
            return (
                <Row>
                    <Card body>
                        <CardTitle>Order Panel</CardTitle>
                        <Row>
                            <Col sm={4} className="text-center">
                                <CardText>Bid</CardText>
                                {this.props.quote.bid_price}
                            </Col>
                            <Col sm={4} className="text-center">
                                <CardText>Last</CardText>
                                {this.props.quote.last_trade_price}
                            </Col>
                            <Col sm={4} className="text-center">
                                <CardText>Ask</CardText>
                                {this.props.quote.ask_price}
                            </Col>
                        </Row>
                    </Card>
                </Row>
            )

        }
    }
}

export default Order_Panel
