import React from "react";
import PropTypes from "prop-types";

import {format} from "d3-format";
import {timeFormat} from "d3-time-format";

import {Chart, ChartCanvas} from "react-stockcharts";
import {AreaSeries, BarSeries, CandlestickSeries, LineSeries, StochasticSeries,} from "react-stockcharts/lib/series";
import {XAxis, YAxis} from "react-stockcharts/lib/axes";
import {
    CrossHairCursor,
    CurrentCoordinate,
    EdgeIndicator,
    MouseCoordinateX,
    MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import {discontinuousTimeScaleProvider} from "react-stockcharts/lib/scale";
import {MovingAverageTooltip, OHLCTooltip,} from "react-stockcharts/lib/tooltip";
import {ema, sma} from "react-stockcharts/lib/indicator";
import {fitWidth} from "react-stockcharts/lib/helper";
import {last} from "react-stockcharts/lib/utils";

const stoAppearance = {
    stroke: Object.assign({},
        StochasticSeries.defaultProps.stroke)
};

class StockCharts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const ema50 = ema()
            .id(0)
            .options({windowSize: 50})
            .merge((d, c) => {
                d.ema50 = c;
            })
            .accessor(d => d.ema50);

        const ema10 = ema()
            .id(1)
            .options({windowSize: 10})
            .merge((d, c) => {
                d.ema10 = c;
            })
            .accessor(d => d.ema10);

        const smaVolume50 = sma()
            .id(3)
            .options({windowSize: 50, sourcePath: "volume"})
            .merge((d, c) => {
                d.smaVolume50 = c;
            })
            .accessor(d => d.smaVolume50);

        const {type, data: initialData, width, ratio} = this.props;

        const calculatedData = ema50(ema10(smaVolume50(initialData)));
        const xScaleProvider = discontinuousTimeScaleProvider
            .inputDateAccessor(d => d.date);
        const {
            data,
            xScale,
            xAccessor,
            displayXAccessor,
        } = xScaleProvider(calculatedData);

        const start = xAccessor(last(data));
        const end = xAccessor(data[Math.max(0, data.length - 150)]);
        const xExtents = [start, end];

        return (
            <ChartCanvas height={475}
                         width={width}
                         ratio={ratio}
                         margin={{left: 70, right: 70, top: 20, bottom: 30}}
                         type={type}
                         seriesName="CHART"
                         data={data}
                         xScale={xScale}
                         xAccessor={xAccessor}
                         displayXAccessor={displayXAccessor}
                         xExtents={xExtents}
            >

                <Chart id={1} height={425}
                       yExtents={[d => [d.high, d.low], ema50.accessor(), ema10.accessor()]}
                       padding={{top: 10, bottom: 20}}
                >
                    <XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0}/>
                    <YAxis axisAt="right" orient="right" ticks={5}/>

                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={format(".2f")}/>

                    <CandlestickSeries/>
                    <LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()}/>
                    <LineSeries yAccessor={ema10.accessor()} stroke={ema10.stroke()}/>

                    <CurrentCoordinate yAccessor={ema50.accessor()} fill={ema50.stroke()}/>
                    <CurrentCoordinate yAccessor={ema10.accessor()} fill={ema10.stroke()}/>

                    <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                                   yAccessor={d => d.close} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}/>

                    <OHLCTooltip origin={[-40, 0]}/>

                    <MovingAverageTooltip
                        onClick={e => console.log(e)}
                        origin={[-38, 15]}
                        options={[
                            {
                                yAccessor: ema50.accessor(),
                                type: "EMA",
                                stroke: ema50.stroke(),
                                windowSize: ema50.options().windowSize,
                            },
                            {
                                yAccessor: ema10.accessor(),
                                type: "EMA",
                                stroke: ema10.stroke(),
                                windowSize: ema10.options().windowSize,
                            },
                        ]}
                    />

                </Chart>
                <Chart id={2} height={150}
                       yExtents={[d => d.volume, smaVolume50.accessor()]}
                       origin={(w, h) => [0, h - 150]}
                >
                    <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>

                    <MouseCoordinateY
                        at="left"
                        orient="left"
                        displayFormat={format(".4s")}/>

                    <MouseCoordinateX
                        at="bottom"
                        orient="bottom"
                        displayFormat={timeFormat("%m/%d %H:%M")}/>
                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={format(".2f")}/>

                    <BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}/>
                    <AreaSeries yAccessor={smaVolume50.accessor()} stroke={smaVolume50.stroke()}
                                fill={smaVolume50.fill()}/>
                </Chart>

                <CrossHairCursor/>
            </ChartCanvas>
        );
    }
}

StockCharts.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

StockCharts.defaultProps = {
    type: "svg",
};
StockCharts = fitWidth(StockCharts);

export default StockCharts;
