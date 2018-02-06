import * as React from 'react';
import './left-panel.css';

import { Button, Icon, Divider } from 'semantic-ui-react';

import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

// import actions
import { hideLeftPanel, hideRightPanel, showLeftPanel, showRightPanel } from '../../../actions/panelToggleAction';

interface LeftPanelProps {
    leftShow: boolean;
    rightShow: boolean;
    hideLeftPanel: Function;
    hideRightPanel: Function;
    showLeftPanel: Function;
    showRightPanel: Function;
}

interface LeftPanelState { }

class LeftPanel extends React.Component<LeftPanelProps, LeftPanelState> {
    constructor(props: any) {
        super(props);
        this.movetoTerminal = this.movetoTerminal.bind(this);
        this.movetoFundamental = this.movetoFundamental.bind(this);
        this.movetoCommunity = this.movetoCommunity.bind(this);
        this.toggleLeftPanel = this.toggleLeftPanel.bind(this);
        this.toggleRightPanel = this.toggleRightPanel.bind(this);
    }

    movetoTerminal() {
        console.log('Loading Terminal');
    }

    movetoFundamental() {
        console.log('Loading Fundamental');
    }

    movetoCommunity() {
        console.log('Loading Community');
    }

    toggleLeftPanel() {
        if (this.props.leftShow) {
            this.props.hideLeftPanel();
        } else {
            this.props.showLeftPanel();
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
                    <NavLink
                        to="/main/terminal"
                        style={{ textDecoration: 'none' }}
                    >
                    <div className="left-link-btn">
                        
                        <Button
                            animated={true}
                            inverted={true}
                            onClick={this.movetoTerminal}
                            size="large"
                        >
                            <Button.Content
                                visible={true}
                            >
                                <Icon
                                    name="terminal"
                                />
                            </Button.Content>
                            <Button.Content
                                hidden={true}
                                className="panel-link-tag"
                            >
                                Terminal
                            </Button.Content>
                        </Button>
                    </div>
                    </NavLink>
                    <NavLink
                        to="/main/fundamental"
                        style={{ textDecoration: 'none' }}
                    >
                    <div className="left-link-btn">
                        <Button
                            animated={true}
                            inverted={true}
                            onClick={this.movetoFundamental}
                            size="large"
                        >
                            <Button.Content
                                visible={true}
                            >
                                <Icon
                                    name="table"
                                />
                            </Button.Content>
                            <Button.Content
                                hidden={true}
                                className="panel-link-tag"
                            >
                                Fundamental
                            </Button.Content>
                        </Button>
                    </div>
                    </NavLink>
                    <NavLink
                        to="/main/community"
                        style={{ textDecoration: 'none' }}
                    >
                    <div className="left-link-btn">
                        <Button
                            animated={true}
                            inverted={true}
                            onClick={this.movetoCommunity}
                            size="large"
                        >
                            <Button.Content
                                visible={true}
                            >
                                <Icon
                                    name="world"
                                />
                            </Button.Content>
                            <Button.Content
                                hidden={true}
                                className="panel-link-tag"
                            >
                                Community
                            </Button.Content>
                        </Button>
                    </div>
                    </NavLink>
                </div>
                <div>
                    <Divider 
                        inverted={true}
                    />
                    <div className="left-link-btn">
                        <Button
                            animated={true}
                            inverted={true}
                            onClick={this.toggleLeftPanel}
                            size="large"
                        >
                            <Button.Content
                                visible={true}
                            >
                                <Icon
                                    name="envira gallery"
                                />
                            </Button.Content>
                            <Button.Content
                                hidden={true}
                                className="panel-link-tag"
                            >
                                Temp Button Left
                            </Button.Content>
                        </Button>
                    </div>
                </div>

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
                </div>
            </div>
        );
    }
} // End LeftPanel Class

const mapStateToProps = (state: any) => {
    return {
        leftShow: state.panelToggle.leftShow,
        rightShow: state.panelToggle.rightShow
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        hideLeftPanel: () => {
            dispatch(hideLeftPanel());
        },
        hideRightPanel: () => {
            dispatch(hideRightPanel());
        },
        showLeftPanel: () => {
            dispatch(showLeftPanel());
        },
        showRightPanel: () => {
            dispatch(showRightPanel());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);