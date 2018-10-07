import React from 'react';
import ProfileBasicMarkup from '../common/ProfileBasicMarkup';

function AuthorMarkup(props) {
  return (
    <div className="profile-container-bg">
      <div className="profile-container">
        <ProfileBasicMarkup {...props.author} />
      </div>
    </div>
  );
}

export default AuthorMarkup;
