import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CheckCircle from '@material-ui/icons/CheckCircleOutlineSharp';
import Joi from 'joi-browser';
import Form from '../form/Form';
import Fields from './fields';
import CustomizedSnackbars from '../common/MySnackbarContent';
import http from '../common/services/UserHttpService';
import authService from '../common/services/AuthService';

class Signup extends Form {
  state = {
    data: {
      email: '',
      name: '',
      passwd: '',
      confirmPasswd: ''
    },
    errors: {},
    success: false
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .min(6)
      .max(50)
      .label('Email'),
    name: Joi.string()
      .min(3)
      .max(25)
      .required()
      .label('Name'),
    passwd: Joi.string()
      .required()
      .min(6)
      .max(15)
      .label('Password'),
    confirmPasswd: Joi.string()
      .required()
      .valid(Joi.ref('passwd'))
      .options({
        language: {
          any: {
            allowOnly: '!!Passwords do not match'
          }
        }
      })
      .label('Password')
  };

  componentDidMount() {
    document.body.classList.toggle('darkClass');
  }

  componentWillUnmount() {
    document.body.classList.remove('darkClass');
  }

  successMsg() {
    const LoginLink = props => <Link to={`/login`} {...props} />;

    return (
      <div className="form-card form-card--success">
        <div className="form-card__head form-card--success__head">
          <CheckCircle fontSize="inherit" />
          <div className="label">SUCCESS</div>
        </div>
        <div className="form-card__body text-center form-card--success__body">
          Congratulations your account has been successfully created
        </div>
        <div className="form-card__foot text-center form-card--success__foot">
          <Button
            component={LoginLink}
            type="submit"
            variant="outlined"
            size="large"
            color="primary"
          >
            Click here to Login
          </Button>
        </div>
      </div>
    );
  }

  async doSubmit() {
    const response = await http.post(this.state.data);

    if (!response) {
      return;
    }

    const { success, errors = {} } = response;

    if (response.status === 403) {
      errors.email = errors.msg;
    }

    this.setState({ success, errors });
  }

  render() {
    if (authService.user) {
      return <Redirect to="/admin/myposts/published" />;
    }
    const { success, errors } = this.state;
    return (
      <React.Fragment>
        {errors.msg && (
          <CustomizedSnackbars
            variant="error"
            horizontal="center"
            message={errors.msg}
          />
        )}
        {success ? (
          this.successMsg()
        ) : (
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-card">
              <div className="form-card__head">
                <div className="form-card__head-label">
                  <h3 className="form-card__head-title">SIGN UP</h3>
                </div>
              </div>
              <div className="form-card__body">
                {this.renderAllFieldMarkup(Fields)}
              </div>
              <div className="form-card__foot">
                <Button
                  disabled={!!this.validateAll()}
                  type="submit"
                  variant="outlined"
                  color="primary"
                >
                  Sign up
                </Button>
              </div>
            </div>
          </form>
        )}
      </React.Fragment>
    );
  }
}

export default Signup;
