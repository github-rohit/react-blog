import React, { Component } from 'react';
import authService from '../common/services/AuthService';

class Logout extends Component {
  async componentDidMount() {
    try {
      const response = await fetch(`http://localhost:3000/api/user/logout`, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const { success, errors = {} } = await response.json();

      this.setState({ success, errors });

      if (success) {
        authService.logout();
        window.location = '/';
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  render() {
    return <div />;
  }
}

export default Logout;
