import * as React from 'react';
import './watchlist-panel.css';

import PanelMenuBar from '../panel-menu-bar/panel-menu-bar';

interface WatchListPanelProps { 
    panel: string;
}

interface WatchListPanelState { }

class WatchListPanel extends React.Component<WatchListPanelProps, WatchListPanelState> {

  constructor(props: WatchListPanelProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <PanelMenuBar panel={this.props.panel}/>
      </div>
    );
  }
} // End WatchListPanel Class

export default WatchListPanel;