import * as React from "react";
var PropTypes = require("prop-types");

var { format } = require("d3-format");
var { timeFormat } = require("d3-time-format");

var { ChartCanvas, Chart } = require("react-stockcharts");
var {
	BarSeries,
	CandlestickSeries,
	LineSeries,
	MACDSeries,
} = require("react-stockcharts/lib/series");
var { XAxis, YAxis } = require("react-stockcharts/lib/axes");
var {
	CrossHairCursor,
	EdgeIndicator,
	CurrentCoordinate,
	MouseCoordinateX,
	MouseCoordinateY,
} = require("react-stockcharts/lib/coordinates");

var { discontinuousTimeScaleProvider } = require("react-stockcharts/lib/scale");
var {
	OHLCTooltip,
	MovingAverageTooltip,
	MACDTooltip,
} = require("react-stockcharts/lib/tooltip");
var { ema, macd } = require("react-stockcharts/lib/indicator");
var { fitWidth, SaveChartAsImage } = require("react-stockcharts/lib/helper");
var { EquidistantChannel, TrendLine, FibonacciRetracement, DrawingObjectSelector } = require("react-stockcharts/lib/interactive");
var { /*last,*/ toObject } = require("react-stockcharts/lib/utils");
//import axios from "axios";

import {
	saveInteractiveNodes,
	getInteractiveNodes,
} from "./interactiveutils";
import { Menu } from "semantic-ui-react";

const macdAppearance = {
	stroke: {
		macd: "#FF0000",
		signal: "#00F300",
	},
	fill: {
		divergence: "#4682B4"
	},
};

class CandlestickChart extends React.Component {
	node: any;
	node_1: any;
	node_3: any;
	channels_1:any;
	channels_3:any;
	static defaultProps: { type: string; };
	static propTypes: { data: any; width: any; ratio: any; type: any; };

	saveInteractiveNodes: (type: any, chartId: any) => void;
	getInteractiveNodes: any;
	canvasNode: any;
	state: any;
	props: any;

	constructor(props: any) {
		super(props);
		this.onKeyPress = this.onKeyPress.bind(this);
		this.onFibComplete1 = this.onFibComplete1.bind(this);
		this.onFibComplete3 = this.onFibComplete3.bind(this);
		this.onDrawCompleteChart1 = this.onDrawCompleteChart1.bind(this);
		this.onDrawCompleteChart3 = this.onDrawCompleteChart3.bind(this);
		this.handleSelection = this.handleSelection.bind(this);

		this.saveInteractiveNodes = saveInteractiveNodes.bind(this);
		this.getInteractiveNodes = getInteractiveNodes.bind(this);
		this.onDrawComplete = this.onDrawComplete.bind(this);

		this.saveCanvasNode = this.saveCanvasNode.bind(this);
		this.fib = this.fib.bind(this);
		this.trend = this.trend.bind(this);
		this.channel = this.channel.bind(this);

		this.state = {
			enableTrendLine: false,
			trends_1: [
				//{ start: [1606, 56], end: [1711, 53], appearance: { stroke: "green" }, type: "XLINE" }
			],
			trends_3: [],
			enableFib: false,
			retracements_1: [],
			retracements_3: [],
			enableInteractiveObject: false,
			channels_1: [],
			channels_3: []
		};
	}
	saveCanvasNode(node: any) {
		this.canvasNode = node;
	}

	saveInteractiveNode(node: any) {
		this.node = node;
	}

	componentDidMount() {
		document.addEventListener("keyup", this.onKeyPress);
	}
	componentWillUnmount() {
		document.removeEventListener("keyup", this.onKeyPress);
	}
	handleSelection(interactives: any) {
		const state = toObject(interactives, (each: any) => {
			return [
				`trends_${each.chartId}`,
				each.objects,
			];
		});
		this.setState(state);
	}

	onDrawComplete(channels_1:any) {
		// this gets called on
		// 1. draw complete of drawing object
		// 2. drag complete of drawing object
		this.setState({
			channels_1,
			enableInteractiveObject: false
		});
	}

	onFibComplete1(retracements_1: any) {
		this.setState({
			retracements_1,
			enableFib: false
		});
	}

