import React, { Component } from 'react';
import queryString from 'query-string';
import TablePagination from '@material-ui/core/TablePagination';
import Post from './Post';
import './Post.css';

class Posts extends Component {
  state = { posts: [], count: 0, rowsPerPage: 12, page: 0 };

  handelPageChange(e, page) {
    this.props.history.push(`/?page=${page + 1}`);
    this.setState({ page });
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

  componentDidMount() {
    this.getPosts();
  }

  getQuery() {
    const queryArray = [`limit=${this.state.rowsPerPage}`];
    const { createdBy } = this.props;
    const { category, page } = queryString.parse(this.props.location.search);

    if (createdBy) {
      queryArray.push(`createdBy=${createdBy}`);
    }

    if (category) {
      queryArray.push(`category=${category}`);
    }

    if (page) {
      queryArray.push(`page=${page}`);
    } else {
      queryArray.push(`page=${this.state.page + 1}`);
    }

    return queryArray.join('&');
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
        {count > rowsPerPage && (
          <TablePagination
            component="div"
            count={this.state.count}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            rowsPerPageOptions={[12, 24, 36, 48, 60]}
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page'
            }}
            onChangePage={this.handelPageChange.bind(this)}
            onChangeRowsPerPage={() => {
              console.log('onChangeRowsPerPage');
            }}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Posts;
