import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';
import { RootState } from '../store';

export type TStateFeed = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: null | string;
  loading: boolean;
  modalOrder: TOrder | null;
};

const initialState: TStateFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  loading: false,
  modalOrder: null
};

export const getFeedData = createAsyncThunk('feed/data', getFeedsApi);

export const getOrderByNum = createAsyncThunk(
  'feed/getOrder',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response;
    } catch (error) {
      return rejectWithValue('Error feed data');
    }
  }
);

export const feedDataSlice = createSlice({
  name: 'feeddata',
  initialState,
  reducers: {
    updateOrders: (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      })
      .addCase(getFeedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Feed error';
      })
      .addCase(getOrderByNum.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNum.fulfilled, (state, action) => {
        state.loading = false;
        state.modalOrder = action.payload.orders[0];
      })
      .addCase(getOrderByNum.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Feed error';
      });
  }
});

export const { updateOrders } = feedDataSlice.actions;
export default feedDataSlice;

// Селекторы
export const selectFeedOrders = (state: RootState) => state.feeddata.orders;
export const selectFeedTotal = (state: RootState) => state.feeddata.total;
export const selectFeedTotalToday = (state: RootState) => state.feeddata.totalToday;
export const selectFeedLoading = (state: RootState) => state.feeddata.loading;
export const selectFeedError = (state: RootState) => state.feeddata.error;
export const selectFeedModalOrder = (state: RootState) => state.feeddata.modalOrder; 