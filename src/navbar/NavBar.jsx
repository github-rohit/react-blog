import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import authService from '../common/services/AuthService';
import logo from '../logo.svg';

class NavBar extends Component {
  state = { user: '', anchorEl: null, mobileMenuOpen: false };

  async componentDidMount() {
    const user = await authService.user;
    this.setState({ user });
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMobileMenu = () => {
    document.body.classList.toggle('mobile-body-overflow');

    this.setState({
      mobileMenuOpen: this.state.mobileMenuOpen ? false : true
    });
  };

  userAvatarText(name) {
    let text = '';

    if (name.length) {
      const arr = name.split(' ');
      text += arr[0].charAt(0);
      text += arr.length > 1 ? arr.pop().charAt(0) : '';
    }

    return text;
  }

  render() {
    const { user, anchorEl, mobileMenuOpen } = this.state;
    const SignUpLink = props => <Link to={`/sign-up`} {...props} />;

    return (
      <header className="navbar navbar-expand">
        <div className="container">
          <div className="navbar-header">
            <NavLink className="navbar-brand" to="/">
              <img height="40" src={logo} alt="nirmalrohit.com" />
              <span>BLOG</span>
            </NavLink>
          </div>
          <button
            type="button"
            className={`menu-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={this.handleMobileMenu.bind(this)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav
            className={`navbar navbar-menu flex-md-row ${
              mobileMenuOpen ? 'navbar-dropdown' : ''
            }`}
            onClick={this.handleMobileMenu.bind(this)}
          >
            <ul className="navbar-nav mr-auto navbar-nav-left">
              <li>
                <NavLink exact to="/">
                  HOME
                </NavLink>
              </li>
              {user && (
                <li>
                  <NavLink to="/logout">MY POSTS</NavLink>
                </li>
              )}
            </ul>
            {!user && (
              <React.Fragment>
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <NavLink to="/login">LOGIN</NavLink>
                  </li>
                </ul>
                {
                  <Button
                    className="menu-signup-btn"
                    component={SignUpLink}
                    variant="outlined"
                    color="primary"
                  >
                    SIGN UP
                  </Button>
                }
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <ul className="nav navbar-nav navbar-right mobile-show">
                  <li>
                    <NavLink to="/admin/profile">MY PROFILE</NavLink>
                  </li>
                  <li>
                    <NavLink to="/logout">LOGOUT</NavLink>
                  </li>
                </ul>
                <ul className="nav navbar-nav navbar-right mobile-hide">
                  <li>
                    <a
                      aria-owns={anchorEl ? 'simple-menu' : null}
                      onClick={this.handleClick.bind(this)}
                      className="user-avatar rounded-circle"
                    >
                      <span>{this.userAvatarText(user.name)}</span>
                    </a>
                  </li>
                </ul>
                <Menu
                  className="user-dropdown"
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose.bind(this)}
                >
                  <li>
                    <NavLink to="admin/profile" className="d-flex">
                      <div className="user-avatar rounded-circle align-self-center col">
                        <span>{this.userAvatarText(user.name)}</span>
                      </div>
                      <div className="col">
                        <div className="uname">{user.name}</div>
                        <div className="email small">{user.email}</div>
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="color" to="/logout">
                      LOGOUT
                    </NavLink>
                  </li>
                </Menu>
              </React.Fragment>
            )}
          </nav>
        </div>
      </header>
    );
  }
}

export default NavBar;