	onFibComplete3(retracements_3: any) {
		this.setState({
			retracements_3,
			enableFib: false
		});
	}

	onDrawCompleteChart1(trends_1: any) {
		// this gets called on
		// 1. draw complete of trendline
		// 2. drag complete of trendline
		//console.log(trends_1);
		this.setState({
			trends_1,
			enableTrendLine: false
		});
	}

	onDrawCompleteChart3(trends_3: any) {
		// this gets called on
		// 1. draw complete of trendline
		// 2. drag complete of trendline
		console.log(trends_3);
		this.setState({
			trends_3,
			enableTrendLine: false
		});
	}

	channel() {
		console.log(this.state);
		this.setState({
			enableInteractiveObject: true
		});
	}

	fib() {
		// var instrument = "EUR_USD";
		// var count = "100";
		// var granularity = "D"; 
		// var token = "4a38b827b826d678c41323a2fca74089-ae31503c37e1d9d149e4d4e42cce3bd1";
		// axios.get('https://api-fxpractice.oanda.com/v3/instruments/' + instrument + '/candles?count='+ count +'&price=B&granularity='+granularity, {
        //         headers: {
        //             "Authorization" : "Bearer " + token,
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //     .then(function (response: any) {
        //     //console.log(response.data.candles);
		// 	console.log(response)});
			
		console.log(this.state);
		this.setState({
			enableFib: true
		});
	}

	trend() {
		console.log(this.state);
		this.setState({
			enableTrendLine: true
		});
	}

	saveImage() {
		SaveChartAsImage.saveChartAsImage(document);
	}

	hoverOn(className: string) {
		document.getElementsByClassName(className)["0"].style.color="lightBlue";
	}

	hoverOut(className: string) {
		document.getElementsByClassName(className)["0"].style.color="grey";
	}

	svgHoverOn(className: string) {
		for (var x=0; x< document.querySelectorAll('svg.'+className+" path").length; x++) {
			document.querySelectorAll('svg.'+className+" path")[x]['style'].fill="lightBlue";
		}
	}

	svgHoverOut(className: string) {
		for (var x=0; x< document.querySelectorAll('svg.'+className+" path").length; x++) {
			document.querySelectorAll('svg.'+className+" path")[x]['style'].fill="grey";
		}
	}

	onKeyPress(e: any) {
		const keyCode = e.which;
		console.log(e);
		console.log(keyCode);
		switch (keyCode) {
			case 8: { // DEL

				const trends_1 = this.state.trends_1
					.filter((each: any) => !each.selected);
				const trends_3 = this.state.trends_3
					.filter((each: any) => !each.selected);
				
				const retracements_1 = this.state.retracements_1
					.filter((each:any) => !each.selected);
				const retracements_3 = this.state.retracements_3
					.filter((each:any) => !each.selected);

				const channels_1 = this.state.channels_1
					.filter((each:any) => !each.selected);
				const channels_3 = this.state.channels_3
					.filter((each:any) => !each.selected);

				this.canvasNode.cancelDrag();
				this.setState({
					trends_1,
					trends_3,
					retracements_1,
					retracements_3,
					channels_1,
					channels_3
				});
				break;
			}

			case 27: { // ESC
				this.canvasNode.cancelDrag();
				console.log(this)
				//this.node_1.terminate();
				//this.node_3.terminate();
				this.setState({
					enableTrendLine: false
				});
				break;
			}
			case 68: { // D - Draw trendline
				
			}

			case 69: { // E - Enable trendline
				this.setState({
					enableTrendLine: true
				});
				break;
			}

			case 83: {
				SaveChartAsImage.saveChartAsImage(document);
			}
		}
	}

