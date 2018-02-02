import * as React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './top-bar.css';

import { removeToken } from '../../actions/userAction';
import { successMsg, hideMsg } from '../../actions/notificationAction';

import Notification  from './notification/notification';

interface TopBarProps {
  removeToken: Function;
  isLoggedIn: boolean;
  sendSuccessMsg: Function;
}

interface TopBarState {}

class TopBar extends React.Component<TopBarProps, TopBarState> {

  constructor(props: any) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    this.props.removeToken();
    this.props.sendSuccessMsg('Log Out Successful!', 'See you again!');
  }

  render() {
    console.log(this.props.isLoggedIn);

    const logoutBtn = () => {
      if (this.props.isLoggedIn) {
        return (
          <div id="login-group">
            <Button
              animated={true}
              inverted={true}
              onClick={this.logOut}
              size="tiny"
              floated="right"
            >
              <Button.Content
                visible={true}
              >
                <Icon
                    name="log out"
                />
              </Button.Content>
              <Button.Content
                hidden={true}
              >
                  Log Out
              </Button.Content>
            </Button>
          </div>
        );
      } else {
        return <div />;
      }
    };

    return (
      <div id="top-part">
        <div id="nav-title">
          Trader <sup>Den</sup>
        </div>
        <div/>
        <Notification/>
        <div/>
        {logoutBtn()}
      </div>

    );
  }
} // End TopBar Class

const mapStatetoProps = (state: any) => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeToken: () => {
      dispatch(removeToken());
    },
    sendSuccessMsg: (title: string, message: string) => {
      dispatch(successMsg(title, message));
      setTimeout(() => { dispatch(hideMsg()); }, 3000);
    }
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(TopBar);
