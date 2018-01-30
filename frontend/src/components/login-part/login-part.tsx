import * as React from 'react';
import './login-part.css';

import { Route, Switch, NavLink } from 'react-router-dom';

import LoginForm from './login-form/login-form';
import SignupForm from './signup-form/signup-form';

interface LoginPartProps {
  match: any;
}

interface LoginPartState { }

class LoginPart extends React.Component<LoginPartProps, LoginPartState> {

  render() {
    return (
      <div id="login-part">
        <div id="form-container">
          <div id="form-switch">
            <div className="link-switch">
              <NavLink
                to="/login/login"
                style={{ textDecoration: 'none', color: 'grey' }}
              >
                Login
              </NavLink>
            </div>
            <div className="link-switch">
              <NavLink
                to="/login/signup"
                style={{ textDecoration: 'none', color: 'grey' }}
              >
                Sign Up
              </NavLink>
            </div>
          </div>
          <hr className="switch-border"/>
          <Switch>
            <Route
              path={`${this.props.match.path}/login`}
              component={LoginForm}
            />
            <Route
              path={`${this.props.match.path}/signup`}
              component={SignupForm}
            />
          </Switch>
        </div>
      </div>
    );
  }
} // End LoginPart Class

export default LoginPart;