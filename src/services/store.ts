import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
import rootReducer from './store/rootReducer';
=======
import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import burgerConstructorSlice from './slices/burgerConstructorSlice';
import userReducer from './slices/userSlice';
import feedDataSlice from './slices/FeedDataSlice';
import userOrdersHistorySlice from './slices/orderSlice';
import currentIngredientReducer from './slices/currentIngredientSlice';
>>>>>>> 9fead279876fa10dc662dbe25d31b99fb77e25e2

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

<<<<<<< HEAD
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Игнорируем определенные пути в состоянии
        ignoredPaths: ['constructor']
      }
=======
// Комбинируем все слайсы в один корневой редьюсер
const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  burgerconstructor: burgerConstructorSlice.reducer,
  feeddata: feedDataSlice.reducer,
  user: userReducer,
  ordershistory: userOrdersHistorySlice.reducer,
  currentIngredient: currentIngredientReducer
});

export { rootReducer };

// Создаем Redux-хранилище с использованием корневого редьюсера
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
>>>>>>> 9fead279876fa10dc662dbe25d31b99fb77e25e2
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
<<<<<<< HEAD
=======

>>>>>>> 9fead279876fa10dc662dbe25d31b99fb77e25e2
export type AppDispatch = typeof store.dispatch;

// Создаем собственные хуки для использования dispatch и selector с типизацией
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
