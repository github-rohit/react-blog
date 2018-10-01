import React from 'react';
import Email from '@material-ui/icons/EmailSharp';
import Website from '@material-ui/icons/ChromeReaderModeSharp';
import Location from '@material-ui/icons/LocationCitySharp';

function AuthorMarkup(props) {
  console.log(props.author);
  const { name, email, aboutme, website, location } = props.author;
  return (
    <div className="profile-container-bg">
      <div className="profile-container clearfix">
        <div className="profile-container-left">
          <img src="/images/user.png" alt="user" />
        </div>
        <div>
          <div className="info">
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
            {location && (
              <p title="Location">
                <Location fontSize="small" color="action" /> {location}
              </p>
            )}
            {aboutme && <p className="about-me-read">{aboutme}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorMarkup;
