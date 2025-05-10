import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredientsSlice';
import userReducer from '../slices/userSlice';
import orderReducer from '../slices/orderSlice';
import constructorReducer from '../slices/constructorSlice';
import feedReducer from '../slices/feedSlice';
import ordersReducer from '../slices/ordersSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  order: orderReducer,
  constructor: constructorReducer,
  feed: feedReducer,
  orders: ordersReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
