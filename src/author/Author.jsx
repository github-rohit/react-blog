import React, { Component } from 'react';
import AuthorMarkup from './AuthorMarkup';
import Posts from '../post/Posts';
import AuthorLoader from './AuthorLoader';
import http from '../common/services/UserHttpService';

import './Author.css';

class Author extends Component {
  state = { author: {}, loader: true };

  async componentDidMount() {
    this.setState({ loader: true });
    const { id } = this.props.match.params;
    const response = await http.getById(id);

    if (response) {
      const author = response;
      this.setState({ author, loader: false });
    }
  }

  render() {
    const { id } = this.props.match.params;
    const { loader } = this.state;

    return (
      <React.Fragment>
        {loader && (
          <div className="profile-container-bg">
            <AuthorLoader />
          </div>
        )}
        {!loader && <AuthorMarkup author={this.state.author} />}
        <Posts createdBy={id} col={3} {...this.props} />
      </React.Fragment>
    );
  }
}

export default Author;
