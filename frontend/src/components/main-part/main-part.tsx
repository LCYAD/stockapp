import * as React from 'react';
import './main-part.css';

import List from '../news/list';
import ChartComponent from '../chart/index';
import Newslist from '../news/newsList';
import { connect } from 'react-redux';

import { ActionFetchNews, ActionSelectInstrument, ActionFetchChartData } from '../../actions/newsAction';
import AddPostComponent from '../social-network/add-post/addPostComponent';
import ViewPostComponent from '../social-network/viewpost/viewPostComponent';

export const instruMatch = {"ERO":"EUR_USD", "JYN":"USD_JPY", "GBB":"GBP_USD"};

interface MainPartProps { 
  fetchNews: any;
  selectInstrument: any;
  fetchChartData: any;
}

interface MainPartState { }

class MainPart extends React.Component<MainPartProps, MainPartState> {
  constructor(props: any) {
    super(props);
    this.handleFetchNews = this.handleFetchNews.bind(this);
    this.handleFetchDropdown = this.handleFetchDropdown.bind(this);
  }

  handleFetchNews(e: any) {
    console.log(e);
    this.props.fetchNews(e.target.value);
    this.props.fetchChartData(e.target.value);
    this.props.selectInstrument(e.target.value);
    //this.currentInstrument = e.target.value;
    // this.setState({ currentInstrument: e.target.value }), function (this:any) {
    //   console.log(this.state.currentInstrument)};
    // // console.log(e.target.value);
    // console.log(this.state);
  }


   handleFetchDropdown(value: any) {
     console.log(value);
     this.props.fetchNews(value);
     this.props.fetchChartData(value);
     this.props.selectInstrument(value);
     //this.props.selectInstrument(value);
   }
  
  render() {
    return (
        <div id="main-part">
            This is the main part.
            <AddPostComponent/>
            <ViewPostComponent/>
            <List fetchNews={this.handleFetchNews} fetchDropdown={this.handleFetchDropdown}/>
            <ChartComponent /*fetchData={}*//*fetchData={() => return this;}*//>
            <Newslist/>
        </div>
    );
  }
} // End MainPart Class

const mapStatetoProps = (state: any) => {
  //console.log(state);
  return {
    currentInstrument: state.currentInstrument,
    oandaInstrument: instruMatch[state.currentInstrument],
    fetchData: state.fetchData,
  }
};

const mapDispatchToProps = (dispatch: any) =>{
  return {
    fetchNews: (key: string) => {
      dispatch(ActionFetchNews(key));
    },
    selectInstrument: (key: string) => {
      dispatch(ActionSelectInstrument(key));
     },
    fetchChartData: (key: string) => {
      dispatch(ActionFetchChartData(key));
    }
  };
}

export default connect(mapStatetoProps, mapDispatchToProps)(MainPart);