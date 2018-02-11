import * as React from 'react';
import './terminal-account-panel.css';

import { Tab } from 'semantic-ui-react';

interface TerminalAccountPanelProps { }

interface TerminalAccountPanelState { }

class TerminalAccountPanel extends React.Component<TerminalAccountPanelProps, TerminalAccountPanelState> {

    render() {
        let panes = [
            { menuItem: 'Account Summary', 
                render: () => (
                    <Tab.Pane 
                        attached={false}
                        className="terminal-account-tab-pane"
                    >
                        Tab 1 Content
                    </Tab.Pane>
                    )},
            { menuItem: 'Position & Trade', 
                render: () => (
                    <Tab.Pane 
                        attached={false}
                        className="terminal-account-tab-pane"
                    >
                        Tab 2 Content
                    </Tab.Pane>
                    )},
        ];
        return (
            <div id="terminal-account-panel-container">
                <Tab
                    menu={{ secondary: true, pointing: true }}
                    panes={panes}
                    defaultActiveIndex={0}
                />
            </div>
        );
    }
} // End TerminalAccountPanel Class

export default TerminalAccountPanel;