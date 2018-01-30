import * as React from 'react';
import './top-bar.css';

import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { removeToken } from '../../actions/userAction';

interface TopBarProps { 
  removeToken: Function;
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

    const { fireRedirect } = this.state;

    return (
      <div id="top-part">
        <div id="nav-title">
          Title here
        </div>
        <Route
          path="/main"
          render={() =>
            <div id="login-group">
              <button className="nav-btn" onClick={this.logOut}>Logout</button>
            </div>
          }
        />
        
        {fireRedirect && (
          <Redirect to={'/login/login'} />
        )}
      </div>
      
    );
  }
} // End TopBar Class

const mapStatetoProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeToken: () => {
      dispatch(removeToken());
    }
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(TopBar);
