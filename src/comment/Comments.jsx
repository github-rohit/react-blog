import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Comment from './Comment';

class Comments extends Component {
  state = { comments: [] };

  async componentDidMount() {
    try {
      const { id } = this.props;
      const response = await fetch(`http://localhost:3000/api/comments/${id}`, {
        mode: 'cors'
      });
      const comments = await response.json();

      this.setState({ comments });
    } catch (ex) {
      console.log(ex);
    }
  }

  render() {
    const { length } = this.state.comments;

    return (
      <React.Fragment>
        <div className="ui-add-comment">
          <div className="ui-add-comment-header">
            <h4>{length} Comments</h4>
          </div>
          <div className="ui-add-comment-body">
            {length !== 0 &&
              this.state.comments.map(comment => (
                <Comment key={comment._id} comment={comment} />
              ))}
          </div>
          <div className="ui-add-comment-footer">
            Please{' '}
            <Link to={`/login`}>
              <strong>login</strong>
            </Link>{' '}
            for add Comment.
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Comments;
