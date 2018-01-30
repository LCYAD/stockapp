import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Component Import
import TopBar from './components/top-bar/top-bar';
import MainPart from './components/main-part/main-part';
import LoginPart from './components/login-part/login-part';

interface AppProps {
  token: string | null;
}

interface AppState { }

class App extends React.Component<AppProps, AppState> {

  render() {
    // console.log(this.props.token);
    const PrivateRoute = ({ component: Component, ...rest }: any) => (
      <Route
        {...rest}
        render={() => (
          this.props.token !== null
            ? <Component />
            : <Redirect to="/login/login" />
        )}
      />
    );

    return (
      <Router>
        <div>

          <TopBar />

          <Switch>
            <Route
              exact={true}
              path="/"
              render={() => (
                this.props.token !== null
                  ? <Redirect to="/main" />
                  : <Redirect to="/login/login" />
              )}
            />
            <PrivateRoute
              path="/main"
              component={MainPart}
            />
            <Route
              path="/login"
              component={LoginPart}
            />
          </Switch>
        </div>
      </Router>
    );
  }
} // End App Class

const mapStatetoProps = (state: any) => {
  return {
    token: state.user.token
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {

  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(App);
