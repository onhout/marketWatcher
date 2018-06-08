import React from "react";
import SearchBar from './Chart/SearchBar';
import ChartComponent from './Chart/ChartComponent';
import Header from './Info/Header';
import Fundamentals from './Info/Fundamentals';
import News from './Info/News';
import Account_Info from './Info/Account_Info';
import Sidebar from '../../global/Components/Sidebar';
import Live_Quote from './Info/Live_Quote';
import {Container, Row} from 'reactstrap';
import {
    getAccountInfo,
    getMarketNews,
    getQuoteData,
    getSidebarItem,
    getStockData,
    getStockFundamentals
} from "../../global/utils";

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.stockLookup = this.stockLookup.bind(this);
        this.checkAccountAndQuote = this.checkAccountAndQuote.bind(this);
        this.state = {
            market: "AAPL",
            timeframe: "5min"
        };

        getSidebarItem().then(sidebar_items => {
            this.setState({sidebar_items})
        });

    }

    componentDidMount() {
        this.stockLookup("AAPL", "5min");

        setInterval(() => {
            getQuoteData(this.state.market).then(quote => {
                this.setState({
                    quote
                })
            })
        }, 15000)
    }

    stockLookup(market, timeframe) {
        // if (this.state.market) {
        //     //reset states
        //     this.setState({
        //         market_data: null,
        //         fundamentals: null,
        //         market_news: null
        //     })
        // }
        this.setState({market, timeframe});
        getStockData(market, timeframe).then(market_data => {
            this.setState({market_data})
        });
        getStockFundamentals(market, timeframe).then(fundamentals => {
            this.setState({fundamentals})
        });
        getAccountInfo().then(account_data => {
            this.setState({account_data})
        });
        getMarketNews(market).then(market_news => {
            this.setState({market_news})
        });

        getQuoteData(market).then(quote => {
            this.setState({quote})
        });
    }

    // orderCalculation(quote_price, current_price) {
    //     if (this.state.quote !== undefined && this.state.account_data !== undefined) {
    //         let order = Math.round(50 / (current_price- quote_price) * quote_price);
    //         this.setState({
    //             order_information: order
    //         })
    //     }
    // }

    checkAccountAndQuote() {
        if (this.state.quote !== undefined && this.state.account_data !== undefined) {
            return {...this.state.quote, ...this.state.account_data}
        }
    };

//
    render() {
        return (
            <Container fluid>
                <Sidebar sidebarItems={this.state.sidebar_items}
                         onStockSymbolChange={(market, timeframe) => this.stockLookup(market, timeframe)}/>
                <div className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
                    <Row>
                        <div className="col-sm-12 col-md-8">
                            <Header marketname={this.state.market} timeframe={this.state.timeframe}/>
                            <ChartComponent market_data={this.state.market_data}/>
                            <News market_news={this.state.market_news}/>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <Live_Quote quote={this.state.quote}/>
                            <hr/>
                            <Account_Info account_data={this.checkAccountAndQuote()}/>
                            <hr/>
                            <SearchBar
                                onStockSymbolChange={(market, timeframe) => this.stockLookup(market, timeframe)}/>
                            <hr/>
                            <Fundamentals fundamentals={this.state.fundamentals}/>
                            <hr/>
                        </div>
                    </Row>

                </div>

            </Container>
        )
    }
}

export default Root