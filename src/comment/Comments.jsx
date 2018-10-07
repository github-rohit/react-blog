import React from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from '../form/Form';
import Comment from './Comment';
import CommentForm from './CommentForm';
import CustomizedSnackbars from '../common/MySnackbarContent';
import authService from '../common/services/AuthService';

class Comments extends Form {
  state = { comments: [], data: { comment: '' }, errors: {}, snackbar: null };

  schema = {
    comment: Joi.string()
      .required()
      .min(5)
      .max(160)
      .label('Comment')
  };

  snackbar() {
    const { errors } = this.state;
    let message = 'Comment saved successfully.';
    let variant = 'success';

    if (errors.msg) {
      variant = 'error';
      message = errors.msg;
    }

    return (
      <CustomizedSnackbars
        variant={variant}
        autoHideDuration={6000}
        message={message}
      />
    );
  }

  async getComments() {
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

  async doSubmit() {
    this.setState({ snackbar: null });
    try {
      const { id: postId } = this.props;

      const response = await fetch(`http://localhost:3000/api/comments`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postId,
          created_by: authService.user._id,
          ...this.state.data
        })
      });

      const { comment, success, errors } = await response.json();

      if (success) {
        comment.created_by = authService.user;
        const comments = [...this.state.comments, comment];

        this.setState({
          comments,
          data: { comment: '' },
          snackbar: {
            variant: 'success',
            autoHideDuration: 6000,
            message: 'Profile updated successfully.'
          }
        });
      } else if (errors) {
        this.setState({
          errors,
          snackbar: {
            variant: 'error',
            message: errors.msg || errors || 'Something went wrong!'
          }
        });
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  async componentDidMount() {
    await this.getComments();
  }

  render() {
    const { snackbar, comments } = this.state;
    const { length } = comments;

    return (
      <React.Fragment>
        {snackbar && <CustomizedSnackbars {...snackbar} />}
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
            {authService.user ? (
              <CommentForm
                error={this.state.errors.comment}
                value={this.state.data.comment}
                disabled={this.validateAll.bind(this)}
                onChange={this.handleChange.bind(this)}
                onSubmit={this.handleSubmit.bind(this)}
              />
            ) : (
              <React.Fragment>
                Please{' '}
                <Link to={`/login`}>
                  {' '}
                  <strong>login</strong>{' '}
                </Link>{' '}
                for add Comment.
              </React.Fragment>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Comments;
