import React, { Component } from 'react';
import queryString from 'query-string';
import TablePagination from '@material-ui/core/TablePagination';
import Post from './Post';
import './Post.css';

const LIMIT = 10;

class Posts extends Component {
  state = {
    posts: [],
    count: 0,
    rowsPerPage: LIMIT,
    page: 0,
    query: '',
    load: false
  };

  async handelPageChange(e, page) {
    await this.setState({ page });
    this.updateQuryParams('page');
  }

  async handelRowsPerPage(e) {
    const { value } = e.target;
    await this.setState({ rowsPerPage: value, page: 0 });
    this.getPosts();
  }

  async getPosts() {
    try {
      const query = await this.getQuery();

      const response = await fetch(`http://localhost:3000/api/posts?${query}`, {
        mode: 'cors'
      });
      const { posts, total: count } = await response.json();

      this.setState({ posts, count, load: true });
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
    const { page, rowsPerPage: limit, query } = this.state;
    const { category, createdBy: cb, q: qParam } = queryString.parse(query);
    const { createdBy = cb } = this.props;

    url.set('page', page + 1);
    url.set('limit', limit);

    if (qParam) {
      url.set('q', qParam);
    }

    if (createdBy) {
      url.set('createdBy', createdBy);
    }

    if (category) {
      url.set('category', category);
    }

    return url.toString();
  }

  setPaginationValues() {
    const stateObj = {
      query: this.props.location.search
    };
    const { page, limit } = queryString.parse(this.props.location.search);

    if (!isNaN(page)) {
      stateObj.page = (+page || 1) - 1;
    }

    if (!isNaN(limit)) {
      stateObj.rowsPerPage = +limit;
    }

    this.setState(stateObj);
  }

  noRecord() {
    const { category, q: qParam } = queryString.parse(this.state.query);

    return (
      <div className="text-center col">
        <h1>:( OOPS</h1>
        <h3>
          {category ? (
            <React.Fragment>
              No record found for{' '}
              <span className="text-danger">{category}</span> Category.
            </React.Fragment>
          ) : qParam ? (
            <React.Fragment>
              Your search - <span className="text-danger">{qParam} </span>- did
              not match any documents.
            </React.Fragment>
          ) : (
            'No record found.'
          )}
        </h3>
      </div>
    );
  }

  async componentDidMount() {
    await this.setPaginationValues();
    this.getPosts();
  }

  async componentWillReceiveProps(newProps) {
    const query = newProps.location.search;

    if (query !== this.state.query && this.state.load) {
      await this.setState({ query });
      this.getPosts();
    }
  }

  render() {
    const { count, rowsPerPage, load } = this.state;
    const { length } = this.state.posts;
    const { col = 2, editable = null } = this.props;

    return (
      <React.Fragment>
        {load && (
          <div className="row">
            {length === 0
              ? this.noRecord()
              : this.state.posts.map(post => (
                  <Post
                    key={post._id}
                    col={col}
                    editable={editable}
                    post={post}
                  />
                ))}
          </div>
        )}
        {count > LIMIT && (
          <TablePagination
            component="div"
            count={this.state.count}
            rowsPerPage={rowsPerPage}
            page={this.state.page}
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
