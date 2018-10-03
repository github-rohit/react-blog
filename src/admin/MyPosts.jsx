import React, { Component } from 'react';
import Posts from '../post/Posts';
import MyPostsNav from './MyPostsNav';
import authService from '../common/services/AuthService';

class MyPosts extends Component {
  state = {};

  async componentDidMount() {
    console.log(authService.user);
  }

  render() {
    const { _id: id } = authService.user;
    return (
      <React.Fragment>
        <MyPostsNav />
        <Posts createdBy={id} byStatus={true} col={3} {...this.props} />
      </React.Fragment>
    );
  }
}

export default MyPosts;
