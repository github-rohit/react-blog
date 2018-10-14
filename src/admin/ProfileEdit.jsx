import React from 'react';
import Button from '@material-ui/core/Button';
import Email from '@material-ui/icons/EmailSharp';
import Joi from 'joi-browser';
import Form from '../form/Form';
import ProfileFields from './ProfileFields.json';
import CustomizedSnackbars from '../common/MySnackbarContent';
import http from '../common/services/UserHttpService';

class ProfileEdit extends Form {
  state = {
    data: {
      name: '',
      aboutme: '',
      gender: '',
      country: '',
      website: '',
      facebook: '',
      twitter: '',
      google_plus: '',
      linkedIn: '',
      instagram: '',
      tumblr: '',
      pinterest: ''
    },
    snackbar: null,
    errors: {}
  };

  schema = {
    name: Joi.string()
      .min(3)
      .max(25)
      .required()
      .label('Name')
  };

  async doSubmit() {
    this.setState({ snackbar: null });

    const { id } = this.props.match.params;
    const response = await http.patch(id, this.state.data);

    if (!response) {
      return;
    }

    const { success, user: data, errors = {} } = response;

    if (success) {
      this.setState({
        data,
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
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const data = await http.getById(id);

    if (!data) {
      return;
    }

    this.setState({ data });
  }

  render() {
    const { snackbar } = this.state;
    const { name, email } = this.state.data;

    return (
      <React.Fragment>
        {snackbar && <CustomizedSnackbars {...snackbar} />}
        {email && (
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="profile-container">
              <div className="profile-avatar">
                <img className="img-fluid" src="/images/user.png" alt="user" />
              </div>
              <div className="profile-base-info">
                <h2>{name}</h2>
                <p title="email">
                  <Email fontSize="small" color="action" /> {email}
                </p>
                {this.renderAllFieldMarkup(ProfileFields.basic)}
              </div>
              <div className="profile-social-media">
                <h4>SOCIAL MEDIA</h4>
                {this.renderAllFieldMarkup(ProfileFields.social)}
              </div>
              <div className="fixed-wrapper-btns create-btns clearfix">
                <div className="container">
                  <div />
                  <div>
                    <Button
                      disabled={!!this.validateAll()}
                      type="submit"
                      variant="outlined"
                      color="primary"
                    >
                      Update Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </React.Fragment>
    );
  }
}

export default ProfileEdit;
