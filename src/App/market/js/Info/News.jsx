import React from "react";
import News_Item from "./News_Item";
import {Card, ListGroup, Row,} from 'reactstrap';

class News extends React.Component {
    constructor(props) {
        super(props);
    }

    getNewsItems() {
        if (!this.props.market_news) {
            return (
                <div> Loading and analyzing news ... </div>
            )
        }
        return this.props.market_news.map((list) => {
            return (
                <News_Item key={list.url} market_news={list}/>
            )
        });
    }

    render() {
        return (
            <Row>
                <Card body>
                    <ListGroup>
                        {this.getNewsItems()}
                    </ListGroup>
                </Card>
            </Row>
        )
    }
}

export default News
