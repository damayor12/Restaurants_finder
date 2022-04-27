import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.min.css';
import { Route } from 'react-router-dom';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
