"""MarketHawk URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name="market_index"),
    path('api', views.market_api, name="market_data"),
    path('api/indicators', views.market_indicators, name="market_indicators"),
    path('api/fundamentals', views.market_fundamentals, name="market_fundamentals"),
    path('api/news', views.market_news, name="market_news"),
    path('api/get_news_sentiment', views.get_news_sentiment, name="get_news_sentiment"),
    path('api/get_quote', views.get_quote, name="get_quote"),
    # path('api/quote', views.market_quote, name="market_quote"),
]
