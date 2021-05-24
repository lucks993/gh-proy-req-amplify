import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app/app';
import { Provider } from 'react-redux';
import store from './store';
import ErrorBoundary from './errors/error-boundary'


ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
    <App />
    </ErrorBoundary>
  </Provider>
 
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
