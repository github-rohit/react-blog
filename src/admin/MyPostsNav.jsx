import React from 'react';
import { NavLink } from 'react-router-dom';

function MyPostsNav() {
  return (
    <ul className="ui-tabs clearfix">
      <li>
        <NavLink to={`/admin/myposts/published`}>PUBLISHED</NavLink>
      </li>
      <li>
        <NavLink to={`/admin/myposts/draft`}>DRAFT</NavLink>
      </li>
    </ul>
  );
}

export default MyPostsNav;
