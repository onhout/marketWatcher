import React from "react";
import PropTypes from 'prop-types';
import {Card, CardSubtitle, CardText, CardTitle, Col, Input, Row} from 'reactstrap';
import numeral from 'numeral';
import InputRange from 'react-input-range';

class Account_Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            order_amount: 0,
            order_needed: 0,
        };
        // this.props.onInputRangeChange(this.state.value);
    }

    // static getDerivedStateFromProps(props, state) {
    //     console.log(props);
    //     console.log(state);
    //     if (props.account_data !== undefined) {
    //         this.setState({value: (props.account_data.last_trade_price * 0.9).toFixed(2)})
    //     }
    // }


    handleInputChange(value) {
        let order_amount = Math.round(50 / (this.props.account_data.last_trade_price - value));
        let order_needed = (order_amount * this.props.account_data.last_trade_price).toFixed(2);
        this.setState({
            value,
            order_amount,
            order_needed
        })
    }


    render() {
        if (this.props.account_data == null) {
            return (
                <div> Loading account ... </div>
            )
        } else if (this.props.account_data.cash == null) {
            return (
                <div>Please login to see account</div>
            )
        } else {
            let maxInputValue = (((this.props.account_data.cash * this.props.account_data.last_trade_price) -
                (50 * this.props.account_data.last_trade_price)) / this.props.account_data.cash) - 0.01;
            return (
                <Row>
                    <Card body>
                        <CardTitle>Account Info</CardTitle>
                        <CardSubtitle>
                        </CardSubtitle>
                        <hr/>
                        <Row>
                            <Col md="4">
                                <CardText>
                                    Cash
                                    <br/> {numeral(this.props.account_data.cash).format('$0.00')}
                                </CardText>
                            </Col>
                            <Col md="4">
                                <CardText>
                                    Market Value
                                    <br/> {numeral(this.props.account_data.market_value).format('$0.00')}
                                </CardText>
                            </Col>
                            <Col md="4">
                                <CardText>
                                    Total Value
                                    <br/>{numeral(this.props.account_data.total).format('$0.00')}
                                </CardText>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col sm={12}>
                                <InputRange
                                    maxValue={+maxInputValue.toFixed(2)}
                                    minValue={+(this.props.account_data.last_trade_price * 0.8).toFixed(2)}
                                    value={numeral(this.state.value).format('0.00')}
                                    step={0.01}
                                    onChange={value =>
                                        this.handleInputChange(value)}/>
                                <Input className="text-center" type="number"
                                       step="0.01"
                                       value={numeral(this.state.value).format('0.00')}
                                       name="number" id="manualInput" placeholder="Manual Input for Limit"
                                       onChange={event => this.handleInputChange(event.target.value)}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                Order Amount
                                <br/> {this.state.order_amount}
                            </Col>
                            <Col sm={6}>
                                Cash Needed
                                <br/> {numeral(this.state.order_needed).format('$0.00')}
                            </Col>
                        </Row>
                    </Card>
                </Row>
            )
        }

    }
}

Account_Info.proptypes = {
    account_data: PropTypes.object.isRequired,
};
// Account_Info.defaultProps = {
//     account_data: {},
//     quote: {}
// };

export default Account_Info
