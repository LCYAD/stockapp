
import * as React from 'react';
//import { render } from 'react-dom';
import Chart from './chart';
//import { getData } from "./utils"
import { connect } from 'react-redux';
import PanelMenuBar from '../panel-menu-bar/panel-menu-bar'
//import { /*ActionFetchNews, ActionSelectInstrument, */ActionFetchChartData } from '../../../../actions/newsAction';

//import * as io from 'socket.io-client';

import updatingDataWrapper from "./liveData";
import { Header, Dropdown } from 'semantic-ui-react';
import { ActionFetchChartDataGran } from '../../../../actions/newsAction';
const ChartWithUpdatingData = updatingDataWrapper(Chart);

//var { TypeChooser } = require ("react-stockcharts/lib/helper");

interface ChartProps {
    //currentInstrument: '';
    // fetchNews?: any;
    // selectInstrument?: any;
    fetchChartData?: any;
    instruTriggered?: any;
    fetchData?: any;
    granularityChange?: any;
    fetchChartDataGran?: any;
    instru? : any;
    change? : any;
    gran?: any;
    newsReducer?: any;
    panel: string;
  }

// var buttonStyle = {
//     color: "grey"/*"{active ? 'red' : null}"*/,
//     padding: '10px'
// }

var granuOptions = [
    {value: 'S5', text: '5 seconds' },
    {value: 'M5', text: '5 minutes' },
    {value: 'M30', text: '30 minutes' },
    {value: 'H1', text: '1 hour' },
    {value: 'D', text: '1 Day' },
    {value: 'W', text: '1 Week' },
    {value: 'M', text: '1 Month' },
]

class ChartComponent extends React.Component<ChartProps> {
	state: any;
	//oandaInstrument: string = "EUR_USD";
	constructor(props: ChartProps) {
        super(props);
        this.granularityChange = this.granularityChange.bind(this);
        // this.handleFetchNews = this.handleFetchNews.bind(this);
        // this.handleFetchDropdown = this.handleFetchDropdown.bind(this);
	}

    componentWillMount() {
        this.props.fetchChartDataGran ("EUR_USD","S30")
    }

    granularityChange(gran: string) {
        console.log(this.props.instru)
        console.log(gran)
        this.props.fetchChartDataGran(this.props.instru, gran);
        // let { granularity } = this.state;
        // granularity = gran;
        // // this.setState({
        // //     granularity : granularity
        // // })
    }

	componentDidMount() {	
        
        console.log('Running renderPPP');
        console.log('socket above');

        // var socket = io.connect('http://localhost:8080');
		// socket.on('ticks', function (data: any) {
		// 	//console.log(data);
		// 	//socket.emit('my other event', { my: 'data' });
        // });	
        

		// getData(this.props.newsReducer.oandaInstrument/*"EUR_USD"*/).then(data => {
		// 	//console.log(data);
		// 	this.setState({ data: data})
		// });
    }
    
    // handleFetchNews(e: any) {
    //     console.log(e);
    //     this.props.fetchNews(e.target.value);
    //     this.props.fetchChartData(e.target.value);
    //     this.props.selectInstrument(e.target.value);
    //     //this.currentInstrument = e.target.value;
    //     // this.setState({ currentInstrument: e.target.value }), function (this:any) {
    //     //   console.log(this.state.currentInstrument)};
    //     // // console.log(e.target.value);
    //     // console.log(this.state);
    //   }
    
    // handleFetchDropdown(value: any) {
    //      console.log(value);
    //      this.props.fetchNews(value);
    //      this.props.fetchChartData(value);
    //      this.props.selectInstrument(value);
    //      //this.props.selectInstrument(value);
    //    }

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
			return (
                <div>CHARTS: Waiting for the instrument selection...
                    <div>
                        <PanelMenuBar panel={this.props.panel} />
                    </div>
                </div>
            )}

		return (
			// <TypeChooser>
            // 	{(type: any) => 
            <div>
                <div style= {{zIndex: 99, position: 'relative'}}>    
                    <PanelMenuBar style={{zIndex: 99, position: 'relative'}} panel={this.props.panel}/>
                    <Header style={{zIndex: 1, position: 'relative', marginTop: '5px'}} as='h6' disabled textAlign='center'>
                        {this.props.instru}
                    </Header>
                    <div>
                    <i className="calendar icon"/>
                    <Dropdown style = {{zIndex: 3, position: 'relative'}} onChange={(e,data: any) => this.granularityChange(data.value)} floating placeholder='Select the granularity' options={granuOptions}/>
                    </div>
                    {/* <Button.Group basic size='mini'>
                        <Button onClick={() => this.granularityChange('S30')} style={buttonStyle} active={this.state.activeS30}> S30 </Button>
                        <Button onClick={() => this.granularityChange('M5')} style={buttonStyle} active={this.state.activeM5}> M5 </Button>
                        <Button onClick={() => this.granularityChange('M30')} style={buttonStyle} active={this.state.activeM30}> M30 </Button>
                        <Button onClick={() => this.granularityChange('H1')} style={buttonStyle} active={this.state.activeH1}> H1 </Button>
                        <Button onClick={() => this.granularityChange('D')} style={buttonStyle} active={this.state.activeD}> D </Button>
                        <Button onClick={() => this.granularityChange('W')} style={buttonStyle} active={this.state.activeW}> W </Button>
                        <Button onClick={() => this.granularityChange('M')} style={buttonStyle} active={this.state.activeM}> M </Button>
                    </Button.Group> */}
                </div>
                <ChartWithUpdatingData style={{zIndex: 1, position: 'relative'}} type={"hybrid"} data={this.props.fetchData} instru={this.props.instru} granularity={this.props.gran} change={this.props.change}/> 
            </div>
			// 	}
			// </TypeChooser>
		)
	}
}

const mapStatetoProps = (state:any) => {
	console.log(state.newsReducer.chartData);
	if (state.newsReducer.chartData) {
		return { fetchData: state.newsReducer.chartData.payload, instru: state.newsReducer.chartData.meta.instru, gran: state.newsReducer.chartData.meta.gran, change: state.newsReducer.chartData.meta.change };
	}
	else {
		return {...state};
	}	
 	//return { fetchData: state.newsReducer.chartData.payload };
};

const mapDispatchToProps = (dispatch: any) =>{
    return {
    //   fetchNews: (key: string) => {
    //     dispatch(ActionFetchNews(key));
    //   },
    //   selectInstrument: (key: string) => {
    //     dispatch(ActionSelectInstrument(key));
    //    },
      fetchChartDataGran: (key: string, gran: string) => {
        dispatch(ActionFetchChartDataGran(key, gran));
      },
    };
  }

export default connect(mapStatetoProps, mapDispatchToProps)(ChartComponent);
/*
render(
	<ChartComponent />,
	document.getElementById("root")
);
*/