	render() {
		const ema26 = ema()
			.id(0)
			.options({ windowSize: 26 })
			.merge((d: any, c: any) => { d.ema26 = c; })
			.accessor((d: any) => d.ema26);

		const ema12 = ema()
			.id(1)
			.options({ windowSize: 12 })
			.merge((d: any, c: any) => { d.ema12 = c; })
			.accessor((d: any) => d.ema12);

		const macdCalculator = macd()
			.options({
				fast: 12,
				slow: 26,
				signal: 9,
			})
			.merge((d: any, c: any) => { d.macd = c; })
			.accessor((d: any) => d.macd);

		const { type, data: initialData, width, ratio } = this.props;

		const calculatedData = macdCalculator(ema12(ema26(initialData)));
		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor((d: any) => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(calculatedData);

		// const start = xAccessor(last(data));
		// const end = xAccessor(data[Math.max(0, data.length - 300)]);
		// const xExtents = [start, end];
		
		var iconStyle = {
			width: 28,
			color: 'grey',}
		var menuStyle = {
			width: '60px',}

		return (
			<div>
				<div>
					<div className="ui grid">
						<div className="column">
							<div className="ui tabular">
							<Menu vertical tabular style = {menuStyle}>
								<Menu.Item onClick={this.channel} onMouseOver={()=>this.svgHoverOn("channel")} onMouseOut={()=>this.svgHoverOut("channel")} onLoad={()=>this.svgHoverOut("channel")}>
									<svg className="channel" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fillRule="nonzero"><path d="M7.463 12.026l13.537-7.167-.468-.884-13.537 7.167z"></path><path d="M22.708 16.824l-17.884 9.468.468.884 17.884-9.468z"></path><path d="M22.708 9.824l-15.839 8.386.468.884 15.839-8.386z"></path><path d="M5.5 14c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM5.5 21c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM22.5 5c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg>
								</Menu.Item>
								<Menu.Item name='pics' onClick={this.trend} onMouseOver={()=>this.svgHoverOn("trend")} onMouseOut={()=>this.svgHoverOut("trend")} onLoad={()=>this.svgHoverOut("trend")}>
									<svg className="trend" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fillRule="nonzero"><path d="M7.354 21.354l14-14-.707-.707-14 14z"></path><path d="M22.5 7c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM5.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg>
								</Menu.Item>
								<Menu.Item name='companies' onClick={this.fib} onMouseOver={()=>this.svgHoverOn("fib")} onMouseOut={()=>this.svgHoverOut("fib")} onLoad={()=>this.svgHoverOut("fib")}>
									<svg className="fib" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fillRule="nonzero"> <path d="M3 5h22v-1h-22z"></path><path d="M3 17h22v-1h-22z"></path><path d="M3 11h19.5v-1h-19.5z"></path><path d="M5.5 23h19.5v-1h-19.5z"></path><path d="M3.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM24.5 12c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg>
								</Menu.Item>
								<Menu.Item name='links' onClick={this.saveImage}>
									<i className="fa fa-download fa-2x" aria-hidden="true" style={iconStyle} onClick={this.saveImage} onMouseOver={()=>this.hoverOn("fa-download")} onMouseOut={()=>this.hoverOut("fa-download")}> </i>
								</Menu.Item>
							</Menu>
							</div>
					</div>
					<div className="wide column">
							
						<ChartCanvas ref={this.saveCanvasNode}
							height={600}
							width={0.95*width}
							ratio={ratio}
							margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
							type={type}
							seriesName="MSFT"
							data={data}
							xScale={xScale}
							xAccessor={xAccessor}
							displayXAccessor={displayXAccessor}
							// xExtents={xExtents}
						>
							<Chart id={1} height={400}
								yExtents={[(d: any) => [d.high, d.low], ema26.accessor(), ema12.accessor()]}
								padding={{ top: 10, bottom: 20 }}
							>
								<XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} />
								<YAxis axisAt="right" orient="right" ticks={5} />
								<MouseCoordinateY
									at="right"
							 		orient="right"
									displayFormat={format(".2f")} />

								<CandlestickSeries />
								<LineSeries yAccessor={ema26.accessor()} stroke={ema26.stroke()} />
								<LineSeries yAccessor={ema12.accessor()} stroke={ema12.stroke()} />

								<CurrentCoordinate yAccessor={ema26.accessor()} fill={ema26.stroke()} />
								<CurrentCoordinate yAccessor={ema12.accessor()} fill={ema12.stroke()} />

								<EdgeIndicator itemType="last" orient="right" edgeAt="right"
									yAccessor={(d: any) => d.close} fill={(d: any) => d.close > d.open ? "#6BA583" : "#FF0000"} />

								<OHLCTooltip origin={[-40, 0]} />

								<MovingAverageTooltip
									onClick={(e: any) => console.log(e)}
									origin={[-38, 15]}
									options={[
										{
											yAccessor: ema26.accessor(),
											type: ema26.type(),
											stroke: ema26.stroke(),
											windowSize: ema26.options().windowSize,
										},
										{
											yAccessor: ema12.accessor(),
											type: ema12.type(),
											stroke: ema12.stroke(),
											windowSize: ema12.options().windowSize,
										},
									]}
								/>
								<TrendLine
									ref={this.saveInteractiveNodes("Trendline", 1)}
									enabled={this.state.enableTrendLine}
									type="RAY"
									snap={false}
									snapTo={(d: any) => [d.high, d.low]}
									onStart={() => console.log("START")}
									onComplete={this.onDrawCompleteChart1}
									trends={this.state.trends_1}
								/>
								<FibonacciRetracement
									ref={this.saveInteractiveNodes("FibonacciRetracement", 1)}
									enabled={this.state.enableFib}
									retracements={this.state.retracements_1}
									onComplete={this.onFibComplete1}
								/>
								<EquidistantChannel
									ref={this.saveInteractiveNodes("EquidistantChannel", 1)}
									enabled={this.state.enableInteractiveObject}
									onStart={() => console.log("START")}
									onComplete={this.onDrawComplete}
									channels={this.channels_1}
								/>
							</Chart>
							<Chart id={2} height={150}
								yExtents={[(d: any) => d.volume]}
								origin={(w: any, h: any) => [0, h - 300]}
							>
								<YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")} />

								<MouseCoordinateY
									at="left"
									orient="left"
									displayFormat={format(".4s")} />

								<BarSeries yAccessor={(d: any) => d.volume} fill={(d: any) => d.close > d.open ? "#6BA583" : "#FF0000"} />
							</Chart>
							<Chart id={3} height={150}
								yExtents={macdCalculator.accessor()}
								origin={(w: any, h: any) => [0, h - 150]} padding={{ top: 10, bottom: 10 }}
							>
								<XAxis axisAt="bottom" orient="bottom" />
								<YAxis axisAt="right" orient="right" ticks={2} />

								<MouseCoordinateX
									at="bottom"
									orient="bottom"
									displayFormat={timeFormat("%Y-%m-%d")} />
								<MouseCoordinateY
									at="right"
									orient="right"
									displayFormat={format(".2f")} />
								
								<MACDSeries yAccessor={(d: any) => d.macd}
									{...macdAppearance} />
								<FibonacciRetracement
									ref={this.saveInteractiveNodes("FibonacciRetracement", 3)}
									enabled={this.state.enableFib}
									type="BOUND"
									retracements={this.state.retracements_3}
									onComplete={this.onFibComplete3}
								/>
								<TrendLine
									ref={this.saveInteractiveNodes("Trendline", 3)}
									enabled={this.state.enableTrendLine}
									type="RAY"
									snap={false}
									snapTo={(d: any) => [d.high, d.low]}
									onStart={() => console.log("End Trend")}
									onComplete={this.onDrawCompleteChart3}
									trends={this.state.trends_3}
								/>
								<MACDTooltip
									origin={[-38, 15]}
									yAccessor={(d: any) => d.macd}
									options={macdCalculator.options()}
									appearance={macdAppearance}
								/>
							</Chart>
							<CrossHairCursor />
							<DrawingObjectSelector
								enabled={!this.state.enableTrendLine}
								getInteractiveNodes={this.getInteractiveNodes}
								drawingObjectMap={{
									Trendline: "trends",
									FibonacciRetracement: "retracements",
									EquidistantChannel: "channels"
								}}
								onSelect={this.handleSelection}
							/>
						</ChartCanvas>
							
						</div>
					</div>
				</div>
			
			</div>
		);
	}
}

CandlestickChart.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandlestickChart.defaultProps = {
	type: "svg",
};

const CandleStickChartWithInteractiveIndicator = fitWidth(CandlestickChart);

export default CandleStickChartWithInteractiveIndicator;