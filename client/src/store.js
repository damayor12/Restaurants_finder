import { createStore, applyMiddleware } from 'redux';
import persistStore from 'redux-persist/es/persistStore';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import persistedReducer from './redux/rootReducer';

const middlewares = [thunk];

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export const persistor = persistStore(store);
