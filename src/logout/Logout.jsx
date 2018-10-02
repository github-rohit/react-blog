import React, { Component } from 'react';
import authService from '../common/services/AuthService';

class Logout extends Component {
  componentDidMount() {
    console.log('LOGOUT');
    authService.logout();
    window.location = '/';
  }
  render() {
    return <div />;
  }
}

export default Logout;
