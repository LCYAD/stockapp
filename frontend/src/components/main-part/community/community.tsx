import * as React from 'react';
import './community.css';

import List from '../../news/list';
//import ChartComponent from '../../chart/index';
//import Newslist from '../../news/newsList';
//import { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Icon/*, Image, Header */} from 'semantic-ui-react'
import { connect } from 'react-redux';

import { ActionFetchNews, ActionSelectInstrument, ActionFetchChartData, ActionFetchPost } from '../../../actions/newsAction';
import AddPostComponent from '../../social-network/add-post/addPostComponent';
import ViewPostComponentWrapper from '../../social-network/viewpost/viewPostComponentWrapper';

import axios from 'axios';

export const instruMatch = {"ERO":"EUR_USD", "JYN":"USD_JPY", "GBB":"GBP_USD"};

interface CommunityProps {
    fetchNews: any;
    selectInstrument: any;
    fetchChartData: any;
    fetchPost: any;
    user: any;
    post: any;
}

interface CommunityState {
    msg: any;
    visible: boolean;
}

class Community extends React.Component<CommunityProps, CommunityState> {
    post: any;

    state = { msg: [], visible: false };
    toggleVisibility = () => this.setState({ visible: !this.state.visible });

    constructor(props: any) {
        super(props);
        this.handleFetchNews = this.handleFetchNews.bind(this);
        this.handleFetchDropdown = this.handleFetchDropdown.bind(this);
        this.handleFetchPost = this.handleFetchPost.bind(this);
      }
    
    componentWillMount() {
        this.props.fetchPost(this.props.user);
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
            }); 
            console.log(response.data.values);
        }) 
        .catch((error)=> console.log(error));     
        console.log(this.state);
      }
    
    handleFetchNews(e: any) {
        console.log(e);
        this.props.fetchNews(e.target.value);
        this.props.fetchChartData(e.target.value);
        this.props.selectInstrument(e.target.value);
      }
    
    handleFetchDropdown(value: any) {
         console.log(value);
         this.props.fetchNews(value);
         this.props.fetchChartData(value);
         this.props.selectInstrument(value);
       }

    render() {
        const { visible } = this.state;
        console.log(this.props);
        console.log(this.props.post!=null);
        if (this.props.post!=null) {
          return (
              <div id="coummunity-container">
                  <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
                  <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='push' direction='top' visible={visible} inverted>
                      <Menu.Item name='home'>
                        <Icon name='home' />
                        Home
                              </Menu.Item>
                      <Menu.Item name='gamepad'>
                        <Icon name='gamepad' />
                        Games
                              </Menu.Item>
                      <Menu.Item name='camera'>
                        <Icon name='camera' />
                        Channels
                              </Menu.Item>
                    </Sidebar>

                    <Sidebar.Pusher>
                      <Segment basic>

                      <List fetchNews={this.handleFetchNews} fetchDropdown={this.handleFetchDropdown}/>
                      {/* <ChartComponent /*fetchData={}*//*fetchData={() => return this;}*/}
                      {/* <Newslist/> */}
                      <AddPostComponent user={this.props.user} fetchPost={this.handleFetchPost}/>
                      <ViewPostComponentWrapper post={this.props.post}/>
                      {/* <ViewPostComponent post={this.state}/>  */}

                      </Segment>
                    </Sidebar.Pusher>
                  </Sidebar.Pushable>
              </div>
          );
        }
        else {
          return (
            <div id="community-container">
                  
                  <AddPostComponent user={this.props.user} fetchPost={this.handleFetchPost}/>
                  <List fetchNews={this.handleFetchNews} fetchDropdown={this.handleFetchDropdown}/>
                  {/* <ChartComponent /*fetchData={}*//*fetchData={() => return this;}*/}
                  {/* <Newslist/> */}
            </div>
          );
        }
    }
} // End Community Class

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

export default connect(mapStatetoProps, mapDispatchToProps)(Community);