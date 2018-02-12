import * as React from 'react';
import './left-panel.css';

import { Button, Icon, Divider } from 'semantic-ui-react';

import { Switch, Route } from 'react-router-dom';

import { connect } from 'react-redux';

// import actions
import  {   hideLeftPanel, hideRightPanel, showLeftPanel, 
            showRightPanel, loadLeftPanelClass, loadLeftPanelType,
            changeCenterDimmed
         } from '../../../actions/panelToggleAction';

// import components
import TerminalLinkBtn from './terminal-link-btn/terminal-link-btn';
import FundamentalLinkBtn from './fundamental-link-btn/fundamnetal-link-btn';
import CommunityLinkBtn from './community-link-btn/community-link-btn';

interface LeftPanelProps {
    leftShow: boolean;
    rightShow: boolean;
    leftLoadType: string;
    hideLeftPanel: Function;
    hideRightPanel: Function;
    showLeftPanel: Function;
    showRightPanel: Function;
    loadTerminalAccount: Function;
    loadUserAccount: Function;
    loadTerminalBuySell: Function;
    oandatoken: string;
    oandavalid: boolean;
    match: any;
}

interface LeftPanelState { }

class LeftPanel extends React.Component<LeftPanelProps, LeftPanelState> {
    constructor(props: any) {
        super(props);
        this.toggleUserAccountPanel = this.toggleUserAccountPanel.bind(this);
        this.toggleTerminalAccountPanel = this.toggleTerminalAccountPanel.bind(this);
        this.toggleTerminalBuySellPanel = this.toggleTerminalBuySellPanel.bind(this);
        this.toggleRightPanel = this.toggleRightPanel.bind(this);
        this.loadTerminalLinkBtn = this.loadTerminalLinkBtn.bind(this);
        this.loadFundamentalLinkBtn = this.loadFundamentalLinkBtn.bind(this);
        this.loadCommunityLinkBtn = this.loadCommunityLinkBtn.bind(this);
        this.loadTerminalBtns = this.loadTerminalBtns.bind(this);
    }

    loadTerminalLinkBtn() {
        return (
            <div>
                <FundamentalLinkBtn />
                <CommunityLinkBtn />
            </div>
        );
    }

    loadFundamentalLinkBtn() {
        return (
            <div>
                <TerminalLinkBtn />
                <CommunityLinkBtn />
            </div>
        );
    }

    loadCommunityLinkBtn() {
        return (
            <div>
                <TerminalLinkBtn />
                <FundamentalLinkBtn />
            </div>
        );
    }

    loadTerminalBtns(){
        if (this.props.oandatoken && this.props.oandavalid){
            return (
                <div className="left-link-btn">
                    <Button
                        animated={true}
                        inverted={true}
                        onClick={this.toggleTerminalAccountPanel}
                        size="large"
                    >
                        <Button.Content
                            visible={true}
                        >
                            <Icon
                                name="user circle outline"
                            />
                        </Button.Content>
                        <Button.Content
                            hidden={true}
                            className="panel-link-tag"
                        >
                            Account
                        </Button.Content>
                    </Button>
                </div>
            );
        } else {
            return (
                <div/>
            );
        }
    }

    toggleTerminalAccountPanel() {
        // check if the panel is already loaded or not
        if (this.props.leftLoadType === 'terminal-account') {
            if (this.props.leftShow) {
                this.props.hideLeftPanel();
            } else {
                this.props.showLeftPanel();
            }
        } else {
            if (this.props.leftShow) {
                this.props.hideLeftPanel();
                setTimeout(this.props.loadTerminalAccount, 500);
                setTimeout(this.props.showLeftPanel, 600);
            } else {
                this.props.loadTerminalAccount();
                this.props.showLeftPanel();
            }
        }
    }

    toggleTerminalBuySellPanel() {
        // check if the panel is already loaded or not
        if (this.props.leftLoadType === 'terminal-buysell') {
            if (this.props.leftShow) {
                this.props.hideLeftPanel();
            } else {
                this.props.showLeftPanel();
            }
        } else {
            if (this.props.leftShow) {
                this.props.hideLeftPanel();
                setTimeout(this.props.loadTerminalBuySell,500);
                setTimeout(this.props.showLeftPanel, 600);
            } else {
                this.props.loadTerminalBuySell();
                this.props.showLeftPanel();
            }
        }
    }

