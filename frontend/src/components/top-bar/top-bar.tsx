import * as React from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './top-bar.css';

import { removeToken } from '../../actions/userAction';

import Notification  from './notification/notification';

interface TopBarProps {
  removeToken: Function;
  isLoggedIn: boolean;
}

interface TopBarState {}

class TopBar extends React.Component<TopBarProps, TopBarState> {

  constructor(props: any) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    this.props.removeToken();
  }

  render() {
    console.log(this.props.isLoggedIn);

    const logoutBtn = () => {
      if (this.props.isLoggedIn) {
        return (
          <div id="login-group">
          <Button 
            basic={true}
            className="nav-btn" 
            onClick={this.logOut}
            content="Log Out"
            color="black"
          />
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
        <Notification/>
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
    }
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(TopBar);
