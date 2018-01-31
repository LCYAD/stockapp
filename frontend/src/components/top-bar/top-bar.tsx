import * as React from 'react';
import { Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './top-bar.css';

import { removeToken } from '../../actions/userAction';

interface TopBarProps {
  removeToken: Function;
  isLoggedIn: boolean;
}

interface TopBarState {
  fireRedirect: boolean;
}

class TopBar extends React.Component<TopBarProps, TopBarState> {

  constructor(props: any) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      fireRedirect: false
    };
  }

  logOut() {
    this.props.removeToken();
    this.setState({ fireRedirect: true });
  }

  render() {
    console.log(this.props.isLoggedIn);
    const { fireRedirect } = this.state;

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
        {logoutBtn()}
        {fireRedirect && (
          <Redirect to={'/login/login'} />
        )}
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
