import * as React from 'react';
import './news-panel.css';
import News from './news';
import { connect } from 'react-redux'; 

import PanelMenuBar from '../panel-menu-bar/panel-menu-bar';
import { ActionFetchNews } from '../../../../actions/newsAction';

interface NewsPanelProps { 
    panel: string;
    newslist: any;
    fetchNews: any;
}

interface NewsPanelState { }

class NewsPanel extends React.Component<NewsPanelProps, NewsPanelState> {

  constructor(props: NewsPanelProps) {
    super(props);
  } 

  componentWillMount() {
    this.props.fetchNews("ERO");
  }

  newsShow() {
        console.log(this.props);
        if (this.props.newslist.newslist) {
            return this.props.newslist.newslist.map((news: any) => {
                return (
                    <div key={news.url}>
                        <News title={news.title} url={news.url} description={news.description}/>
                    </div>
                );
            });
        }
        else return <div/>;
  }

  render() {
    console.log(this.props);
    if (this.props.newslist.newslist.length == 0) {
			return (
                <div>NEWS: Waiting for the instrument selection...
                    <div>
                        <PanelMenuBar panel={this.props.panel} />
                    </div>
                </div>
    )}

    return (
        <div id="news-panel-box">
          <div style = {{zIndex: 99, position: 'relative'}}>
            <PanelMenuBar panel={this.props.panel}/>
          </div>
          { this.newsShow() }
        </div>
    );
  }
}

const mapStatetoProps = (state: any) => {
    console.log(state)
    return {
      newslist: state.newsReducer
    };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
      fetchNews: (instru: string) => {
          dispatch(ActionFetchNews(instru));
      },
  };
};


export default connect(mapStatetoProps, mapDispatchToProps)(NewsPanel);