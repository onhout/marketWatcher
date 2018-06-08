import React from 'react';
import {Badge} from 'reactstrap';
import numeral from 'numeral';
import Login from './Login';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.navItemHandleClick = this.navItemHandleClick.bind(this);
        this.state = {market: "", timeframe: ""}
    }

    getNavItems() {
        if (!this.props.sidebarItems) {
            return;
        }
        if (this.props.sidebarItems.detail) {
            return (
                <Login onLogOn={() => this.navItemHandleClick("AAPL", "5min")}/>
            )
        }
        return this.props.sidebarItems.map((list) => {
            let color = list.priceDiff > 0 ? "success" : "danger";
            return (
                <li key={list.name} className="nav-item">
                    <a className="nav-link" onClick={() => this.navItemHandleClick(list.symbol, "5min")}>
                        {list.symbol} <span className="pull-right"><Badge
                        color={color}>{numeral(list.priceDiff).format('$0.00')}</Badge></span>
                    </a>
                </li>
            )
        });
    }

    navItemHandleClick(market, timeframe) {
        this.setState({market, timeframe});
        this.props.onStockSymbolChange(market, timeframe);
    }

    render() {
        return (
            <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
                <ul className="nav nav-pills flex-column">
                    {this.getNavItems()}
                </ul>
            </nav>
        )
    }
}

export default Sidebar