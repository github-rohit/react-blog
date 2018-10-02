import React, { Component } from 'react';
import queryString from 'query-string';
import TablePagination from '@material-ui/core/TablePagination';
import Post from './Post';
import './Post.css';

const LIMIT = 12;

class Posts extends Component {
  state = { posts: [], count: 0, rowsPerPage: LIMIT, page: 0 };

  async handelPageChange(e, page) {
    await this.setState({ page });
    this.updateQuryParams('page');
    this.getPosts();
  }

  async handelRowsPerPage(e) {
    const { value } = e.target;
    await this.setState({ rowsPerPage: value });
    this.updateQuryParams('limit', value);
    this.getPosts();
  }

  async getPosts() {
    const query = this.getQuery();

    try {
      const response = await fetch(`http://localhost:3000/api/posts?${query}`, {
        mode: 'cors'
      });
      const { posts, total: count } = await response.json();

      this.setState({ posts, count });
    } catch (ex) {
      console.log(ex);
    }
  }

  updateQuryParams(key, value) {
    const url = new URLSearchParams(this.props.location.search);

    if (key === 'page') {
      url.set(key, this.state[key] + 1);
    } else {
      url.set(key, value);
    }

    this.props.history.push(`?${url.toString()}`);
  }

  getQuery() {
    const url = new URLSearchParams();
    const { page, rowsPerPage: limit } = this.state;
    const { category, createdBy: cb } = queryString.parse(
      this.props.location.search
    );
    const { createdBy = cb } = this.props;

    url.set('page', page + 1);
    url.set('limit', limit);

    if (createdBy) {
      url.set('createdBy', createdBy);
    }

    if (category) {
      url.set('category', category);
    }

    return url.toString();
  }

  setPaginationValues() {
    const stateObj = {};
    const { page, limit } = queryString.parse(this.props.location.search);

    if (!isNaN(page)) {
      stateObj.page = (+page || 1) - 1;
    }

    if (!isNaN(limit)) {
      stateObj.rowsPerPage = +limit;
    }

    this.setState(stateObj);
  }

  async componentDidMount() {
    await this.setPaginationValues();
    this.getPosts();
    this.load = true;
  }

  render() {
    const { count, rowsPerPage } = this.state;
    const { length } = this.state.posts;
    return (
      <React.Fragment>
        <div className="row">
          {length > 0 &&
            this.state.posts.map(post => <Post key={post._id} post={post} />)}
        </div>
        {count > LIMIT && (
          <TablePagination
            component="div"
            count={this.state.count}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            rowsPerPageOptions={[3, 6, 12, 24]}
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page'
            }}
            onChangePage={(e, p) => {
              this.handelPageChange(e, p);
            }}
            onChangeRowsPerPage={this.handelRowsPerPage.bind(this)}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Posts;
