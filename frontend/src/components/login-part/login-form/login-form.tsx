import * as React from 'react';
import './login-form.css';
import axios from 'axios';
import { Button, Divider, Form } from 'semantic-ui-react';

import { connect } from 'react-redux';

import SocialButton from '../../../components/social-login-btn/social-login-btn';

// import action
import { addToken } from '../../../actions/userAction';

interface LoginFormProps {
  addToken: Function;
}

interface LoginFormState {
  emailvalue: string;
  passwordvalue: string;
  emailvalid: boolean;
  emailerror_length: boolean;
  emailerror_valid: boolean;
  passwordvalid: boolean;
  emaildirty: boolean;
  passworddirty: boolean;
}

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

  emailtest: RegExp;

  constructor(props: any) {
    super(props);

    this.state = {
      emailvalue: '',
      passwordvalue: '',
      emailvalid: true,
      emailerror_length: false,
      emailerror_valid: false,
      passwordvalid: true,
      emaildirty: false,
      passworddirty: false,
    };

    this.emailtest = new RegExp(['^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\\"]+)*)',
      '|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
      '[0-9]{1,3}\])|(([a-zA-Z\\-0-9]+\\.)+',
      '[a-zA-Z]{2,}))$'].join(''));

    this.submitForm = this.submitForm.bind(this);
    this.emailValidator = this.emailValidator.bind(this);
    this.passwordValidator = this.passwordValidator.bind(this);
    this.handleSocialLogin = this.handleSocialLogin.bind(this);
    this.handleSocialLoginFailure = this.handleSocialLoginFailure.bind(this);
  }

  handleSocialLogin(user: any) {
    console.log(user._token);
    axios.post('http://localhost:8080/api/login/facebook', {
      access_token: user._token.accessToken
    }).then((res) => {
      console.log(res.data.token);
      // add the token onto the store
      this.props.addToken(res.data.token);
    }).catch((err) => {
      console.log(err);
    });
  }

  handleSocialLoginFailure(err: any) {
    console.error(err);
  }

  submitForm(e: any): void {
    e.preventDefault();
    if (this.state.emailvalid && this.state.passwordvalid &&
      this.state.emaildirty && this.state.passworddirty) {
      console.log(this.state.emailvalue, this.state.passwordvalue);
      axios.post('http://localhost:8080/api/login', {
        email: this.state.emailvalue,
        password: this.state.passwordvalue
      }).then((res) => {
        // console.log(res.data.token);
        // add the token onto the store
        this.props.addToken(res.data.token);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  emailValidator(e: any) {
    this.setState({ emailvalue: e.target.value });
    if (!this.state.emaildirty) {
      this.setState({ emaildirty: true });
    }

    if (!e.target.value.length) {
      this.setState({ emailerror_length: true });
    } else {
      this.setState({ emailerror_length: false });
    }

    if (!this.emailtest.test(e.target.value)) {
      this.setState({ emailerror_valid: true });
    } else {
      this.setState({ emailerror_valid: false });
    }

    if (!this.state.emailerror_length && !this.state.emailerror_valid) {
      this.setState({ emailvalid: true });
    } else {
      this.setState({ emailvalid: false });
    }

  }

  passwordValidator(e: any) {
    this.setState({ passwordvalue: e.target.value });

    if (!this.state.passworddirty) {
      this.setState({ passworddirty: true });
    }

    if (!e.target.value.length) {
      if (this.state.passwordvalid) {
        this.setState({ passwordvalid: false });
      }
    } else {
      if (!this.state.passwordvalid) {
        this.setState({ passwordvalid: true });
      }
    }
  }

  render() {

    let emailwarning1 = null;
    let emailwarning2 = null;
    let passwordwarning = null;

    if (this.state.emailerror_length) {
      emailwarning1 = <div className="form-warning"> <i>Please input a Email</i> </div>;
    } else if (this.state.emailerror_valid) {
      emailwarning2 = <div className="form-warning"> <i>Invalid Email</i> </div>;
    } else {
      emailwarning1 = null;
      emailwarning2 = null;
    }

    if (!this.state.passwordvalid) {
      passwordwarning = <div className="form-warning"> <i>Please input an password</i> </div>;
    } else { passwordwarning = null; }

    return (
      <div id="login-form">
        <Form 
          size={'large'}
          key={'large'}
          onSubmit={this.submitForm}
        >
          <Form.Group 
            widths="equal"
          >
            <Form.Field
              required={true}
              className="form-input"
              label="Email"
              control="input"
              placeholder="Enter Email"
              value={this.state.emailvalue}
              onChange={this.emailValidator}
            />
          </Form.Group>
          {emailwarning1}
          {emailwarning2}
          <Form.Group 
            widths="equal"
          >
            <Form.Field
              required={true}
              className="form-input"
              label="Password"
              control="input"
              placeholder="Enter Password"
              value={this.state.passwordvalue}
              onChange={this.passwordValidator}
            />
          </Form.Group>
          {passwordwarning}
          <Button basic={true} color="blue" id="submit-btn" type="submit">Submit</Button>
        </Form>
        <Divider 
          horizontal={true}
        >Or
        </Divider>
        <div id="social-container">
          <SocialButton
            provider="facebook"
            appId="561387647527429"
            onLoginSuccess={this.handleSocialLogin}
            onLoginFailure={this.handleSocialLoginFailure}
          >
            Facebook
          </SocialButton>
        </div>
      </div>
    );
  }
} // End LoginForm Class

const mapStatetoProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addToken: (token: string) => {
      dispatch(addToken(token));
    }
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(LoginForm);