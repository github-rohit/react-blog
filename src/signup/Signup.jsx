import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Form from '../form/Form';
import Fields from './fields';
import Joi from 'joi-browser';

class Signup extends Form {
  state = {
    data: { email: '', name: '', passwd: '', confirmPasswd: '' },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .min(6)
      .max(50)
      .label('Email'),
    name: Joi.string()
      .min(5)
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

  async doSubmit() {
    console.log('');
    try {
      const response = await fetch(`http://localhost:3000/api/user`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.data)
      });
      const a = await response.json();

      console.log(a);
    } catch (ex) {
      console.log(ex);
    }
  }

  render() {
    return (
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
    );
  }
}

export default Signup;
