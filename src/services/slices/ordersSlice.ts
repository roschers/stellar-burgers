import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

interface OrdersState {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const getOrders = createAsyncThunk('orders/getOrders', async () => {
  const response = await getOrdersApi();
  return response;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Ошибка при загрузке истории заказов';
      });
  }
});

export const { clearError } = ordersSlice.actions;

export const selectOrders = (state: { orders: OrdersState }) =>
  state.orders.orders;
export const selectOrdersLoading = (state: { orders: OrdersState }) =>
  state.orders.loading;
export const selectOrdersError = (state: { orders: OrdersState }) =>
  state.orders.error;

export default ordersSlice.reducer;
