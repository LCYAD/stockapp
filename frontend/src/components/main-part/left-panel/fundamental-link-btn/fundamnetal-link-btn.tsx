import * as React from 'react';
import './fundamental-link-btn.css';

import { Button, Icon } from 'semantic-ui-react';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

// import action
import { hideLeftPanel, changeCenterDimmed } from '../../../../actions/panelToggleAction';

interface FundamentalLinkBtnProps { 
    hideLeftPanel: Function;
}

interface FundamentalLinkBtnState {
    fireRedirect: boolean;
}

class FundamentalLinkBtn extends React.Component<FundamentalLinkBtnProps, FundamentalLinkBtnState> {

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
                {fireRedirect && (
                    <Redirect to="/main/fundamental" />
                )}
            </div>
        );
    }
} // End FundamentalLinkBtn Class

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

export default connect(mapStateToProps, mapDispatchToProps)(FundamentalLinkBtn);