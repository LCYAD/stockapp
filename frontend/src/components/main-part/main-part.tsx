import * as React from 'react';
import './main-part.css';

interface MainPartProps { }

interface MainPartState { }

class MainPart extends React.Component<MainPartProps, MainPartState> {
  render() {
    return (
        <div id="main-part">
            <div id="left-panel">
              This is the left panel
            </div>
            <div id="center-panel">
              This is the middle panel
            </div>
            <div id="right-panel">
              This is the right panel
            </div>
        </div>
    );
  }
} // End MainPart Class

export default MainPart;