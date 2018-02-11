import * as React from 'react';
import './signup-form.css';
import axios from 'axios';

import { Button, Form } from 'semantic-ui-react';

import { connect } from 'react-redux';

// import action
import { addToken } from '../../../actions/userAction';
import { successMsg, failMsg, hideMsg } from '../../../actions/notificationAction';

interface SignFormProps {
  addToken: Function;
  sendSuccessMsg: Function;
  sendFailMsg: Function;
  handleSignup: Function;
}

interface SignFormState {
  emailvalue: string;
  passwordvalue: string;
  confirmpasswordvalue: string;
  emailvalid: boolean;
  emailerror_length: boolean;
  emailerror_valid: boolean;
  passwordvalid: boolean;
  confirmpasswordvalid: boolean;
  emaildirty: boolean;
  passworddirty: boolean;
  confirmpassworddirty: boolean;
}

class SignForm extends React.Component<SignFormProps, SignFormState> {

  emailtest: RegExp;

  constructor(props: any) {
    super(props);

    this.state = {
      emailvalue: '',
      passwordvalue: '',
      confirmpasswordvalue: '',
      emailvalid: true,
      emailerror_length: false,
      emailerror_valid: false,
      passwordvalid: true,
      confirmpasswordvalid: true,
      emaildirty: false,
      passworddirty: false,
      confirmpassworddirty: false,
    };

    this.emailtest = new RegExp(['^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\\"]+)*)',
      '|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
      '[0-9]{1,3}\])|(([a-zA-Z\\-0-9]+\\.)+',
      '[a-zA-Z]{2,}))$'].join(''));

    this.submitForm = this.submitForm.bind(this);
    this.emailValidator = this.emailValidator.bind(this);
    this.passwordValidator = this.passwordValidator.bind(this);
    this.confirmpasswordValidator = this.confirmpasswordValidator.bind(this);
  }

  submitForm(e: any): void {
    e.preventDefault();
    if (this.state.emailvalid && this.state.passwordvalid && this.state.confirmpasswordvalid &&
      this.state.emaildirty && this.state.passworddirty && this.state.confirmpassworddirty) {
      // console.log(this.state.emailvalue, this.state.passwordvalue);
      this.props.handleSignup(this.state.emailvalue, this.state.passwordvalue);
      // axios.post('http://localhost:8080/api/login/signup', {
      //   email: this.state.emailvalue,
      //   password: this.state.passwordvalue
      // }).then((res) => {
      //   console.log(res.data.token);
      //   // add the token onto the store
      //   this.props.addToken(res.data.token);
      //   this.props.sendSuccessMsg('Sign Up Successful!', 'Take a look around.');
      // }).catch((err) => {
      //   console.log(err);
      //   this.props.sendFailMsg('Sign Up Unsuccessful!', 'Please check your input.');
      // });
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

  confirmpasswordValidator(e: any) {
    this.setState({ confirmpasswordvalue: e.target.value });

    if (!this.state.confirmpassworddirty) {
      this.setState({ confirmpassworddirty: true });
    }

    if (e.target.value !== this.state.passwordvalue && this.state.passworddirty) {
      if (this.state.confirmpasswordvalid) {
        this.setState({ confirmpasswordvalid: false });
      }
    } else {
      if (!this.state.confirmpasswordvalid) {
        this.setState({ confirmpasswordvalid: true });
      }
    }
  }

  render() {

    let emailwarning1 = null;
    let emailwarning2 = null;
    let passwordwarning = null;
    let confirmpasswordwarning = null;

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

    if (!this.state.confirmpasswordvalid) {
      confirmpasswordwarning = <div className="form-warning"> <i>Password does not match</i> </div>;
    } else { confirmpasswordwarning = null; }

    return (
      <div id="signup-form">
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
          <Form.Group 
            widths="equal"
          >
            <Form.Field
              required={true}
              className="form-input"
              label="Confirm Password"
              control="input"
              placeholder="Confirm your password"
              value={this.state.confirmpasswordvalue}
              onChange={this.confirmpasswordValidator}
            />
          </Form.Group>
          {confirmpasswordwarning}
          <Button basic={true} color="blue" id="submit-btn" type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
} // End SignForm Class

const mapStatetoProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleSignup: (email: string, password: string) => {
      axios.post('http://localhost:8080/api/login/signup', {
        email: email,
        password: password
      }).then((res) => {
        console.log(res.data.token);
        // add the token onto the store
        dispatch(addToken(res.data.token));
        dispatch(successMsg('Sign Up Successful!', 'Take a look around.'));
        setTimeout(() => { dispatch(hideMsg()); }, 3000);
      }).catch((err) => {
        console.log(err);
        dispatch(failMsg('Sign Up Unsuccessful!', 'That email already exist'));
        setTimeout(() => { dispatch(hideMsg()); }, 3000);
      });
    },
    addToken: (token: string) => {
      dispatch(addToken(token));
    },
    sendSuccessMsg: (title: string, message: string) => {
      dispatch(successMsg(title, message));
      setTimeout(() => { dispatch(hideMsg()); }, 3000);
    },
    sendFailMsg: (title: string, message: string) => {
      dispatch(failMsg(title, message));
      setTimeout(() => { dispatch(hideMsg()); }, 3000);
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(SignForm);