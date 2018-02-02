import * as React from 'react';
import './mid-panel.css';

import { Sidebar, Segment } from 'semantic-ui-react';

import { connect } from 'react-redux';

interface MidPanelProps {
  leftShow: boolean;
  rightShow: boolean;
}

interface MidPanelState { }

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
            <Segment
            >
             abc
            </Segment>
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