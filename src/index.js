import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { legacy_createStore as createStore, compose, applyMiddleware } from "redux";
import { rootReducer } from "./redux/rootReducer";
import thunk from "redux-thunk";
import { Provider } from 'react-redux';

export const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk
  ),
  // window.__REDUX_DEVTOOLS_EXTENSION && window.__REDUX_DEVTOOLS_EXTENSION__()
)); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);