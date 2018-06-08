from datetime import datetime, timedelta

from Robinhood import Robinhood
from alpha_vantage.timeseries import TimeSeries
from django.shortcuts import render
from newsapi import NewsApiClient
from rest_framework.decorators import api_view
from rest_framework.response import Response
from watson_developer_cloud import NaturalLanguageUnderstandingV1
from watson_developer_cloud.natural_language_understanding_v1 import Features, SentimentOptions, EmotionOptions, \
    ConceptsOptions, CategoriesOptions

MARKET_API = "VRU8ZUMHTKPXMW15"
NEWS_API = "0ef6217cbf1a4e57a0b018eaf2237b5f"
rbtrader = Robinhood()

api = NewsApiClient(api_key=NEWS_API)
natural_language_understanding = NaturalLanguageUnderstandingV1(
    version='2017-02-27',
    username='1cad47cd-fbb5-4d2e-9f2c-0b2d28be95b5',
    password='3YK6sUy2A3kN')


# buy_order = my_trader.place_buy_order(stock_instrument, 1)
# sell_order = my_trader.place_sell_order(stock_instrument, 1)

# Create your views here.
def index(request):
    return render(request, "market.html", {
    })


@api_view(['GET'])
def market_api(request):
    ts = TimeSeries(key=MARKET_API)
    data, meta_data = ts.get_intraday(symbol=request.GET.get('name'), interval=request.GET.get('timeframe'),
                                      outputsize='full')
    # r = requests.get(MARKET_ENDPOINT(request.GET.get('name'), request.GET.get('timeframe')))
    return Response(data)


@api_view(['GET'])
def market_fundamentals(request):
    marketname = request.GET.get('name')
    fundamentals = rbtrader.get_fundamentals(marketname)
    return Response(fundamentals)


@api_view(['GET'])
def market_news(request):
    marketname = request.GET.get('name')
    stock = rbtrader.instruments(marketname)[0]
    market = rbtrader.get_url(stock["market"])["acronym"]
    now = datetime.now()
    market_news = api.get_everything(
        q=market + " " + marketname,
        language='en',
        sort_by="relevancy",
        from_param=(now - timedelta(days=14)).strftime("%Y-%m-%d"),
        to=now.strftime("%Y-%m-%d"),
    )
    return Response(market_news["articles"])


@api_view(['GET'])
def get_news_sentiment(request):
    try:
        response = natural_language_understanding.analyze(
            url=request.GET.get('url'),
            features=Features(sentiment=SentimentOptions(), emotion=EmotionOptions(),
                              concepts=ConceptsOptions(limit=5),
                              categories=CategoriesOptions())
        )

        return Response(response)
    except:
        return Response({"error": 'problem retrieving'})


@api_view(['GET'])
def get_quote(request):
    stock = request.GET.get('name')
    quote = rbtrader.quote_data(stock)
    return Response(quote)
