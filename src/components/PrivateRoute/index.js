import React from 'react';
import {Redirect,Route} from 'react-router-dom';

import {isAuthSuccess, isAdminOnly} from '../../lib/check-auth';
const PrivateRoute = ({ component: Component, store, ...rest }) => {
    let checkLevel = isAuthSuccess
    if(rest.adminOnly === true ){
        checkLevel = isAdminOnly
    }
    return (<Route
        {...rest}
        render={props =>
        checkLevel(store)? (
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
    />)
    
};

export default PrivateRoute;