import * as React from 'react';
import './mid-panel.css';

import { Sidebar, Segment } from 'semantic-ui-react';

import { connect } from 'react-redux';

import { Route, Switch } from 'react-router-dom';

// import components
import Terminal from '../terminal/terminal';
import Community from '../community/community';
import Fundamental from '../fundamental/fundamental';

interface MidPanelProps {
  leftShow: boolean;
  rightShow: boolean;
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
    let width: 'very thin' | 'thin' | 'wide' | 'very wide' = 'thin';
    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            animation="overlay"
            width={width}
            visible={this.props.leftShow}
            icon="labeled"
            vertical="true"
            inverted="true"
            className="main-sidebar"
          >
            Left Sidebar
          </Sidebar>
          <Sidebar
            animation="overlay"
            width="wide"
            direction="right"
            visible={this.props.rightShow}
            icon="labeled"
            vertical="true"
            inverted="true"
            className="main-rightsidebar"
          >
            Right Sidebar
          </Sidebar>
          <Sidebar.Pusher>
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
    rightShow: state.panelToggle.rightShow
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MidPanel);