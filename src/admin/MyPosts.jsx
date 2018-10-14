import React, { Component } from 'react';
import Posts from '../post/Posts';
import MyPostsNav from './MyPostsNav';
import authService from '../common/services/AuthService';

class MyPosts extends Component {
  state = {};

  render() {
    const { _id: id } = authService.user;
    const { status } = this.props.match.params;

    return (
      <React.Fragment>
        <MyPostsNav />
        <Posts
          key={status}
          createdBy={id}
          byStatus={true}
          status={status}
          col={3}
          editable={status}
          {...this.props}
        />
      </React.Fragment>
    );
  }
}

export default MyPosts;
