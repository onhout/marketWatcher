import React from "react";
import {Badge, Card, CardSubtitle, ListGroup, ListGroupItem, Row} from 'reactstrap';
import numeral from 'numeral';

class Fundamentals extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.fundamentals == null) {
            return (
                <div> Loading fundamentals ... </div>
            )
        } else {
            return (
                <Row>
                    <Card body>
                        {/*<CardTitle>{this.props.fundamentals.marketName} Fundamentals</CardTitle>*/}
                        <ListGroup>
                            <ListGroupItem>High 52 Weeks <span
                                className="float-right"><Badge
                                color="dark">{this.props.fundamentals.high_52_weeks}</Badge></span></ListGroupItem>
                            <ListGroupItem>Low 52 Weeks <span
                                className="float-right"><Badge
                                color="dark">{this.props.fundamentals.low_52_weeks}</Badge></span></ListGroupItem>
                            <ListGroupItem>Average Volume <span className="float-right"> <Badge
                                color="dark">{numeral(this.props.fundamentals.average_volume).format('0.000a')}</Badge>
                                    </span>
                            </ListGroupItem>
                            <ListGroupItem>Market Cap <span
                                className="float-right"><Badge
                                color="dark">{numeral(this.props.fundamentals.market_cap).format('($0.000a)')}</Badge></span></ListGroupItem>
                            <ListGroupItem>Shares Outstanding <span
                                className="float-right"><Badge
                                color="dark">{numeral(this.props.fundamentals.shares_outstanding).format('0.000a')}</Badge></span></ListGroupItem>
                            <ListGroupItem>Dividends <span
                                className="float-right"><Badge
                                color="dark">{numeral(this.props.fundamentals.dividend_yield).format('0.00')}</Badge></span></ListGroupItem>
                            <ListGroupItem>P/E Ratio <span
                                className="float-right"><Badge
                                color="dark">{numeral(this.props.fundamentals.pe_ratio).format('0.00')}</Badge></span></ListGroupItem>
                        </ListGroup>
                        {/*<CardText>{this.props.fundamentals.data.description}</CardText>*/}
                        <ListGroup>
                            <ListGroupItem>Sector <span
                                className="float-right"><Badge
                                color="dark">{this.props.fundamentals.sector}</Badge></span></ListGroupItem>
                            <ListGroupItem>Number of employees <span
                                className="float-right"><Badge
                                color="dark">{this.props.fundamentals.num_employees}</Badge></span></ListGroupItem>
                            <ListGroupItem>Founded <span
                                className="float-right"><Badge
                                color="dark">{this.props.fundamentals.year_founded}</Badge></span></ListGroupItem>
                            <ListGroupItem>CEO <span
                                className="float-right"><Badge
                                color="dark">{this.props.fundamentals.ceo}</Badge></span></ListGroupItem>
                            <ListGroupItem>Headquarter City, State <span
                                className="float-right"><Badge
                                color="dark">{this.props.fundamentals.headquarters_city}, {this.props.fundamentals.headquarters_state}</Badge></span></ListGroupItem>
                        </ListGroup>
                        {/*<CardText>{this.props.fundamentals.data.description}</CardText>*/}
                        <hr/>
                        <CardSubtitle>
                            <small>{this.props.fundamentals.description}</small>
                        </CardSubtitle>
                    </Card>
                </Row>
            )
        }

    }
}

export default Fundamentals
