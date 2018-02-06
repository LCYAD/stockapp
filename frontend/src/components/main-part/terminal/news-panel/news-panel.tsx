import * as React from 'react';
import './news-panel.css';

import PanelMenuBar from '../panel-menu-bar/panel-menu-bar';

interface NewsPanelProps { 
    panel: string;
}

interface NewsPanelState { }

class NewsPanel extends React.Component<NewsPanelProps, NewsPanelState> {

  constructor(props: NewsPanelProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <PanelMenuBar panel={this.props.panel}/>
      </div>
    );
  }
} // End NewsPanel Class

export default NewsPanel;