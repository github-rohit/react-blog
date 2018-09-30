import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import Brightness from '@material-ui/icons/Brightness1';
function SinglePostMarkup(props) {
  const {
    _id: id,
    title,
    category,
    description,
    created_by: createdBy,
    created_on: createdOn
  } = props.post;
  return (
    <div className="ui-post-page">
      <h1 className="post-title">{title}</h1>
      <div className="byline small">
        <i>
          By{' '}
          {createdBy && (
            <Link to={`/author/${createdBy._id}`}>{createdBy.name}</Link>
          )}{' '}
          <Brightness className={'sep-dot'} />
        </i>

        {Moment(createdOn).format('MMM Do, YYYY')}
      </div>
      <div>
        {category.map(c => (
          <Link key={c} to={`/?category=${c}`}>
            <span className="badge badge-pill badge-secondary">{c}</span>
          </Link>
        ))}
      </div>
      <hr />
      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}

export default SinglePostMarkup;
