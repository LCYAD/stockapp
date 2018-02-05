import * as React from 'react';
import './chart-panel.css';

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
        This is the Chart panel
      </div>
    );
  }
} // End ChartPanel Class

export default ChartPanel;