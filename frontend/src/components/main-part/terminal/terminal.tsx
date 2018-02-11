import * as React from 'react';
import './terminal.css';

import { connect } from 'react-redux';

// import split pane
var SplitPane = require('react-split-pane');

// import component
import LoadUtil from './load-util/load-util';

interface TerminalProps { 
    oandatoken: string;
    oandavalid: boolean;
}

interface TerminalState { }

class Terminal extends React.Component<TerminalProps, TerminalState> {

    render() {
        if (this.props.oandatoken && this.props.oandavalid) {
            return (
                <div className="terminal-container">
                    <SplitPane
                        split="vertical"
                        minSize={400}
                        maxSize={800}
                        defaultSize={600}
                    >
                        <SplitPane
                            split="horizontal"
                            minSize={200}
                            maxSize={400}
                            defaultSize={300}
                        >
                            <LoadUtil panel="1" />
                            <LoadUtil panel="2" />
                        </SplitPane>
                        <LoadUtil panel="3" />
                    </SplitPane>
                </div>
            );            
        } else if (this.props.oandatoken) {
            return (
                <div className="terminal-container not-available">
                    Please provide a valid Oanda API key 
                </div>
            );
        } else {
            return (
                <div className="terminal-container not-available">
                    Please add your API key in User Setting
                </div>
            );
        }
    }
} // End Terminal Class

const mapStatetoProps = (state: any, props: any) => {
    return {
      ...props,
      oandatoken: state.user.oandatoken,
      oandavalid: state.user.oandavalid
    };
  };
  
  const mapDispatchToProps = (dispatch: any) =>{
    return { };
  }

export default connect(mapStatetoProps, mapDispatchToProps)(Terminal);