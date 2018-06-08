import {csvParse, tsvParse} from "d3-dsv";
import {timeParse} from "d3-time-format";
//https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=demo

// newsapi.org

function sortByDateAscending(a, b) {
    return a.date - b.date;
}

export async function getStockData(stock, timeframe) {
    try {
        const res = await fetch("/market/api?name=" + stock + "&timeframe=" + timeframe);
        const block = await res.json();
        let retobj = [];
        Object.keys(block).forEach(function (key) {
            let obj = block[key];
            retobj.push({
                date: timeParse("%Y-%m-%d %H:%M:%S")(key),
                open: +obj["1. open"],
                high: +obj["2. high"],
                low: +obj["3. low"],
                close: +obj["4. close"],
                volume: +obj["5. volume"],
            });
        });
        return retobj.sort(sortByDateAscending)
    } catch (e) {
        console.log(e);
    }
}


export async function getStockFundamentals(stock, timeframe) {
    try {
        const res = await fetch("/market/api/fundamentals?name=" + stock + "&timeframe=" + timeframe);
        return await res.json();
    }
    catch (e) {
        console.log(e)
    }
}

export async function getMarketNews(stock) {
    try {
        const res = await fetch("/market/api/news?name=" + stock);
        return await res.json();
    }
    catch (e) {
        console.log(e)
    }
}

export async function getAccountInfo() {
    try {
        const res = await fetch("/account/info/api");
        return await res.json();
    }
    catch (e) {
        return e;
    }
}

export async function getSidebarItem() {
    try {
        const res = await fetch('/account/portfolio/api');
        return await res.json();
    }
    catch (e) {
        console.log(e);
        return e;
    }
}

export async function getQuoteData(stock) {
    try {
        const res = await fetch('/market/api/get_quote?name=' + stock);
        return await res.json();
    }
    catch (e) {
        console.log(e);
    }
}