import React, { Component } from 'react';
import Posts from '../post/Posts';
import Categories from '../categorie/Categories';
import SearchInput from '../form/SearchInput';

class Home extends Component {
  state = { serachQuery: '' };

  handelOnKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.history.push(`?q=${e.target.value}`);
    }
  }

  componentDidMount() {
    const url = new URLSearchParams(this.props.location.search);
    const serachQuery = url.get('q');

    if (serachQuery) {
      this.setState({ serachQuery });
    }
  }

  render() {
    const serachQuery = this.state.serachQuer;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <Posts {...this.props} />
          </div>
          <div className="col-md-3">
            <SearchInput
              value={serachQuery}
              onKeyPress={this.handelOnKeyPress.bind(this)}
            />
            <Categories />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
