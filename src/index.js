import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore, compose} from 'redux'
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { Router, Route } from "react-router-dom";
import history from './history';

import 'react-notifications/lib/notifications.css';
import './index.css';

import Login from './login';
import Signup from './signup';
import Storage from './storage';
import {Header} from './components';
import IndexReducer from './index-reducers';
import IndexSagas from './index-sagas';

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
          <PrivateRoute path="/storage" store={store} component={Storage}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
        </div>
      </Router>
    </Provider>, 
    document.getElementById('root')
);
