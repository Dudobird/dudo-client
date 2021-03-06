import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { Router, Route } from "react-router-dom";
import history from './containers/history';
import 'moment/locale/zh-cn';
import 'react-notifications/lib/notifications.css';
import './index.css';

import { 
  Login, 
  Signup, 
  Storage, 
  Logout, 
  Profile,
  Share ,
  Controller,
  Admin, 
  Search} from './containers';
import { Header } from './components';
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
          <Header store={store} />
          <Controller />
          <PrivateRoute path="/admin" adminOnly={true} store={store} component={Admin}/>
          <PrivateRoute path="/share" store={store} component={Share} />
          <PrivateRoute path="/profile" store={store} component={Profile} />
          <PrivateRoute path="/search" exact store={store} component={Search} />
          <PrivateRoute path="/storage" exact store={store} component={Storage} />
          <PrivateRoute path="/storage/:id" store={store} component={Storage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/logout" store={store} component={Logout} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
