import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import NavBar from './navbar/NavBar';
import Signup from './signup/Signup';
import Login from './login/Login';
import Logout from './logout/Logout';
import Home from './home/Home';
import SinglePost from './post/SinglePost';
import Author from './author/Author';
import MyPosts from './admin/MyPosts';
import NewPost from './admin/NewPost';
import ProfileView from './admin/ProfileView';
import ProfileEdit from './admin/ProfileEdit';
import ChangePassword from './admin/ChangePassword';
import NotFound from './notFound/NotFound';
import ProtectedRoute from './common/ProtectedRoute';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './login/Login.css';
import './navbar/NavBar.css';
import './admin/Admin.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <NavBar />
          <main className="container">
            <Switch>
              <Route path="/sign-up" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/post/:id/:title" component={SinglePost} />
              <Route path="/author/:id/:name" component={Author} />
              <ProtectedRoute
                path="/admin/myprofile/view/:id"
                component={ProfileView}
              />
              <ProtectedRoute
                path="/admin/myprofile/edit/:id"
                component={ProfileEdit}
              />
              <ProtectedRoute
                path="/admin/password/:id"
                component={ChangePassword}
              />
              <ProtectedRoute
                path="/admin/post/:type/:id?"
                exact
                render={props => <NewPost key={new Date()} {...props} />}
              />
              <ProtectedRoute
                path="/admin/myposts/:status"
                component={MyPosts}
              />
              <Route path="/login" component={Login} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/" exact component={Home} />
              <Redirect to="/not-found" />
            </Switch>
          </main>
          <footer className="footer">
            <div className="container text-center">
              <p>© 2016 Rohit Kumar Gautam.</p>
            </div>
          </footer>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
