import React from 'react';
import Email from '@material-ui/icons/EmailSharp';
import Website from '@material-ui/icons/ChromeReaderModeSharp';
import Location from '@material-ui/icons/LocationCitySharp';

function ProfileBasicMarkup(props) {
  const { email, name, website, country } = props;

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default ProfileBasicMarkup;
