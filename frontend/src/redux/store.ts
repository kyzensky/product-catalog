import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import dataReducer from './data/dataReducer';
import { shoppingCartReducer } from './shoppingCart';
import { mobileMenuReducer } from './mobileMenu';
import { AnyAction } from 'redux';

const reducers = combineReducers({
  data: dataReducer,
  shoppingCart: shoppingCartReducer,
  mobileMenu: mobileMenuReducer,
});

const store = createStore(reducers, compose(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export default store;

