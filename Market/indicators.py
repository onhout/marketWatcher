import json

import numpy
import talib


def get_close_array(stock_data_path):
    array = numpy.array([])
    with open(stock_data_path) as f:
        data = json.load(f)
    for dat in data:
        array = numpy.append(array, float(data[dat]["4. close"]))
    return array[::-1]


def get_indicators(stock_data_path):
    close = get_close_array(stock_data_path)
    return {
        "ema_10": ema(close, 10),
        "ema_50": ema(close, 50),
        "sma_10": sma(close, 10),
        "sma_50": sma(close, 50),
    }


def ema(data, length):
    ind = talib.EMA(data, timeperiod=length)
    return [ind[len(ind) - 2], ind[len(ind) - 1]]


def sma(data, length):
    ind = talib.SMA(data, timeperiod=length)
    return [ind[len(ind) - 2], ind[len(ind) - 1]]
