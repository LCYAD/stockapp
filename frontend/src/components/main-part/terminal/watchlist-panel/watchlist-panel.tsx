import * as React from 'react';
import './watchlist-panel.css';

import { connect } from 'react-redux';

// import WatchlistList from './watchlist-list';
import WatchlistBlock from './watchlist-block';

// import components
import PanelMenuBar from '../panel-menu-bar/panel-menu-bar';
import WatchListContent from './watchlist-content/watchlist-content';

interface WatchListPanelProps {
  panel: string;
  watchlistInstru: string[];
}

interface WatchListPanelState { }

class WatchListPanel extends React.Component<WatchListPanelProps, WatchListPanelState> {

  constructor(props: WatchListPanelProps) {
    super(props);
    this.showBlock = this.showBlock.bind(this);
  }

  showBlock() {
    if (this.props.watchlistInstru) {
      return this.props.watchlistInstru.map((instru: any) => {
        return (
          <div key={instru}>
            <WatchlistBlock instru={instru} />
          </div>
        );
      });
    }
    else return (<div />);
  }

  render() {
    return (
      <div>
        <PanelMenuBar panel={this.props.panel} />
        <WatchListContent />
      </div>
    );
  }
}

const mapStateToProps = (state: any, props: any) => {
  // console.log(state);
  return {
    watchlistInstru: state.watchlistReducer.watchlistInstru,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchListPanel);