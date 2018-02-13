import * as React from 'react';
import './user-account-panel.css';

import { connect } from 'react-redux';

import { Tab } from 'semantic-ui-react';

// import components
import BrokersPane from './brokers-pane/brokers-pane';
import UserSettingPane from './user-setting-pane/user-setting-pane';

interface UserAccountPanelProps { 
    paneLoading1: boolean;
    paneLoading2: boolean;
    paneLoading3: boolean;
}

interface UserAccountPanelState { 
}

class UserAccountPanel extends React.Component<UserAccountPanelProps, UserAccountPanelState> {

    constructor(props:any) {
        super(props);
    }

    render() {
        let panes = [
            { menuItem: 'Setting', 
                render: () => (
                    <Tab.Pane 
                        attached={false} 
                        className="user-account-tab-pane"
                    >
                        <UserSettingPane />
                    </Tab.Pane>) },
            { menuItem: 'Brokers', 
                render: () => (
                    <Tab.Pane 
                        attached={false}
                        loading={this.props.paneLoading2}
                        className="user-account-tab-pane"
                    >
                        <BrokersPane/>
                    </Tab.Pane>) },
            // { menuItem: 'Consolidated Pos.', 
            //     render: () => 
            //         <Tab.Pane 
            //             attached={false}
            //             className="user-account-tab-pane"
            //         >
            //             Tab 3 Content
            //         </Tab.Pane> },
        ];
        return (
            <div id="terminal-account-panel-container">
                <Tab
                    menu={{ pointing: true }}
                    panes={panes}
                    defaultActiveIndex={0}
                />
            </div>
        );
    }
} // End UserAccountPanel Class

const mapStatetoProps = (state: any, props: any) => {
    return {
        ...props,
        paneLoading1: state.userAccountBrokerPane.panelLoading1,
        paneLoading2: state.userAccountBrokerPane.panelLoading2,
        paneLoading3: state.userAccountBrokerPane.panelLoading3,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(UserAccountPanel);