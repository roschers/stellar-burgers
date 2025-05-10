import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const getFeeds = createAsyncThunk('feed/getFeeds', async () => {
  const response = await getFeedsApi();
  return response;
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Ошибка при загрузке ленты заказов';
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
      });
  }
});

export const { clearError } = feedSlice.actions;

export const selectFeeds = (state: { feed: FeedState }) => state.feed.orders;
export const selectFeedTotal = (state: { feed: FeedState }) => state.feed.total;
export const selectFeedTotalToday = (state: { feed: FeedState }) =>
  state.feed.totalToday;
export const selectFeedLoading = (state: { feed: FeedState }) =>
  state.feed.loading;
export const selectFeedError = (state: { feed: FeedState }) => state.feed.error;

export default feedSlice.reducer;
