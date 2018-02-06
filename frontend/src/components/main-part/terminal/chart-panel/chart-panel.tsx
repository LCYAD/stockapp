import * as React from 'react';
import './chart-panel.css';

import PanelMenuBar from '../panel-menu-bar/panel-menu-bar';

interface ChartPanelProps { 
    panel: string;
}

interface ChartPanelState { }

class ChartPanel extends React.Component<ChartPanelProps, ChartPanelState> {

  constructor(props: ChartPanelProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <PanelMenuBar panel={this.props.panel}/>
      </div>
    );
  }
} // End ChartPanel Class

export default ChartPanel;