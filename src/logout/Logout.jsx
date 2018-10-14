import React, { Component } from 'react';
import http from '../common/services/UserHttpService';
import authService from '../common/services/AuthService';

class Logout extends Component {
  async componentDidMount() {
    const response = await http.logout();

    if (!response) {
      return;
    }

    const { success, errors = {} } = response;

    this.setState({ success, errors });

    if (success) {
      authService.logout();
      window.location = '/';
    }
  }

  render() {
    return <div />;
  }
}

export default Logout;
