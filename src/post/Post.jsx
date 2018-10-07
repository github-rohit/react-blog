import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Brightness from '@material-ui/icons/Brightness1';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/EditOutlined';
import { getEncodeURI } from '../common/util';

import imagePlaceHolder from '../logo.svg';

function getTitle(title = '', len = 120) {
  if (title.length > len) {
    return `${title.substring(0, len)}...`;
  }

  return title;
}

function Post({ post, col, editable, onDelete }) {
  const {
    _id: id,
    image,
    title,
    category,
    created_by: createdBy,
    created_on: createdOn
  } = post;

  const ReadMoreLink = props => (
    <Link to={`/post/${id}/${getEncodeURI(title)}`} {...props} />
  );

  const EditLink = props => <Link to={`/admin/post/edit/${id}`} {...props} />;

  return (
    <div className={`col-md-${12 / col} col-sm-6 post-container`}>
      <article className="post-card d-flex flex-wrap align-content-between">
        <div className="w-100">
          <div
            className={`post-img${!image ? '-bg' : ''}`}
            style={{ backgroundImage: `url("${image}")` }}
          >
            {!image && <img alt="nirmalrohit.com" src={imagePlaceHolder} />}
          </div>
          <div className="byline small">
            <i>
              By{' '}
              {createdBy && (
                <Link
                  to={`/author/${createdBy._id}/${getEncodeURI(
                    createdBy.name
                  )}`}
                >
                  {createdBy.name}
                </Link>
              )}{' '}
              <Brightness className="sep-dot" />
            </i>

            {Moment(createdOn).format('MMM Do, YYYY')}
          </div>
          <div className="post-title">
            <h2>
              <Link to={`/post/${id}/${getEncodeURI(title)}`}>
                {getTitle(title)}
              </Link>
            </h2>
          </div>
          <div>
            {category.map(c => (
              <Link key={c} to={`/?category=${c}`}>
                <span className="badge badge-pill badge-light">{c}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center w-100">
          <Button component={ReadMoreLink} size="small" color="primary">
            READ MORE
          </Button>
          {editable && (
            <span>
              <IconButton onClick={onDelete} aria-label="Delete">
                <DeleteIcon fontSize="small" />
              </IconButton>
              {editable !== 'published' && (
                <IconButton component={EditLink} aria-label="Edit">
                  <Edit fontSize="small" />
                </IconButton>
              )}
            </span>
          )}
        </div>
      </article>
    </div>
  );
}

export default Post;
