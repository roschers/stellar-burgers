import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export type TStateOrdersHistory = {
  orders: TOrder[];
  loading: boolean;
  error: null | string | undefined;
  modalOrder: TOrder | null;
};

const initialState: TStateOrdersHistory = {
  orders: [],
  loading: false,
  error: null,
  modalOrder: null
};

export const ordersHistory = createAsyncThunk(
  'user/orderHistory',
  getOrdersApi
);

export const getOrderByNumber = createAsyncThunk(
  'user/getOrderByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response;
    } catch (error) {
      return rejectWithValue('Error getting order');
    }
  }
);

export const userOrdersHistorySlice = createSlice({
  name: 'ordershistory',
  initialState,
  reducers: {
    updateOrdersHistory: (state, action) => {
      state.orders = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(ordersHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ordersHistory.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(ordersHistory.rejected, (state, action) => {
        state.error = action.error.message || 'Error orders history';
        state.loading = false;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.modalOrder = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error getting order';
      });
  }
});

export const { updateOrdersHistory } = userOrdersHistorySlice.actions;
export default userOrdersHistorySlice;

export const selectCurrentOrder = (state: any) =>
  state.ordershistory.modalOrder;
export const selectOrderError = (state: any) => state.ordershistory.error;
export const selectOrderLoading = (state: any) => state.ordershistory.loading;
export const selectOrders = (state: any) => state.ordershistory.orders;
