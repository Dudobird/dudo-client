import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore, compose} from 'redux'
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { Router, Route } from "react-router-dom";
import history from './containers/history';

import 'react-notifications/lib/notifications.css';
import './index.css';

import {Login,Signup,Storage,Logout} from './containers';
import {Header} from './components';
import IndexReducer from './containers/reducers';
import IndexSagas from './containers/sagas';

import { PrivateRoute } from './components';

const sagaMiddleware = createSagaMiddleware()

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&  
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */


const store = createStore(IndexReducer, composeSetup(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(IndexSagas);

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Header store={store}/>
          <PrivateRoute path="/storage" exact store={store} component={Storage}/>
          <PrivateRoute path="/storage/:id" store={store} component={Storage}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <PrivateRoute path="/logout"  store={store} component={Logout}/>
        </div>
      </Router>
    </Provider>, 
    document.getElementById('root')
);
