import * as React from 'react';
import './mid-panel.css';

import { Sidebar, Segment } from 'semantic-ui-react';

import { connect } from 'react-redux';

import { Route, Switch } from 'react-router-dom';

// import components
import Terminal from '../terminal/terminal';
import Community from '../community/community';
import Fundamental from '../fundamental/fundamental';
import LeftSidebar from './left-sidebar/left-sidebar';

interface MidPanelProps {
  leftShow: boolean;
  rightShow: boolean;
  leftLoadClass: string;
  centerDimmed: boolean;
  history: any;
  location: any;
  match: {
    isExact: boolean;
    params: Object;
    path: string;
    url: string;
    staticContext: any;
  };
}

interface MidPanelState {
  visible: boolean;
  rightvisible: boolean;
}

class MidPanel extends React.Component<MidPanelProps, MidPanelState> {

  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      rightvisible: false,
    };
  }

  render() {
    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            animation="overlay"
            visible={this.props.leftShow}
            icon="labeled"
            vertical="true"
            inverted="true"
            className={this.props.leftLoadClass}
          >
            <LeftSidebar/>
          </Sidebar>
          <Sidebar
            animation="overlay"
            direction="right"
            visible={this.props.rightShow}
            icon="labeled"
            vertical="true"
            inverted="true"
            className="main-rightsidebar"
          >
            Right Sidebar
          </Sidebar>
          <Sidebar.Pusher
            dimmed={this.props.centerDimmed}
          >
            <Switch>
              <Route
                exact={true}
                path={`${this.props.match.path}/`}
                component={Community}
              />
              <Route
                path={`${this.props.match.path}/terminal`}
                component={Terminal}
              />
              <Route
                path={`${this.props.match.path}/fundamental`}
                component={Fundamental}
              />
              <Route
                path={`${this.props.match.path}/community`}
                component={Community}
              />
            </Switch>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
} // End MidPanel Class

const mapStateToProps = (state: any) => {
  return {
    leftShow: state.panelToggle.leftShow,
    rightShow: state.panelToggle.rightShow,
    leftLoadClass: state.panelToggle.leftLoadClass,
    centerDimmed: state.panelToggle.centerDimmed,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MidPanel);