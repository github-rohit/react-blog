import React, { Component } from 'react';
import SinglePostMarkup from './SinglePostMarkup';
import Comments from '../comment/Comments';
import Categories from '../categorie/Categories';

class SinglePost extends Component {
  state = { post: {} };

  async componentDidMount() {
    try {
      const { id } = this.props.match.params;
      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        mode: 'cors'
      });
      const post = await response.json();

      this.setState({ post });
    } catch (ex) {
      console.log(ex);
    }
  }

  render() {
    const { length } = Object.keys(this.state.post);
    return length === 0 ? (
      ''
    ) : (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <SinglePostMarkup post={this.state.post} />
            <Comments id={this.state.post._id} />
          </div>
          <div className="col-md-3">
            <Categories />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SinglePost;

// function SinglePost({ match }) {
//   const { id } = match;
//   return <div>Read Post</div>;
// }
