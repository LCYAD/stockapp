import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Component Import
import TopBar from './components/top-bar/top-bar';
import MainPart from './components/main-part/main-part';
import LoginPart from './components/login-part/login-part';

interface AppProps {
  isLoggedIn: boolean;
}

interface AppState { }

class App extends React.Component<AppProps, AppState> {

  render() {
    let isLoggedInNow = this.props.isLoggedIn;
    const PrivateRoute = ({ component: Component, ...rest }: any) => (
      <Route
        {...rest}
        render={(props) => (
          isLoggedInNow
            ? <Component {...props}/>
            : <Redirect to="/login/login" />
        )}
      />
    );

    const LoginRoute = ({ component: Component, ...rest }: any) => (
      <Route
        {...rest}
        render={(props) => (
          isLoggedInNow
            ? <Redirect to="/main" />
            : <Component {...props}/>
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
                isLoggedInNow
                  ? <MainPart />
                  : <Redirect to="/login/login" />
              )}
            />
            <PrivateRoute
              path="/main"
              component={MainPart}
            />
            <LoginRoute
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
    isLoggedIn: state.user.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {

  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(App);
