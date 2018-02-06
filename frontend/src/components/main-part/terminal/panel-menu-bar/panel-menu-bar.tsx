import * as React from 'react';
import './panel-menu-bar.css';

import { Button } from 'semantic-ui-react';

import { connect } from 'react-redux';

// import actions
import { closeComponent } from '../../../../actions/TpanelSettingAction';

interface PanelMenuBarProps {
    closeComponent: Function;
    panel: number;
}

interface PanelMenuBarState { }

class PanelMenuBar extends React.Component<PanelMenuBarProps, PanelMenuBarState> {

    constructor(props: PanelMenuBarProps) {
        super(props);
        this.handleCloseComponent = this.handleCloseComponent.bind(this);        
    }

    handleCloseComponent() {
        let response = confirm("Are you sure?");
        if (response){
            this.props.closeComponent(this.props.panel);
        }
    }

    render() {
        return (
            <div className="panel-menu-bar">
                <Button.Group
                    basic={true}
                    size="mini"
                >
                    <Button
                        icon="window close"
                        onClick={this.handleCloseComponent}
                    />
                </Button.Group>
            </div>
        );
    }
} // End PanelMenuBar Class

const mapStatetoProps = (state: any, props: any) => {
    return {
        ...props
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        closeComponent: (panelnum: number) => {
            dispatch(closeComponent(panelnum));
        },
        //   sendSuccessMsg: (title: string, message: string) => {
        //     dispatch(successMsg(title, message));
        //     setTimeout(() => { dispatch(hideMsg()); }, 3000);
        //   }
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(PanelMenuBar);