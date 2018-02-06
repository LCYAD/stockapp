import * as React from 'react';
import './terminal.css';

// import split pane
var SplitPane = require('react-split-pane');

// import component
import LoadUtil from './load-util/load-util';

interface TerminalProps { }

interface TerminalState { }

class Terminal extends React.Component<TerminalProps, TerminalState> {

    render() {
        return (
            <div id="terminal-container">
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
    }
} // End Terminal Class

export default Terminal;