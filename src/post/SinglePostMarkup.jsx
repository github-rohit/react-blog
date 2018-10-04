import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import Brightness from '@material-ui/icons/Brightness1';
import { getEncodeURI } from '../common/util';

function SinglePostMarkup(props) {
  const {
    title,
    image,
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
      <div>
        {category.map(c => (
          <Link key={c} to={`/?category=${c}`}>
            <span className="badge badge-pill badge-secondary">{c}</span>
          </Link>
        ))}
      </div>
      <hr />
      <div className="description">
        {image && <img src={image} />}
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
}

export default SinglePostMarkup;
