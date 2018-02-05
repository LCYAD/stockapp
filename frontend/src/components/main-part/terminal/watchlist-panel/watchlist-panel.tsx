import * as React from 'react';
import './watchlist-panel.css';

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
        This is the watch list panel
      </div>
    );
  }
} // End WatchListPanel Class

export default WatchListPanel;