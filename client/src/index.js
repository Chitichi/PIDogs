import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./Redux/store";
import './index.css';
import App from './App';
  
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
    <Switch>
        <App />
    </Switch>
  
      </BrowserRouter>,
    </Provider>,
    document.getElementById('root')
  );
  



