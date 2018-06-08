from Robinhood import Robinhood
from requests import HTTPError
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import api_view
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

rbtrader = Robinhood()


# Create your views here.
@api_view(["POST"])
@authentication_classes((SessionAuthentication, BasicAuthentication))
@permission_classes((IsAuthenticated,))
def robinhood_login(request):
    if request.method == "POST":
        print(request.user)
        # User.objects.get(username=request.data['email'], password=request.data["password"])
        # try:
        rbtrader.login(username=request.data["email"], password=request.data["password"])
        # except RHexceptions.LoginFailed:
        #     return redirect('market_index') 
        # content = {
        #     'user': request.user,  # `django.contrib.auth.User` instance.
        #     'auth': request.auth,  # None
        # }
        return Response({"Logged": "logged"})
    return Response({
        "loggedout": "loggedout"
    })


@api_view(['GET'])
@authentication_classes((SessionAuthentication, BasicAuthentication))
@permission_classes((IsAuthenticated,))
def get_account(request):
    try:
        portfolio = rbtrader.portfolios()
        return Response({
            "total": portfolio["equity"],
            "market_value": portfolio["market_value"],
            "cash": float(portfolio["equity"]) - float(portfolio["market_value"]),
        })
    except HTTPError:
        return Response({
            "error": "login failed",
        })


@api_view(['GET'])
@authentication_classes((SessionAuthentication, BasicAuthentication))
@permission_classes((IsAuthenticated,))
def get_portfolio(request):
    stocks = []
    if 'results' in rbtrader.securities_owned():
        for securities in rbtrader.securities_owned()["results"]:
            security = rbtrader.get_url(securities["instrument"])
            quote = rbtrader.get_url(security["quote"])
            PurchasePrice = float(securities["quantity"]) * float(securities["average_buy_price"])
            currentPrice = float(securities["quantity"]) * float(quote["last_trade_price"])
            priceDiff = round(currentPrice - PurchasePrice, 2)
            stocks.append({
                "symbol": security["symbol"],
                "name": security["name"],
                "quantity": securities["quantity"],
                "average_price": securities["average_buy_price"],
                "last_price": quote["last_trade_price"],
                "priceDiff": priceDiff
            })
            # # print(security)
            # print(quote)
        return Response(stocks)
    else:
        return Response({
            "error": "login failed",
        })
