import React from 'react';
import ContentLoader from 'react-content-loader';

function PostLoader({ col = 2, ...props }) {
  const loaderArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <React.Fragment>
      <div className="row">
        {loaderArray.map(i => (
          <div key={i} className={`col-md-${12 / col} col-sm-6 post-container`}>
            <article className="post-card">
              <ContentLoader
                height={400}
                width={400}
                speed={2}
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
                {...props}
              >
                <rect x="0" y="0" rx="0" ry="0" width="100%" height="220" />
                <rect x="0" y="230" rx="3" ry="3" width="30%" height="10" />
                <rect x="33%" y="230" rx="3" ry="3" width="30%" height="10" />

                <rect x="0" y="270" rx="0" ry="0" width="33%" height="16" />
                <rect x="34%" y="270" rx="0" ry="0" width="15%" height="16" />
                <rect x="50%" y="270" rx="0" ry="0" width="50%" height="16" />

                <rect x="0" y="296" rx="0" ry="0" width="19%" height="16" />
                <rect x="20%" y="296" rx="0" ry="0" width="33%" height="16" />

                <rect x="0" y="360" rx="3" ry="3" width="100" height="36" />
              </ContentLoader>
            </article>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default PostLoader;
