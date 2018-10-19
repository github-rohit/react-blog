import React from 'react';
import ContentLoader from 'react-content-loader';

function AuthorLoader(props) {
  return (
    <React.Fragment>
      <div className="profile-container">
        <div className="profile-avatar">
          <ContentLoader
            height={'180px'}
            width={'240px'}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
            {...props}
          >
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="180" />
          </ContentLoader>
        </div>
        <div className="profile-base-info">
          <ContentLoader
            height={'180px'}
            width={'100%'}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
            {...props}
          >
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="24" />
            <rect x="0" y="50" rx="0" ry="0" width="100%" height="16" />
            <rect x="0" y="80" rx="0" ry="0" width="100%" height="16" />
            <rect x="0" y="110" rx="0" ry="0" width="100%" height="16" />
          </ContentLoader>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AuthorLoader;
