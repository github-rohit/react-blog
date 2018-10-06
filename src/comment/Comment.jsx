import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import Brightness from '@material-ui/icons/Brightness1';
import { getEncodeURI } from '../common/util';

function Comment(props) {
  const {
    comment,
    created_by: createdBy,
    created_on: createdOn
  } = props.comment;

  return (
    <div className="comment-row">
      <p>{comment}</p>
      <div className="byline small">
        <i>
          By{' '}
          {createdBy && (
            <Link
              to={`/author/${createdBy._id}/${getEncodeURI(createdBy.name)}`}
            >
              {createdBy.name}
            </Link>
          )}{' '}
          <Brightness className={'sep-dot'} />
        </i>

        {Moment(createdOn).format('MMM Do, YYYY')}
      </div>
    </div>
  );
}

export default Comment;
