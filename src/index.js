import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { legacy_createStore as createStore, compose, applyMiddleware } from "redux";
import { rootReducer } from "./redux/rootReducer";
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        yellow: {
            main: '#feee00;',
        },
    },
});

export const store = createStore(rootReducer, compose(
  composeWithDevTools(
    applyMiddleware(
      thunk
    )
  )
)); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
);