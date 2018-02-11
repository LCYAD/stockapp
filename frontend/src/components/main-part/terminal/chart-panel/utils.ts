 //var { tsvParse /*csvParse*/ } = require ("d3-dsv");
//  var { timeParse } = require ("d3-time-format");
 
// function parseData(parse: any) {
// 	return function(d: any) {
// 		d.date = parse(d.date);
// 		d.open = +d.open;
// 		d.high = +d.high;
// 		d.low = +d.low;
// 		d.close = +d.close;
// 		d.volume = +d.volume;

// 		return d;
// 	};
// }

//const parseDate = timeParse("%Y-%m-%d");
import axios from 'axios';
//var tsv = require('tsv');

export function getData(oandaInstrument: string, gran: string) {
	// const promiseMSFT = fetch("//rrag.github.io/react-stockcharts/data/MSFT.tsv")
	// 	.then(response => response.text())
	// 	.then(data => tsvParse(data, parseData(parseDate)))
	// return promiseMSFT;
		var instrument = oandaInstrument;
		var count = "100";
		//var granularity = "S30"; 
		var granularity = gran;
		var token = "4a38b827b826d678c41323a2fca74089-ae31503c37e1d9d149e4d4e42cce3bd1";
		return axios.get('https://api-fxpractice.oanda.com/v3/instruments/' + instrument + '/candles?count='+ count +'&price=B&granularity='+granularity, {
			headers: {
				"Authorization" : "Bearer " + token,
				'Content-Type': 'application/json'
			}
		})
		.then(function (response) {
			console.log(response);
			var copy:any[] = [];
			for (var i=0; i< response.data.candles.length; i++) {
				copy[i] = {date: new Date(response.data.candles[i].time), open:parseFloat(response.data.candles[i].bid.o),high:parseFloat(response.data.candles[i].bid.h),low:parseFloat(response.data.candles[i].bid.l),close:parseFloat(response.data.candles[i].bid.c),volume:response.data.candles[i].volume,split:'',dividend:'',absoluteChange:'',percentChange:''}
			} 
			return copy;
			});

			
			// for (var i=0; i<response.data.candles.length; i++) {
			// 	var time = Date.parse(response.data.candles[i].time);
			// 	/*
			// 	var o = parseFloat(response.data.candles[i].bid.o);
			// 	var h = parseFloat(response.data.candles[i].bid.h);
			// 	var l = parseFloat(response.data.candles[i].bid.l);
			// 	var c = parseFloat(response.data.candles[i].bid.c);
			// 	*/
			// 	var tohlc = objectToArray(response.data.candles[i].bid);
			// 	tohlc.unshift(time);
			// 	//chart.series[0].addPoint([time, o, h, l, c]);
			// 	chart.series[0].addPoint(tohlc, false);
			// }
			// if (chart == chartTickCandles) {
			// 	chart.setTitle({
			// 	text: instrument + ' S30 Live Candles'
			// 	});
			// }
			// if (chart == chartHistoricalCandles) {
			// 	chart.setTitle({
			// 	text: instrument + ' Historical Daily Candles'
			// 	});
			// }
			// chart.redraw();
			// chart.zoomOut();
			// /*
			// $.getJSON(json, function (data) {

			// });
			// */
			// console.log('for loop Done!');
			// /*
			// if (JSON.parse(data)['type']=='PRICE') {
			// 	chartLive.series[0].addPoint([Date.parse(JSON.parse(data)['time']), parseFloat(JSON.parse(data)['bids'][0]['price'])]);
			// }
			// */

			// })
			// .catch(function (error) {
			// 	console.log(error);
			// });
}
