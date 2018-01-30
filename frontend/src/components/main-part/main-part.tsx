import * as React from 'react';
import './main-part.css';

interface MainPartProps { }

interface MainPartState { }

class MainPart extends React.Component<MainPartProps, MainPartState> {
  render() {
    return (
        <div id="main-part">
            This is the main part
        </div>
    );
  }
} // End MainPart Class

export default MainPart;