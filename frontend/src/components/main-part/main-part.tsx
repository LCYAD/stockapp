import * as React from 'react';
import './main-part.css';

import List from '../news/list';
import ChartComponent from '../chart/index';
import Newslist from '../news/newsList';
import { connect } from 'react-redux';

import { ActionFetchNews } from '../../actions/newsAction';

interface MainPartProps { 
  fetchNews: any;
}

interface MainPartState { }

class MainPart extends React.Component<MainPartProps, MainPartState> {
  constructor(props: any) {
    super(props);
    this.handleFetchNews = this.handleFetchNews.bind(this);
  }

  handleFetchNews(e: any) {
    this.props.fetchNews(e.target.value);
    // this.setState({ value: e.target.value });
    // console.log(e.target.value);
  }
  
  render() {
    return (
        <div id="main-part">
            This is the main part
            <List fetchNews={this.handleFetchNews}/>
            <ChartComponent/>
            <Newslist/>
        </div>
    );
  }
} // End MainPart Class

const mapStatetoProps = (state: any) => {
  return {
  };
};

const mapDispatchToProps = (dispatch: any) =>{
  return {
    fetchNews: (key: string) => {
      dispatch(ActionFetchNews(key));
    }
  };
}

export default connect(mapStatetoProps, mapDispatchToProps)(MainPart);