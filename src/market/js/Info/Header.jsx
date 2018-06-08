import React from "react";
import {Row} from 'reactstrap';

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Row>
                    <h1>{this.props.marketname} - {this.props.timeframe}</h1>
                </Row>
            </div>
        )
    }
}

export default Header;
