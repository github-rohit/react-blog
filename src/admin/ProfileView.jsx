import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Email from '@material-ui/icons/EmailSharp';
import Website from '@material-ui/icons/ChromeReaderModeSharp';
import Location from '@material-ui/icons/LocationCitySharp';
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
            <a href="javascript:void(0)">
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
    try {
      const { id } = this.props.match.params;
      const response = await fetch(`http://localhost:3000/api/user/${id}`, {
        mode: 'cors'
      });
      const author = await response.json();

      this.setState({ author });
    } catch (ex) {
      console.log(ex);
    }
  }

  render() {
    if (!this.state.author) {
      return null;
    }

    const { _id, name, email, aboutme, website, country } =
      this.state.author || {};

    const editLink = props => (
      <Link to={`/admin/myprofile/edit/${_id}`} {...props} />
    );

    return (
      <React.Fragment>
        <div className="profile-container">
          <div className="profile-avatar">
            <img className="img-fluid" src="/images/user.png" alt="user" />
          </div>
          <div className="profile-base-info">
            <h2>{name}</h2>
            {email && (
              <p title="email">
                <Email fontSize="small" color="action" /> {email}
              </p>
            )}
            {website && (
              <p title="Website">
                <Website fontSize="small" color="action" />
                &nbsp;
                <a href={website} target="_blank">
                  {website}
                </a>
              </p>
            )}
            {country && (
              <p title="Location">
                <Location fontSize="small" color="action" /> {country}
              </p>
            )}
          </div>
          <div>
            <Button
              size="small"
              className="edit-profile-btn"
              component={editLink}
              variant="outlined"
              color="primary"
            >
              Edit Profile
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
