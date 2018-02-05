import * as React from 'react';
import './main-part.css';

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
}

// import List from '../news/list';
// import ChartComponent from '../chart/index';
// import Newslist from '../news/newsList';

import { ActionFetchNews } from '../../actions/newsAction';

interface MainPartProps { 
  fetchNews: any;
}

interface MainPartState { }

class MainPart extends React.Component<MainPartProps, MainPartState> {

  constructor(props: MainPartProps) {
    super(props);
  }

  render() {
    return (
      <div id="main-part">
        <div id="left-panel">
          <LeftPanel />
        </div>
        <div id="mid-panel">
          <MidPanel {...this.props} />
        </div>
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