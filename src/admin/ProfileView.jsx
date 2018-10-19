import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ProfileBasicMarkup from '../common/ProfileBasicMarkup';
import AuthorLoader from '../author/AuthorLoader';
import http from '../common/services/UserHttpService';

class ProfileView extends Component {
  state = { author: null };

  socialClasses = {
    facebook: 'facebook-f',
    twitter: 'twitter',
    google_plus: 'google-plus',
    linkedIn: 'linkedin',
    instagram: 'instagram',
    tumblr: 'tumblr',
    pinterest: 'pinterest-p'
  };

  getSocialLink(key, clsName) {
    const value = this.state.author[key];

    return (
      <p key={key}>
        {value ? (
          <a href={value} target="_blank">
            <i className={`fa fa-${clsName}`} />
            {value}
          </a>
        ) : (
          <React.Fragment>
            <a>
              <i className={`fa fa-${clsName}`} /> -
            </a>
          </React.Fragment>
        )}
      </p>
    );
  }

  getSocialLinks() {
    let socialLinks = [];

    for (const [key, clsName] of Object.entries(this.socialClasses)) {
      socialLinks.push(this.getSocialLink(key, clsName));
    }

    return socialLinks;
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const author = await http.getById(id);

    if (!author) {
      return;
    }

    this.setState({ author });
  }

  render() {
    if (!this.state.author) {
      return <AuthorLoader />;
    }

    const { _id, name, email, aboutme, website, country } =
      this.state.author || {};

    const editLink = props => (
      <Link to={`/admin/myprofile/edit/${_id}`} {...props} />
    );

    const passwdLink = props => (
      <Link to={`/admin/password/${_id}`} {...props} />
    );

    return (
      <React.Fragment>
        <div className="profile-container">
          <ProfileBasicMarkup
            name={name}
            email={email}
            website={website}
            country={country}
          />
          <div>
            <Button
              size="small"
              className="w-100 mb-3"
              component={editLink}
              variant="outlined"
              color="primary"
            >
              Edit Profile
            </Button>
            <Button
              size="small"
              className="w-100"
              component={passwdLink}
              variant="outlined"
              color="primary"
            >
              Change Password
            </Button>
          </div>
          <div className="profile-aboutme">
            <h4>ABOUT ME</h4>
            <p>{aboutme ? aboutme : '-'}</p>
          </div>
          <div className="profile-social-media">
            <h4>SOCIAL MEDIA</h4>
            {this.getSocialLinks()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileView;
