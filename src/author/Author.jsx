import React, { Component } from 'react';
import AuthorMarkup from './AuthorMarkup';
import Posts from '../post/Posts';
import http from '../common/services/UserHttpService';

import './Author.css';

class Author extends Component {
  state = { author: {} };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await http.getById(id);

    if (response) {
      const author = response;
      this.setState({ author });
    }
  }

  render() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <AuthorMarkup author={this.state.author} />
        <Posts createdBy={id} col={3} {...this.props} />
      </React.Fragment>
    );
  }
}

export default Author;
