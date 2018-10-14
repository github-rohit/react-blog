import React from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from '../form/Form';
import Comment from './Comment';
import CommentForm from './CommentForm';
import CustomizedSnackbars from '../common/MySnackbarContent';
import http from '../common/services/CommentHttpService';
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
    const { id } = this.props;
    const response = await http.getById(id);

    if (response) {
      const comments = response;
      this.setState({ comments });
    }
  }

  updateCommentArray(comment) {
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
  }

  async doSubmit() {
    this.setState({ snackbar: null });
    const { id: postId } = this.props;

    const response = await http.post({
      postId,
      created_by: authService.user._id,
      ...this.state.data
    });

    if (!response) {
      return;
    }

    const { comment, success, errors } = response;

    if (success) {
      this.updateCommentArray(comment);
    } else if (errors) {
      this.setState({
        errors,
        snackbar: {
          variant: 'error',
          message: errors.msg || errors || 'Something went wrong!'
        }
      });
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
