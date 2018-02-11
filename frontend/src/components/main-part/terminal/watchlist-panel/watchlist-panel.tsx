import * as React from 'react';
import './watchlist-panel.css';

interface WatchListPanelProps { 
    panel: string;
    watchlistInstru: string[];
}

interface WatchListPanelState {

 }

import WatchlistList from './watchlist-list';
import { connect } from 'react-redux';
import WatchlistBlock from './watchlist-block';

class WatchListPanel extends React.Component<WatchListPanelProps, WatchListPanelState> {

  showBlock = () => {
      if (this.props.watchlistInstru) {
        console.log(this.props)
              return this.props.watchlistInstru.map((instru: any) => {
                  return (
                      <div key={instru}>
                          <WatchlistBlock instru={instru}/>
                      </div>
                  );
                  });
          }
          else return (<div/>);
  }

  constructor(props: WatchListPanelProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <WatchlistList panel={this.props.panel}/>
          {this.showBlock()}
      </div>
    );
  }
}

const mapStateToProps = (state: any, props: any) => {
  console.log(state);
  return {
      watchlistInstru: state.watchlistReducer.watchlistInstru,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchListPanel);