import * as React from 'react';
import './terminal-link-btn.css';

import { Button, Icon } from 'semantic-ui-react';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

// import action
import { hideLeftPanel, changeCenterDimmed } from '../../../../actions/panelToggleAction';

interface TerminalLinkBtnProps { 
    hideLeftPanel: Function;
}

interface TerminalLinkBtnState {
    fireRedirect: boolean;
}

class TerminalLinkBtn extends React.Component<TerminalLinkBtnProps, TerminalLinkBtnState> {

    constructor(props: any) {
        super(props);        
        this.handleSwitch = this.handleSwitch.bind(this);
    }

    componentWillMount() {
        this.setState({ fireRedirect: false });
    }

    handleSwitch() {
        this.props.hideLeftPanel();
        this.setState({ fireRedirect: true });
    }

    render() {
        let { fireRedirect } = this.state;
        return (
            <div className="left-link-btn">
                <Button
                    animated={true}
                    inverted={true}
                    size="large"
                    onClick={this.handleSwitch}
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
                {fireRedirect && (
                    <Redirect to="/main/terminal" />
                )}
            </div>
        );
    }
} // End TerminalLinkBtn Class

const mapStateToProps = (state: any) => {
    return { };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        hideLeftPanel: () => {
            dispatch(hideLeftPanel());
            dispatch(changeCenterDimmed(false));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TerminalLinkBtn);