    toggleUserAccountPanel() {
        // check if the panel is already loaded or not
        if (this.props.leftLoadType === 'user-account') {
            if (this.props.leftShow) {
                this.props.hideLeftPanel();
            } else {
                this.props.showLeftPanel();
            }
        } else {
            if (this.props.leftShow) {
                this.props.hideLeftPanel();
                setTimeout(this.props.loadUserAccount, 500);
                setTimeout(this.props.showLeftPanel, 600);
            } else {
                this.props.loadUserAccount();
                this.props.showLeftPanel();
            }

        }
    }

    toggleRightPanel() {
        if (this.props.rightShow) {
            this.props.hideRightPanel();
        } else {
            this.props.showRightPanel();
        }
    }

    render() {
        return (
            <div id="panel-grid">
                <div>
                    <Switch>
                        <Route
                            exact={true}
                            path={`${this.props.match.path}/`}
                            render={()=> (
                                this.loadCommunityLinkBtn()
                            )}
                        />
                        <Route
                            path={`${this.props.match.path}/terminal`}
                            render={()=> (
                                this.loadTerminalLinkBtn()
                            )}
                        />
                        <Route
                            path={`${this.props.match.path}/fundamental`}
                            render={()=> (
                                this.loadFundamentalLinkBtn()
                            )}
                        />
                        <Route
                            path={`${this.props.match.path}/community`}
                            render={()=> (
                                this.loadCommunityLinkBtn()
                            )}
                        />
                    </Switch>
                </div>

                {/* Different button for different routes */}
                <div>
                    <Divider 
                        inverted={true}
                    />
                    <Switch>
                        <Route
                            exact={true}
                            path={`${this.props.match.path}/`}
                            render={()=> (
                                <div/>
                            )}
                        />
                        <Route
                            path={`${this.props.match.path}/terminal`}
                            render={()=> (
                                this.loadTerminalBtns()
                            )}
                        />
                        <Route
                            path={`${this.props.match.path}/fundamental`}
                            render={()=> (
                                <div/>
                            )}
                        />
                        <Route
                            path={`${this.props.match.path}/community`}
                            render={()=> (
                                <div/>
                            )}
                        />
                    </Switch>
                </div>

                {/* Button for message & Account panel - always on */}
                <div id="left-message-panel">
                    <Divider 
                        inverted={true} 
                    />
                    <div className="left-link-btn">
                        <Button
                            animated={true}
                            inverted={true}
                            onClick={this.toggleRightPanel}
                            size="large"
                        >
                            <Button.Content
                                visible={true}
                            >
                                <Icon
                                    name="talk outline"
                                />
                            </Button.Content>
                            <Button.Content
                                hidden={true}
                                className="panel-link-tag"
                            >
                                Message
                            </Button.Content>
                        </Button>
                    </div>
                    <div className="left-link-btn">
                        <Button
                            animated={true}
                            inverted={true}
                            onClick={this.toggleUserAccountPanel}
                            size="large"
                        >
                            <Button.Content
                                visible={true}
                            >
                                <Icon
                                    name="user"
                                />
                            </Button.Content>
                            <Button.Content
                                hidden={true}
                                className="panel-link-tag"
                            >
                                User
                            </Button.Content>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
} // End LeftPanel Class

const mapStateToProps = (state: any) => {
    return {
        leftShow: state.panelToggle.leftShow,
        rightShow: state.panelToggle.rightShow,
        leftLoadType: state.panelToggle.leftLoadType,
        oandatoken: state.user.oandatoken,
        oandavalid: state.user.oandavalid,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        hideLeftPanel: () => {
            dispatch(hideLeftPanel());
            dispatch(changeCenterDimmed(false));
        },
        hideRightPanel: () => {
            dispatch(hideRightPanel());
        },
        showLeftPanel: () => {
            dispatch(showLeftPanel());
            dispatch(changeCenterDimmed(true));
        },
        showRightPanel: () => {
            dispatch(showRightPanel());
        },
        loadTerminalAccount: () => {
            dispatch(loadLeftPanelType('terminal-account'))
            dispatch(loadLeftPanelClass('main-leftsidebar2'))
        },
        loadUserAccount: () => {
            dispatch(loadLeftPanelType('user-account'))
            dispatch(loadLeftPanelClass('main-leftsidebar1'))
        },
        loadTerminalBuySell: () => {
            dispatch(loadLeftPanelType('terminal-buysell'))
            dispatch(loadLeftPanelClass('main-leftsidebar1'))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);