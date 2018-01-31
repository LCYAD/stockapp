import * as React from 'react';
import './signup-form.css';
import axios from 'axios';

import { Button } from 'semantic-ui-react';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

// import action
import { addToken } from '../../../actions/userAction';

interface SignFormProps {
  addToken: Function;
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
  fireRedirect: boolean;
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
      fireRedirect: false,
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
      console.log(this.state.emailvalue, this.state.passwordvalue);
      axios.post('http://localhost:8080/api/login/signup', {
        email: this.state.emailvalue,
        password: this.state.passwordvalue
      }).then((res) => {
        console.log(res.data.token);
        // add the token onto the store
        this.props.addToken(res.data.token);
        this.setState({ fireRedirect: true });
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

    const { fireRedirect } = this.state;

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
        <form onSubmit={this.submitForm}>
          <p
            className="form-title"
          >
            <i>Email</i>
          </p>
          <input
            className="form-input"
            type="text"
            placeholder="Enter Email"
            value={this.state.emailvalue}
            onChange={this.emailValidator}
          />
          {emailwarning1}
          {emailwarning2}
          <p
            className="form-title"
          >
            <i>Password</i>
          </p>
          <input
            className="form-input"
            type="text"
            placeholder="Enter password"
            value={this.state.passwordvalue}
            onChange={this.passwordValidator}
          />
          {passwordwarning}
          <p
            className="form-title"
          >
            <i>Confirm Password</i>
          </p>
          <input
            className="form-input"
            type="text"
            placeholder="Confirm your password"
            value={this.state.confirmpasswordvalue}
            onChange={this.confirmpasswordValidator}
          />
          {confirmpasswordwarning}
          <Button basic={true} color="blue" id="submit-btn" type="submit">Submit</Button>
        </form>

        {fireRedirect && (
          <Redirect to={'/main'} />
        )}
      </div>
    );
  }
} // End SignForm Class

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

export default connect(mapStatetoProps, mapDispatchToProps)(SignForm);