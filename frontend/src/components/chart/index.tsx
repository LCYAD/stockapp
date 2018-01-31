
import * as React from 'react';
//import { render } from 'react-dom';
import Chart from './chart';
import { getData } from "./utils"
import { connect } from 'react-redux';

//var { TypeChooser } = require ("react-stockcharts/lib/helper");

class ChartComponent extends React.Component {
	state: any;
	componentDidMount() {
		getData().then(data => {
			this.setState({ data })
			console.log(data);
		})
	}
	render() {
		if (this.state == null) {
			return <div>Loading...</div>
		}
		return (
			// <TypeChooser>
			// 	{(type: any) => 
				<Chart type={"hybrid"} data={this.state.data} /> //		either "hybrid" or "svg"
			// 	}
			// </TypeChooser>
		)
	}
}

const mapStatetoProps = (state:any) => {
    console.log(state)
    return {...state
    };
};

export default connect(mapStatetoProps, {})(ChartComponent);

/*
render(
	<ChartComponent />,
	document.getElementById("root")
);
*/
