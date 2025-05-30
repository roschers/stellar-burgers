import { RootState } from './store';
import { TIngredient, TOrder } from '../utils/types';

// Селекторы для ингредиентов
export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.loading;
export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;

// Селекторы для конструктора бургера
export const selectConstructorIngredients = (state: RootState) =>
  state.burgerconstructor.constructorItems.ingredients;
export const selectConstructorBun = (state: RootState) =>
  state.burgerconstructor.constructorItems.bun;
export const selectConstructorTotal = (state: RootState) => {
  const ingredients = state.burgerconstructor.constructorItems.ingredients;
  const bun = state.burgerconstructor.constructorItems.bun;
  return (
    ingredients.reduce(
      (sum: number, item: TIngredient) => sum + item.price,
      0
    ) + (bun ? bun.price * 2 : 0)
  );
};

// Селекторы для пользователя
export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;
export const selectIsAuthenticated = (state: RootState) => !!state.user.user;

// Селекторы для ленты заказов
export const selectFeedOrders = (state: RootState) => state.feeddata.orders;
export const selectFeedTotal = (state: RootState) => state.feeddata.total;
export const selectFeedTotalToday = (state: RootState) =>
  state.feeddata.totalToday;
export const selectFeedLoading = (state: RootState) => state.feeddata.loading;
export const selectFeedError = (state: RootState) => state.feeddata.error;
export const selectFeedModalOrder = (state: RootState) =>
  state.feeddata.modalOrder;

// Селекторы для истории заказов пользователя
export const selectUserOrders = (state: RootState) =>
  state.ordershistory.orders;
export const selectUserOrdersLoading = (state: RootState) =>
  state.ordershistory.loading;
export const selectUserOrdersError = (state: RootState) =>
  state.ordershistory.error;
export const selectUserOrdersModalOrder = (state: RootState) =>
  state.ordershistory.modalOrder;

// Селектор для получения заказа по номеру
export const selectOrderByNumber = (state: RootState, number: number) =>
  state.feeddata.orders.find((order: TOrder) => order.number === number) ||
  state.ordershistory.orders.find((order: TOrder) => order.number === number);
