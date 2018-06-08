import React from "react";
import {Badge, Button, ListGroupItem, Progress,} from 'reactstrap';
import moment from 'moment';
import numeral from 'numeral';

class News_Item extends React.Component {
    constructor(props) {
        super(props);
        this.setSentiment = this.setSentiment.bind(this);
        this.state = {
            newsSentimentRetrieved: false,
            errorRetrieving: ''
        }
    }

    setSentiment(url) {
        fetch("/market/api/get_news_sentiment?url=" + url)
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    let sentiment = data.sentiment.document.label;
                    let sentimentColor = '';
                    switch (sentiment) {
                        case "positive":
                            sentimentColor = "success";
                            break;
                        case "negative":
                            sentimentColor = "danger";
                            break;
                        case "neutral":
                            sentimentColor = "secondary";
                            break;
                    }
                    let concepts = data.concepts.map((concept) => {
                        return (
                            <Badge color="warning">
                                <a href={concept.dbpedia_resource} target="_blank">{concept.text}</a>
                            </Badge>
                        )
                    });
                    let totalEmotion = data.emotion.document.emotion.sadness +
                        data.emotion.document.emotion.joy +
                        data.emotion.document.emotion.fear +
                        data.emotion.document.emotion.disgust +
                        data.emotion.document.emotion.anger;
                    let sentimentScore = numeral(data.sentiment.document.score).format('0.00');
                    let sadness = numeral((data.emotion.document.emotion.sadness / totalEmotion) * 100).format('0.00');
                    let joy = numeral((data.emotion.document.emotion.joy / totalEmotion) * 100).format('0.00');
                    let fear = numeral((data.emotion.document.emotion.fear / totalEmotion) * 100).format('0.00');
                    let disgust = numeral((data.emotion.document.emotion.disgust / totalEmotion) * 100).format('0.00');
                    let anger = numeral((data.emotion.document.emotion.anger / totalEmotion) * 100).format('0.00');

                    this.setState({
                        newsSentimentRetrieved: true,
                        sentiment,
                        sentimentColor,
                        concepts,
                        categories: data.categories,
                        sentimentScore,
                        sadness,
                        joy,
                        fear,
                        disgust,
                        anger
                    });
                } else {
                    this.setState({
                        newsSentimentRetrieved: true,
                        errorRetrieving: data.error
                    })
                }

            });
    }

    render() {
        if (!this.state.newsSentimentRetrieved) {
            return (
                <ListGroupItem className="nav-item">

                    <a href={this.props.market_news.url} target="_blank">{this.props.market_news.title}</a>
                    <small>- {moment(this.props.market_news.publishedAt).fromNow()}</small>
                    <br/>
                    <small>{this.props.market_news.description}</small>
                    <br/>
                    <Button onClick={() => {
                        this.setSentiment(this.props.market_news.url)
                    }}>Get Sentiment</Button>
                </ListGroupItem>
            )
        } else if (this.state.errorRetrieving) {
            return (
                <ListGroupItem className="nav-item">
                    <a href={this.props.market_news.url} target="_blank">{this.props.market_news.title}</a>
                    <small>- {moment(this.props.market_news.publishedAt).fromNow()}</small>
                    <br/>
                    <small>{this.props.market_news.description}</small>
                    <br/>
                    <small><em>{this.state.errorRetrieving}</em></small>
                </ListGroupItem>
            )
        } else {
            return (
                <ListGroupItem className="nav-item" color={this.state.sentimentColor}>
                    <a href={this.props.market_news.url} target="_blank">{this.props.market_news.title}</a>
                    <small>- {moment(this.props.market_news.publishedAt).fromNow()}</small>
                    <span> - Sentiment: </span>
                    <Badge color="secondary">{this.state.sentimentScore}</Badge>
                    <br/>
                    <small className="text-info"><em>{this.state.categories[0].label}</em></small>
                    <br/>
                    <small>{this.props.market_news.description}</small>
                    <Progress multi>
                        <Progress bar color="info" value={this.state.sadness}>Sadness {this.state.sadness}</Progress>
                        <Progress bar color="success" value={this.state.joy}>Joy {this.state.joy}</Progress>
                        <Progress bar color="secondary" value={this.state.fear}>Fear {this.state.fear}</Progress>
                        <Progress bar color="warning" value={this.state.disgust}>Disgust {this.state.disgust}</Progress>
                        <Progress bar color="danger" value={this.state.anger}>Anger {this.state.anger}</Progress>
                    </Progress>
                    <div>
                        {this.state.concepts}
                    </div>
                </ListGroupItem>
            )
        }
    }
}

export default News_Item
