
import * as React from "react";
import * as io from 'socket.io-client';

function getDisplayName(ChartComponent: any) {
	const name = ChartComponent.displayName || ChartComponent.name || "ChartComponent";
	return name;
}

export default function updatingDataWrapper(ChartComponent: any) {
	const LENGTH = 130;
	var candlesPeriod = 30000;
	var granularityPeriod = {
		'S5': 5000,
		'S30': 30000,
		'M5': 300000,
		'M30': 1800000,
		'H1': 3600000,
		'D': 86400000,
		'W': 604800000,
		'M': 2419200000
	};

	class UpdatingComponentHOC extends React.Component<any,any> {
        static defaultProps: { type: string; };
        static displayName: string;
        speed: any;
        interval: any;
        func: any;
		
		constructor(props: any) {
			super(props);
			this.state = {
				length: LENGTH,
				data: this.props.data.slice(0, LENGTH),
			};
			this.speed = 1000;
            //this.onKeyPress = this.onKeyPress.bind(this);
		}
		componentDidMount() {
            //document.addEventListener("keyup", this.onKeyPress);
		}

		componentWillReceiveProps(nextProps: any) {
			console.log(nextProps);
			console.log('setstate');
			this.setState({
				length: LENGTH,
				data: nextProps.data,
				granularity: nextProps.granularity
			}, () => candlesPeriod = granularityPeriod[nextProps.granularity]);
			console.log('setted');
		}

		componentWillMount() {

			//if () {
			//	socket.disconnect();
			//console.log
			// console.log(this.props.data);
			// 	this.setState({
			// 		length: LENGTH,
			// 		data: this.props.data.slice(0, LENGTH),
			// 	});
			// //}

			//else {
			console.log("LIVE DATA will mount");
			console.log(this.props);
			console.log(this.state);
			///////////
			// var granularityPeriod = {
			// 	'S30': 30000,
			// 	'M5': 300000,
			// 	'M30': 1800000,
			// 	'H1': 3600000,
			// 	'D': 86400000,
			// 	'W': 604800000,
			// 	'M': 2419200000
			// };

			//var candlesPeriod = 30000;
			var candleDone = true;
			var t0 = 0;
			var o: any, h: any, l: any, c: any;

			// var asksPrice;
			// var bidsPrice;
			// var socketInstrument: any;
			// var liveObj = {};

			var socket = io.connect('http://localhost:8080');

			/////////
			socket.on("ticks", (data: any)=>{
				//console.log(data);
				// push with the last copy from liveObj if HEARTBEAT:
				if (data.includes('HEARTBEAT')){
				  var JSON_data = JSON.parse(data);
				//   for (var i in liveObj) {
				// 	if (liveObj.hasOwnProperty(i)) {
				// 	  var time: any = Date.parse(JSON_data.time);
				// 	  // time = parseFloat(JSON_data.time);
				// 	  console.log(i);
				// 	  if (liveObj[i].ask.length!=0) {
				// 		liveObj[i].ask.push([time, liveObj[i].ask[liveObj[i].ask.length-1][1]]);
				// 		liveObj[i].bid.push([time, liveObj[i].bid[liveObj[i].bid.length-1][1]]);
				// 	  }
				// 	  // Set maximum number of data in liveObj:
				// 	  if (liveObj[i].ask.length > 100) {
				// 		liveObj[i].ask.splice(0,1);
				// 	  }
				// 	  if (liveObj[i].bid.length > 100) {
				// 		liveObj[i].bid.splice(0,1);
				// 	  }
				// 	}
				//   }
				  if (time-t0 >= candlesPeriod && t0 != 0) {
					  candleDone = true;
				  }
				//   if (liveObj[this.props.instru]) {
				// 	  if (liveObj[this.props.instru].ask.length!=0) {
				// 		chartLive.series[0].addPoint([time, liveObj[chartLive.title.textStr].ask[liveObj[chartLive.title.textStr].ask.length-1][1]]);
				// 		chartLive.series[1].addPoint([time, liveObj[chartLive.title.textStr].bid[liveObj[chartLive.title.textStr].bid.length-1][1]]);
				// 	  }
				// 	}
				//   //console.log(chartLive.title.textStr)
				}

				if (!data.includes('HEARTBEAT')){
					try {
						var JSON_data = JSON.parse(data);
					}
					catch(err){
						console.log(err);
						console.log(data);
					}
					//console.log(JSON_data[0]);
					//let ask = JSON_data.asks[0].price;
					let bid = JSON_data.bids[0].price;
					let instrument = JSON_data.instrument;
					//console.log(`Instrument: ${instrument}, bid: ${bid}, ask: ${ask}`);
					///////
				//	appendDash($(`.${instrument}.ask`), $(`.${instrument}.bid`), ask , bid);

					//Put the data in the liveObj:
					// if (liveObj[instrument]) {
					//   var time = Date.parse(JSON_data.time);
					//   asksPrice = parseFloat(ask);
					//   bidsPrice = parseFloat(bid);
					//   liveObj[instrument].ask.push([time, asksPrice]);
					//   liveObj[instrument].bid.push([time, bidsPrice]);
					//   // Set maximum number of data in liveObj:
					//   if (liveObj[instrument].ask.length > 100) {
					// 	liveObj[instrument].ask.splice(0,1);
					//   }
					//   if (liveObj[instrument].bid.length > 100) {
					// 	liveObj[instrument].bid.splice(0,1);
					//   }
					//   //console.log(liveObj);
					// }

					// for highcharts:
					// if (instrument == hoverInstrument) {
					// 	// for Live Ticks:
					// 	var time = Date.parse(JSON_data.time);
					// 	if (JSON.parse(data)['type']=='PRICE') {
					// 	  asksPrice = parseFloat(ask);
					// 	  bidsPrice = parseFloat(bid);
					// 	  chartLive.series[0].addPoint([time, asksPrice]);
					// 	  chartLive.series[1].addPoint([time, bidsPrice]);
					// 	  chartLive.yAxis[0].options.plotLines[0].value = asksPrice;
					// 	  chartLive.yAxis[0].options.plotLines[0].label.text = asksPrice;
					// 	  chartLive.yAxis[0].options.plotLines[1].value = bidsPrice;
					// 	  chartLive.yAxis[0].options.plotLines[1].label.text = bidsPrice;
					// 	  chartLive.yAxis[0].update();
					// 	}
					// }

					if (instrument == this.props.instru) {
						var time: any = Date.parse(JSON_data.time);
						if (JSON.parse(data)['type']=='PRICE') {
			//				console.log(candlesPeriod);
							//var asksPrice = parseFloat(ask);
							var bidsPrice = parseFloat(bid);

							if (time-t0 >= candlesPeriod && t0 != 0) {
								//chartTickCandles.series[0].addPoint([(time+t0)/2, o, h, l, c]);
								//chartTickCandles.series[0].data[chartTickCandles.series[0].data.length-1].update([(time+t0)/2, o, h, l, c]);
								var socketTicks = {date: new Date((time+t0)/2), open: o, high:h, low:l, close: c, volume: 0,split:'',dividend:'',absoluteChange:'',percentChange:''}
								var data: any = this.state.data;
								data[data.length-1] = socketTicks;
			//					console.log(socketTicks);
								this.setState({
									length: this.state.length,
									data: data//this.props.data.slice(0, this.state.length + 1),
								});
								candleDone = true;
							}

							// for Live Tick Candles:
							if (candleDone) {
								o = h = l = c = bidsPrice;
								t0 = time;
			//					console.log('candleDone');
			//					console.log(time);
								candleDone = false;
								var socketTicks = {date: new Date((time+t0)/2), open: o, high:h, low:l, close: c, volume: 0,split:'',dividend:'',absoluteChange:'',percentChange:''}
								var data: any = this.state.data;
			//					console.log(socketTicks);
			//					console.log(data)
								this.setState({
									length: this.state.length + 1,
									data: [...this.state.data, socketTicks]//this.props.data.slice(0, this.state.length + 1),
								});
								//chartTickCandles.series[0].addPoint([(time+t0)/2, o, h, l, c]);
							}
							else {
								if (bidsPrice > h && time-t0 <= candlesPeriod) {
									h = bidsPrice;
									var socketTicks = {date: new Date((time+t0)/2), open: o, high:h, low:l, close: c, volume: 0,split:'',dividend:'',absoluteChange:'',percentChange:''}
									var data: any = this.state.data;
									data[data.length-1] = socketTicks;
			//						console.log(socketTicks);
									this.setState({
										length: this.state.length,
										data: data//this.props.data.slice(0, this.state.length + 1),
									});
									//chartTickCandles.series[0].data[chartTickCandles.series[0].data.length-1].update([(time+t0)/2, o, h, l, c]);
								}
								if (bidsPrice < l && time-t0 <= candlesPeriod) {
									l = bidsPrice;
									var socketTicks = {date: new Date((time+t0)/2), open: o, high:h, low:l, close: c, volume: 0,split:'',dividend:'',absoluteChange:'',percentChange:''}
									var data: any = this.state.data;
									data[data.length-1] = socketTicks;
			//						console.log(socketTicks);
									this.setState({
										length: this.state.length,
										data: data//this.props.data.slice(0, this.state.length + 1),
									});
									//chartTickCandles.series[0].data[chartTickCandles.series[0].data.length-1].update([(time+t0)/2, o, h, l, c]);
								}
								c = bidsPrice;
								var socketTicks = {date: new Date((time+t0)/2), open: o, high:h, low:l, close: c, volume: 0,split:'',dividend:'',absoluteChange:'',percentChange:''}
									var data: any = this.state.data;
									data[data.length-1] = socketTicks;
			//						console.log(socketTicks);
									this.setState({
										length: this.state.length,
										data: data//this.props.data.slice(0, this.state.length + 1),
									});
								//chartTickCandles.series[0].data[chartTickCandles.series[0].data.length-1].update([(time+t0)/2, o, h, l, c]);
							}
						}

					}
					// End for highcharts
				} //End if !data.includes('HEARTBEAT')
			});
			//////////////////
			// socket.on('ticks', (data: any) => {
			// 	console.log(data);
			// 	//socket.emit('my other event', { my: 'data' });
			// 	// if (data.instrument == this.props.instru) {
			// 	// 	if (data.type == "PRICE") {
			// 	// 		//if (this.state.length < this.props.data.length) {
			// 	// 			var socketTicks = {date: new Date(data.time), open:parseFloat(response.data.candles[i].bid.o),high:parseFloat(response.data.candles[i].bid.h),low:parseFloat(response.data.candles[i].bid.l),close:parseFloat(response.data.candles[i].bid.c),volume:response.data.candles[i].volume,split:'',dividend:'',absoluteChange:'',percentChange:''}
			// 	// 			this.setState({
			// 	// 				length: this.state.length + 1,
			// 	// 				data: {...this.state.data, socketTicks}//this.props.data.slice(0, this.state.length + 1),
			// 	// 			});
			// 	// 		//}
			// 	// 	}
			// 	// }	
			// });
			
			//}	
		}
		componentWillUnmount() {
			if (this.interval) clearInterval(this.interval);
			//document.removeEventListener("keyup", this.onKeyPress);
		}

		// onKeyPress(e: any) {
		// 	const keyCode = e.which;
		// 	console.log(keyCode);
		// 	switch (keyCode) {
		// 	case 50: {
		// 			// 2 (50) - Start alter data
		// 		this.func = () => {
		// 			if (this.state.length < this.props.data.length) {
		// 				this.setState({
		// 					length: this.state.length + 1,
		// 					data: this.props.data.slice(0, this.state.length + 1),
		// 				});
		// 			}
		// 		};
		// 		break;
		// 	}
		// 	case 80:
		// 			// P (80)
		// 	case 90: {
		// 			// 1 (49) - Start Push data
		// 		this.func = () => {
		// 			if (this.state.length < this.props.data.length) {
		// 				this.setState({
		// 					length: this.state.length + 1,
		// 					data: this.props.data.slice(0, this.state.length + 1),
		// 				});
		// 			}
		// 		};
		// 		break;
		// 	}
		// 	case 27: {
		// 			// ESC (27) - Clear interval
		// 		this.func = null;
		// 		if (this.interval) clearInterval(this.interval);
		// 		break;
		// 	}
		// 	case 107: {
		// 			// + (107) - increase the this.speed
		// 		this.speed = Math.max(this.speed / 2, 50);
		// 		break;
		// 	}
		// 	case 109:
		// 	case 189: {
		// 			// - (189, 109) - reduce the this.speed
		// 		const delta = Math.min(this.speed, 1000);
		// 		this.speed = this.speed + delta;
		// 		break;
		// 	}
		// 	}
		// 	if (this.func) {
		// 		if (this.interval) clearInterval(this.interval);
		// 		console.log("this.speed  = ", this.speed);
		// 		this.interval = setInterval(this.func, this.speed);
		// 	}
		// }

		render() {
						
			const { type } = this.props;
			const { data } = this.state;

		//	console.log(this.props);
		//	console.log(this.state);
		//	console.log("Live data")
			
;			return <ChartComponent ref="component" data={data} type={type} />;
		}
    }
    
	UpdatingComponentHOC.defaultProps = {
		type: "svg",
	};
	UpdatingComponentHOC.displayName = `updatingDataWrapper(${ getDisplayName(ChartComponent) })`;

	return UpdatingComponentHOC;
}