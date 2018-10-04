import React, { Component } from 'react';
import AuthorMarkup from './AuthorMarkup';
import Posts from '../post/Posts';

import './Author.css';

class Author extends Component {
  state = { author: {} };

  async componentDidMount() {
    try {
      const { id } = this.props.match.params;
      const response = await fetch(`http://localhost:3000/api/user/${id}`, {
        mode: 'cors'
      });
      const author = await response.json();

      this.setState({ author });
    } catch (ex) {
      console.log(ex);
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
