import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Joi from 'joi-browser';
import Form from '../form/Form';
import Fields from './ChangePasswordFields.json';
import CustomizedSnackbars from '../common/MySnackbarContent';

class ChangePassword extends Form {
  state = {
    data: { oldPasswd: '', passwd: '', confirmPasswd: '' },
    errors: {}
  };

  schema = {
    oldPasswd: Joi.string()
      .required()
      .label('Old Password'),
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

  async doSubmit() {
    this.setState({ snackbar: null });
    try {
      const { id } = this.props.match.params;

      const response = await fetch(`http://localhost:3000/api/user/password`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          ...this.state.data
        })
      });

      const { success, errors } = await response.json();
      console.log(success);
      if (success) {
        this.setState({
          snackbar: {
            variant: 'success',
            autoHideDuration: 6000,
            message: 'Profile updated successfully.'
          }
        });
      } else if (errors) {
        this.setState({
          errors,
          snackbar: {
            variant: 'error',
            message: errors.msg || errors || 'Something went wrong!'
          }
        });
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  componentDidMount() {
    document.body.classList.toggle('darkClass');
  }

  componentWillUnmount() {
    document.body.classList.remove('darkClass');
  }

  render() {
    const { snackbar } = this.state;
    return (
      <React.Fragment>
        {snackbar && <CustomizedSnackbars {...snackbar} />}
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
                Change Password
              </Button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default ChangePassword;
