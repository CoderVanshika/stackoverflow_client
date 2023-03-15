import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from'redux-thunk'
import Reducers from './reducers'
//import Kommunicate from '@kommunicate/kommunicate-chatbot-plugin';

//Kommunicate.init("2d98aeb2ff51946247fad96102b3c3c22")
const store = createStore( Reducers, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);