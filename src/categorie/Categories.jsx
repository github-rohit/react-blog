import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Categorie.css';

class Categories extends Component {
  state = {
    categories: [
      {
        count: 2,
        _id: '59f5fceff36d28236307eb23',
        category: 'Technology',
        __v: 0
      },
      { count: 0, _id: '59f5fd5af36d28236307eb2d', category: 'Music', _v: 0 },
      { count: 0, _id: '59f5fdaaf36d28236307eb36', category: 'Fashion' },
      { count: 0, _id: '59f5fdb5f36d28236307eb37', category: 'Movie' },
      { count: 0, _id: '59f5fdc2f36d28236307eb39', category: 'Law' },
      { count: 0, _id: '59f5fdcbf36d28236307eb3b', category: 'History' },
      {
        count: 0,
        _id: '5a6b5fcc734d1d6303187348',
        category: 'Uncategorized',
        __v: 0
      }
    ]
  };

  async componentDidMount() {
    // try {
    //   const { id } = this.props.match.params;
    //   const response = await fetch(`http://localhost:3000/api/categories`, {
    //     mode: 'cors'
    //   });
    //   const post = await response.json();
    //   this.setState({ post });
    // } catch (ex) {
    //   console.log(ex);
    // }
  }

  render() {
    return (
      <React.Fragment>
        <ul className="category-nav">
          {this.state.categories.map(c => (
            <li key={c._id}>
              <Link to={`/?category=${c.category}`}>{c.category}</Link>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default Categories;
