import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from '../common/services/AuthService';

function ProtectedRoute({ path, component: Component, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (!authService.user) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}

export default ProtectedRoute;
