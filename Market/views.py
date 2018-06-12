import json
import os
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

from .indicators import get_indicators

MARKET_API = "VRU8ZUMHTKPXMW15"
NEWS_API = "0ef6217cbf1a4e57a0b018eaf2237b5f"
rbtrader = Robinhood()

api = NewsApiClient(api_key=NEWS_API)
natural_language_understanding = NaturalLanguageUnderstandingV1(
    version='2017-02-27',
    username='1cad47cd-fbb5-4d2e-9f2c-0b2d28be95b5',
    password='3YK6sUy2A3kN')
stock_data_folder_path = 'stock_data'
if not os.path.exists(stock_data_folder_path):
    os.makedirs(stock_data_folder_path)


# buy_order = my_trader.place_buy_order(stock_instrument, 1)
# sell_order = my_trader.place_sell_order(stock_instrument, 1)

# Create your views here.

def index(request):
    return render(request, "market.html", {
    })


@api_view(['GET'])
def market_api(request):
    stock_data_path = stock_data_folder_path + '/' + request.GET.get('name') + ' - ' + request.GET.get(
        'timeframe') + '.json'
    if not os.path.exists(stock_data_path):
        try:
            ts = TimeSeries(key=MARKET_API)
            data, meta_data = ts.get_intraday(symbol=request.GET.get('name'), interval=request.GET.get('timeframe'),
                                              outputsize='full')
            with open(stock_data_path, 'w') as outfile:
                json.dump(data, outfile)
            # stock_data = []
            # for key in data:
            #     try:
            #         data_obj = StockData.objects.create(stock=obj, time=key,
            #                                             open=data[key]["1. open"],
            #                                             high=data[key]["2. high"],
            #                                             low=data[key]["3. low"],
            #                                             close=data[key]["4. close"],
            #                                             volume=data[key]["5. volume"])
            #         stock_data.append(data_obj)
            #     except IntegrityError:
            #         continue

            # data_obj = StockData.objects.filter(stock=obj)
            # # stock_data.append(data_obj)
            # # print(data[key]["5. volume"])
            #
            # output_data = serializers.serialize("json", data_obj)
            # # print(output_data)
            # return Response(output_data)
            return Response(data)
        except ValueError:
            return Response({
                "error": "invalid symbol"
            })
    else:
        with open(stock_data_path) as f:
            data = json.load(f)
        return Response(data)


@api_view(['GET'])
def market_indicators(request):
    stock_data_path = stock_data_folder_path + '/' + request.GET.get('name') + ' - ' + request.GET.get(
        'timeframe') + '.json'
    indicators = get_indicators(stock_data_path)
    return Response(indicators)


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
