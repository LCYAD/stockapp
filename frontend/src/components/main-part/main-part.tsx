import * as React from 'react';
import './main-part.css';

import List from '../news/list';
import ChartComponent from '../chart/index';
import Newslist from '../news/newsList';
import { connect } from 'react-redux';

import { ActionFetchNews, ActionSelectInstrument, ActionFetchChartData, ActionFetchPost } from '../../actions/newsAction';
import AddPostComponent from '../social-network/add-post/addPostComponent';
import ViewPostComponentWrapper from '../social-network/viewpost/viewPostComponentWrapper';

import axios from 'axios';
//import { Component } from 'react';

export const instruMatch = {"ERO":"EUR_USD", "JYN":"USD_JPY", "GBB":"GBP_USD"};

interface MainPartProps { 
  fetchNews: any;
  selectInstrument: any;
  fetchChartData: any;
  fetchPost: any;
  user: any;
  post: any;
}

interface MainPartState { 
  msg: any
}

class MainPart extends React.Component<MainPartProps, MainPartState> {
  post: any;

  constructor(props: any) {
    super(props);
    this.handleFetchNews = this.handleFetchNews.bind(this);
    this.handleFetchDropdown = this.handleFetchDropdown.bind(this);
    this.handleFetchPost = this.handleFetchPost.bind(this);
  }

  componentWillMount() {
    this.props.fetchPost(this.props.user);
    //this.handleFetchPost();
  }

  handleFetchPost() {
    console.log(this.state);
    console.log(this.props);
    axios.post("http://localhost:8080/api/getpost", this.props.user
        // , {
        //     headers: { 'Access-Control-Allow-Origin': '*', "X-Requested-With": "XMLHttpRequest", 'Accept': 'application/json',
        //     'Content-Type': 'application/json' },
        //     }
    ).then((response:any) => {
        this.setState({msg: response.data.values}, ()=> {
            this.post = this.state.msg;
            console.log(this.state.msg)
            // if (this.state.msg.length > 0) {
            //     return this.state.msg.map(( p: any) => {
            //         console.log(p);
            //         return (
            //             <div key={p.date}>
            //                 <ViewPostComponent post={p}/>
            //             </div>
            //         );
            //         });
            // }
            // else return (<div/>);
        }); 
        console.log(response.data.values);
    }) 
    .catch((error)=> console.log(error));     
    console.log(this.state);

    // return  (<div key={'1'}>
    //     <ViewPostComponent post={this.state}/>
    //   </div>)
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
    console.log(this.props)
    console.log(this.props.post!=null)
    if (this.props.post!=null) {
      return (
          <div id="main-part">
              This is the main part.
              <AddPostComponent user={this.props.user} fetchPost={this.handleFetchPost}/>
              1st
              <ViewPostComponentWrapper post={this.props.post}/>
              {/* <ViewPostComponent post={this.state}/>  */}
              <List fetchNews={this.handleFetchNews} fetchDropdown={this.handleFetchDropdown}/>
              <ChartComponent /*fetchData={}*//*fetchData={() => return this;}*//>
              <Newslist/>
          </div>
      );
    }
    else {
      return (
        <div id="main-part">
              This is the main part.
              <AddPostComponent user={this.props.user} fetchPost={this.handleFetchPost}/>
              2nd
              <List fetchNews={this.handleFetchNews} fetchDropdown={this.handleFetchDropdown}/>
              <ChartComponent /*fetchData={}*//*fetchData={() => return this;}*//>
              <Newslist/>
          </div>
      )
    }
  }
} // End MainPart Class

const mapStatetoProps = (state: any) => {
  console.log(state);
  return {
    currentInstrument: state.currentInstrument,
    oandaInstrument: instruMatch[state.currentInstrument],
    fetchData: state.fetchData,
    user: state.user,
    post: state.newsReducer.post
    //.newsReducer.post.payload.data
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
    },
    fetchPost: (key: string) => {
      dispatch(ActionFetchPost(key));
    }
  };
}

export default connect(mapStatetoProps, mapDispatchToProps)(MainPart);