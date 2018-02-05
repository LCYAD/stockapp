import * as React from 'react';
import './option-panel.css';

interface OptionPanelProps {
    panel: string;
}

interface OptionPanelState { }

class OptionPanel extends React.Component<OptionPanelProps, OptionPanelState> {

  constructor(props: OptionPanelProps) {
    super(props);
  }

  render() {
    return (
      <div id="option-container">
        <div>
            This is the options panel
        </div>
      </div>
    );
  }
} // End OptionPanel Class

export default OptionPanel;