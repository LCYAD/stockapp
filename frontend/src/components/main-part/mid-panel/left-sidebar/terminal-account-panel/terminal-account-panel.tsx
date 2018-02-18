import * as React from 'react';
import './terminal-account-panel.css';

import { Tab } from 'semantic-ui-react';

import { connect } from 'react-redux';

// import components
import TerminalAccountsDetail from './terminal-accounts-detail/terminal-accounts-detail';
import TerminalPositions from './terminal-positions/terminal-positions';
import BuySell  from './buy-sell/buy-sell';


interface TerminalAccountPanelProps { 
    TAccountPane1: boolean;
    TAccountPane2: boolean;
    TAccountPane3: boolean;
}

interface TerminalAccountPanelState { }

class TerminalAccountPanel extends React.Component<TerminalAccountPanelProps, TerminalAccountPanelState> {

    render() {
        let panes = [
            { menuItem: 'Account Summary', 
                render: () => (
                    <Tab.Pane 
                        attached={false}
                        className="terminal-account-tab-pane"
                        loading={this.props.TAccountPane1}
                    >
                        <TerminalAccountsDetail />
                    </Tab.Pane>
                    )},
            { menuItem: 'Position & Trade', 
                render: () => (
                    <Tab.Pane 
                        attached={false}
                        className="terminal-account-tab-pane"
                        loading={this.props.TAccountPane2}
                    >
                        <TerminalPositions />
                    </Tab.Pane>
                    )},
            { menuItem: 'Buy & Sell', 
                    render: () => (
                        <Tab.Pane 
                            attached={false}
                            className="terminal-account-tab-pane"
                            loading={this.props.TAccountPane3}
                        >
                            <BuySell />
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


const mapStatetoProps = (state: any, props: any) => {
    return {
        ...props,
        TAccountPane1: state.panelToggle.TAccountPane1,
        TAccountPane2: state.panelToggle.TAccountPane2,
        TAccountPane3: state.panelToggle.TAccountPane3,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(TerminalAccountPanel);