import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cartReducer } from './reducers/cartReducer';
import { detailsReducer } from './reducers/detailsReducer';
import { favoritesReducer } from './reducers/favoritesReducer';

import { modalReducer } from './reducers/modalReducer';
import { restaurantsReducer } from './reducers/restaurantsReducers';

import user from './reducers/userReducer';

// import userReducer from './user/user.reducer';
// import cartReducer from './cart/cart.reducer';
// import shopReducer from './shop/shop.reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user,
  modal: modalReducer,
  restaurants: restaurantsReducer,
  favorites: favoritesReducer,
  details: detailsReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
