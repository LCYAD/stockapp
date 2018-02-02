import * as React from 'react';
import './main-part.css';

import LeftPanel  from './left-panel/left-panel';
import MidPanel from './mid-panel/mid-panel';

interface MainPartProps { }

interface MainPartState { }

class MainPart extends React.Component<MainPartProps, MainPartState> {
  render() {
    return (
        <div id="main-part">
            <div id="left-panel">
              <LeftPanel/>
            </div>
            <div id="mid-panel">
              <MidPanel/>
            </div>
        </div>
    );
  }
} // End MainPart Class

export default MainPart;