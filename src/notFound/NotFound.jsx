import React, { Component } from 'react';
import Bug from '@material-ui/icons/BugReport';

import './NotFound.css';

class NotFound extends Component {
  componentDidMount() {
    document.body.classList.toggle('darkClass');
  }

  componentWillUnmount() {
    document.body.classList.remove('darkClass');
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-not-found">
          <h1>
            <Bug className="bug-icon" fontSize="inherit" />
            404
          </h1>
          <h3>Page not found</h3>
          <p>We're sorry the page you requested could not be found.</p>
        </div>
      </React.Fragment>
    );
  }
}

export default NotFound;
