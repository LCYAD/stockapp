import * as React from 'react';
import './main-part.css';

import axios from 'axios';

import { connect } from 'react-redux';

// import component
import LeftPanel from './left-panel/left-panel';
import MidPanel from './mid-panel/mid-panel';

interface MainPartProps {
  history: any;
  location: any;
  match: {
    isExact: boolean;
    params: Object;
    path: string;
    url: string;
    staticContext: any;
  };
  igtoken: string;
  oandatoken: string;
  getUserSetting: Function;
  checkIGBrokerToken: Function;
  checkOandaBrokerToken: Function;
  fetchFollowing: Function;
  user?:any;
}

// import List from '../news/list';
// import ChartComponent from '../chart/index';
// import Newslist from '../news/newsList';

// import { ActionFetchNews } from '../../actions/newsAction';
import { getUserSetting, oandaTokenValidity, ActionGetFollowing } from '../../actions/userAction';

interface MainPartProps { 
  getUserSetting: Function;
}

interface MainPartState { }

class MainPart extends React.Component<MainPartProps, MainPartState> {

  constructor(props: MainPartProps) {
    super(props);
  }

  componentWillMount() {
    this.props.getUserSetting().then(()=>{
      if (this.props.igtoken) {
        this.props.checkIGBrokerToken(this.props.igtoken);
      }
      if (this.props.oandatoken) {
        this.props.checkOandaBrokerToken(this.props.oandatoken);
      }
      if (this.props.user) {
        console.log('getfollowing')
        this.props.fetchFollowing({email:this.props.user});
      }
    }); 
  }

  render() {
    console.log(this.props)
    return (
      <div id="main-part">
        <div id="left-panel">
          <LeftPanel {...this.props}/>
        </div>
        <div id="mid-panel">
          <MidPanel {...this.props} />
        </div>
      </div>
    );
  }
} // End MainPart Class

const mapStatetoProps = (state: any, props: any) => {
  //console.log(state);
  return {
    ...props,
    igtoken: state.user.igtoken,
    oandatoken: state.user.oandatoken,
    user: state.user.email,
    following: state.user.following
  };
};

const mapDispatchToProps = (dispatch: any) =>{
  return {
    fetchFollowing: (key: string) => {
      dispatch(ActionGetFollowing(key));
    },
    getUserSetting: () => {
      return dispatch(getUserSetting());
    },
    checkIGBrokerToken: (igtoken: string) => {

    },
    checkOandaBrokerToken: (oandatoken: string) => {
      let link = `https://api-fxpractice.oanda.com/v3/accounts`;
      axios.get(link, {
          headers: {'Authorization': `Bearer ${oandatoken}`}
      }).then((res)=>{
        console.log(res);
        dispatch(oandaTokenValidity(true));
      }).catch((err)=>{
        console.log(err);
        dispatch(oandaTokenValidity(false));
      });
    },
  };
}

export default connect(mapStatetoProps, mapDispatchToProps)(MainPart);