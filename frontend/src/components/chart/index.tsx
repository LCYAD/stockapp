
import * as React from 'react';
//import { render } from 'react-dom';
import Chart from './chart';
//import { getData } from "./utils"
import { connect } from 'react-redux';

//var { TypeChooser } = require ("react-stockcharts/lib/helper");

interface ChartProps {
	//currentInstrument: '';
	fetchData?: any;
	newsReducer?: any;
  }

class ChartComponent extends React.Component<ChartProps> {
	state: any;
	//oandaInstrument: string = "EUR_USD";
	constructor(props: ChartProps) {
		super(props);
	}

	componentDidMount() {		
		// getData(this.props.newsReducer.oandaInstrument/*"EUR_USD"*/).then(data => {
		// 	//console.log(data);
		// 	this.setState({ data: data})
		// });
	}

	render() {
		console.log('Running render');

		// getData(this.props.newsReducer.oandaInstrument/*"EUR_USD"*/).then(data => {
		// 	console.log(data);
		// 	if (this.state == null) {
		// 		this.setState({ data: data})
		// 	}
		// 	//console.log(JSON.stringify(data));
		// 	console.log(JSON.stringify(data)==JSON.stringify(this.state.data));
		// 	//  else if (JSON.stringify(data) !== JSON.stringify(this.state.data)){
		// 	//  	this.setState({ data: data})
		// 	//  }
		// }); 

		console.log(this.state);
		console.log(this.props);
		if (this.props.fetchData == null) {
			return <div>Loading...</div>
		}

		return (
			// <TypeChooser>
			// 	{(type: any) => 
				<Chart type={"hybrid"} data={this.props.fetchData}/> //		either "hybrid" or "svg"
			// 	}
			// </TypeChooser>
		)
	}
}

const mapStatetoProps = (state:any) => {
	console.log(state.newsReducer.chartData);
	if (state.newsReducer.chartData) {
		return { fetchData: state.newsReducer.chartData.payload };
	}
	else {
		return {...state};
	}	
 	//return { fetchData: state.newsReducer.chartData.payload };
};

export default connect(mapStatetoProps, {})(ChartComponent);
/*
render(
	<ChartComponent />,
	document.getElementById("root")
);
*/
