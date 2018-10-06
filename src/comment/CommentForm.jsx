import React from 'react';
import Button from '@material-ui/core/Button';

function CommentForm({ onSubmit, error, disabled, ...props }) {
  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <textarea
          name="comment"
          placeholder="Enter your comment."
          rows="3"
          className={`form-control post-comment-form-control ${
            error ? 'is-invalid' : ''
          }`}
          {...props}
        />
        {error && <div className="invalid-feedback">{error}</div>}
        <div>
          <Button
            disabled={!!disabled()}
            type="submit"
            variant="outlined"
            color="primary"
          >
            Add Comment
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default CommentForm;
