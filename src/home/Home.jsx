import React, { Component } from 'react';
import Posts from '../post/Posts';
import Categories from '../categorie/Categories';

class Home extends Component {
  state = { author: {} };

  render() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <Posts createdBy={id} {...this.props} />
          </div>
          <div className="col-md-3">
            <input
              type="serach"
              className="serach-input"
              placeholder="Search a post"
            />
            <Categories />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
