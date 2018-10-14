import React, { Component } from 'react';
import SinglePostMarkup from './SinglePostMarkup';
import Comments from '../comment/Comments';
import Categories from '../categorie/Categories';
import http from '../common/services/PostHttpService';

class SinglePost extends Component {
  state = { post: {} };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const post = await http.getById(id);

    if (post) {
      this.setState({ post });
    }
  }

  render() {
    const { _id, status } = this.state.post;
    const { length } = Object.keys(this.state.post);
    return length === 0 ? (
      ''
    ) : (
      <React.Fragment>
        <div className="row">
          <div className="col-md-9">
            <SinglePostMarkup post={this.state.post} />
            {status !== 'DRAFT' && <Comments id={_id} />}
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
