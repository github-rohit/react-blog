import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Form from '../form/Form';
import Fields from './fields';
import Joi from 'joi-browser';

class Login extends Form {
  state = { data: { email: '', passwd: '' }, errors: {} };

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

  render() {
    return (
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
    );
  }
}

export default Login;
