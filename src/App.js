import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './navbar/NavBar';
import Signup from './signup/Signup';
import Login from './login/Login';
import Posts from './post/Posts';
import SinglePost from './post/SinglePost';
import Author from './author/Author';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
              <Route path="/post/:id/:title" component={SinglePost} />
              <Route path="/author/:id/:name" component={Author} />
              <Route path="/login" component={Login} />
              <Route path="/" exact component={Posts} />
            </Switch>
          </main>
          <footer>
            <div class="container text-center">
              <p>© 2016 Rohit Kumar Gautam.</p>
            </div>
          </footer>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
