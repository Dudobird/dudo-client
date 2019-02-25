import React from 'react';
import {Redirect,Route} from 'react-router-dom';

import {isAuthSuccess} from '../../lib/check-auth';
const PrivateRoute = ({ component: Component, store, ...rest }) => (
    <Route
        {...rest}
        render={props =>
        isAuthSuccess(store)? (
            <Component {...props} />
        ) : (
            <Redirect
            to={{
                pathname: "/login",
                state: { from: props.location }
            }}
            />
        )
        }
    />
);

export default PrivateRoute;