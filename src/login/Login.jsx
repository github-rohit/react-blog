import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Joi from 'joi-browser';
import Form from '../form/Form';
import Fields from './fields';
import CustomizedSnackbars from '../common/MySnackbarContent';
import authService from '../common/services/AuthService';

class Login extends Form {
  state = {
    data: { email: '', passwd: '' },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label('Email'),
    passwd: Joi.string()
      .required()
      .label('Password')
  };

  componentDidMount() {
    document.body.classList.toggle('darkClass');
  }

  componentWillUnmount() {
    document.body.classList.remove('darkClass');
  }

  async doSubmit() {
    try {
      const response = await fetch(`http://localhost:3000/api/user/login`, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.data)
      });
      const { success, token, errors = {} } = await response.json();

      this.setState({ success, errors });

      if (success) {
        authService.token = token;
        const { state } = this.props.location;

        window.location = state ? state.from.pathname : '/';
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  render() {
    if (authService.user) {
      return <Redirect to="/admin/myposts/published" />;
    }
    const { errors } = this.state;
    return (
      <React.Fragment>
        {errors.msg && (
          <CustomizedSnackbars
            variant="error"
            horizontal="center"
            message={errors.msg}
          />
        )}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-card">
            <div className="form-card__head">
              <div className="form-card__head-label">
                <h3 className="form-card__head-title">LOGIN</h3>
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
                Login
              </Button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
