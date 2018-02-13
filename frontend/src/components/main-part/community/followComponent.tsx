import * as React from 'react';
import './community.css';

//import List from '../../news/list';
//import ChartComponent from '../../chart/index';
//import Newslist from '../../news/newsList';
//import { Component } from 'react'
// import { Sidebar, Segment, /*Button,*/ Menu, Icon/*, Image, Header */} from 'semantic-ui-react'

// import { ActionFetchNews, ActionSelectInstrument, ActionFetchChartData, ActionFetchPost } from '../../../actions/newsAction';
// import AddPostComponent from '../../social-network/add-post/addPostComponent';
// import ViewPostComponentWrapper from '../../social-network/viewpost/viewPostComponentWrapper';

import axios from 'axios';
import { connect } from 'react-redux';
import { ActionGetFollowing } from '../../../actions/userAction';
import { List, Button } from 'semantic-ui-react';
import { ActionAddFollowing } from '../../../actions/newsAction';

// class User extends React.Component<any,any> {

//     render() {
//         return (

//         )
//     }
// }
class FollowComponent extends React.Component<any,any> {

    componentWillMount() {

        // var others: any;
        axios.post("http://localhost:8080/api/showuser", {params: 'show'}).then((response:any) => {
            console.log(response);
            console.log(this.props);
            var others = response.data.filter((user:any) => {
                return user !== this.props.user.email;
            });

            this.setState({
                user: others
            });

            // var others_filtered = response.data.filter((user:any) => {
            //     return user !== this.props.user.email;
            // });



            // axios.post("http://localhost:8080/api/getfollowing", {email: this.props.user.email} ).then((response1:any)=>{
            //     //var others_following;
            //     console.log(response1.data);
            //     for (var i=1; i<response1.data.length; i++) {
            //         others = others.filter((user:any) => {
            //             return user !== response1.data[i];
            //         });
            //     }
            //         // others_following =  others.filter((following:any) => {
            //         //     return following !== response;
            //         // });
            //     console.log(others);
            //         this.setState({
            //             user: others
            //         });
                
            // }).catch((error)=> console.log(error));  




            // this.setState({msg: response.data.values}, ()=> {
            //     this.post = this.state.msg;
            //     console.log(this.state.msg)
            // }); 
            // console.log(response.data.values);
        }) 
        .catch((error)=> console.log(error));  

        console.log(this.state); 
        console.log(this.props)
    }

    addFollowing = (user: any)=> {
        console.log(user)
        console.log(this.props)
       // this.props.addFollowing({user: this.props.user.email, following: user});
    }

    render() {
        console.log('follow')
        if (this.state) {
            return (<div>
                    {this.state.user.map((object:any, i:any) => 
                      <List key={i} divided verticalAlign='middle'>
                      <List.Item>
                        <List.Content floated='right'>
                          <Button onClick={()=>this.addFollowing(object)}>Follow</Button>
                        </List.Content>
                        <List.Content>
                          {object}
                        </List.Content>
                      </List.Item>
                      </List>
                    )}
                </div>
            )
        }
        return (<div/>)

    }
}

const mapStatetoProps = (state: any) => {
    console.log(state);
    return {...state}
    // return {
    //   currentInstrument: state.currentInstrument,
    //   oandaInstrument: instruMatch[state.currentInstrument],
    //   fetchData: state.fetchData,
    //   user: state.user,
    //   post: state.newsReducer.post
    //   //.newsReducer.post.payload.data
    // }
  };

  const mapDispatchToProps = (dispatch: any) =>{
    return {
        fetchFollowing: (key: string) => {
            dispatch(ActionGetFollowing(key));
        },
        addFollowing: (key: string) => {
            dispatch(ActionAddFollowing(key));
        },
    //   fetchPost: (key: string) => {
    //     console.log('run fetch post')
    //     dispatch(ActionFetchPost(key));
    //   }
    };
  }

export default connect(mapStatetoProps, mapDispatchToProps)(FollowComponent);