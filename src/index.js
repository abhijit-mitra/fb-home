import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import 'react-dates/initialize';

import store, {history} from './store';
import App from './app';
import {Toast} from './components/common/withRedux';

import './index.css';

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <Router history={history}>
      <App/>
    </Router>
    <Toast />
  </Provider>,
  target,
);
