import * as React from 'react';
import './left-sidebar.css';

import { connect } from 'react-redux';

// import component
import UserAccountPanel from './user-account-panel/user-account-panel';
import TerminalAccountPanel from './terminal-account-panel/terminal-account-panel';

interface LeftSidebarProps {
    leftLoadType: string;
}

interface LeftSidebarState { }

class LeftSidebar extends React.Component<LeftSidebarProps, LeftSidebarState> {

    constructor(props: LeftSidebarProps) {
        super(props);
        this.loadLeftPanel = this.loadLeftPanel.bind(this);
    }

    loadLeftPanel() {
        // console.log(this.props.leftLoadType);
        if (this.props.leftLoadType === 'terminal-account') {
            return (
                <TerminalAccountPanel />
            );

        } else if (this.props.leftLoadType === 'user-account'){
            return (
                <UserAccountPanel />
            );
        } else {
            return (
                <div/>
            );
        }
    }

    render() {
        return (
            <div className="left-sidebar-box">
                {this.loadLeftPanel()}
            </div>
        );
    }
} // End LeftSidebar Class

const mapStatetoProps = (state: any, props: any) => {
    return {
        ...props,
        leftLoadType: state.panelToggle.leftLoadType,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {};
};

export default connect(mapStatetoProps, mapDispatchToProps)(LeftSidebar);