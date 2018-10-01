import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import logo from '../logo.svg';
import './NavBar.css';

class NavBar extends Component {
  state = {};
  render() {
    const MyLink = props => <Link to={`/sign-up`} {...props} />;

    return (
      <div className="p-3 px-md-4 mb-3-em bg-white box-shadow">
        <div className="container d-flex flex-column flex-md-row align-items-center ">
          <div className="navbar-header">
            <a href="/" className="navbar-brand">
              <img src={logo} />
              <span>BLOG</span>
            </a>
          </div>
          <div className="mr-md-auto" />
          <nav className="my-2 my-md-0 mr-md-3">
            <NavLink className="p-2 text-dark" to="/">
              HOME
            </NavLink>
            <NavLink className="p-2 text-dark" to="/login">
              LOGIN
            </NavLink>
          </nav>
          <Button component={MyLink} variant="outlined" color="primary">
            Sign up
          </Button>
        </div>
      </div>
    );
  }
}

export default NavBar;
