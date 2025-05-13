import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '../../utils/burger-api';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredients);
      if (!response?.order) {
        return rejectWithValue('Получен пустой ответ от сервера');
      }
      return response.order;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Ошибка при создании заказа');
    }
  }
);

export const getOrder = createAsyncThunk(
  'order/getOrder',
  async (number: string) => {
    const response = await getOrderByNumberApi(Number(number));
    if (!response.orders || response.orders.length === 0) {
      throw new Error('Заказ не найден');
    }
    return response.orders[0];
  }
);

interface Order {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

interface OrderState {
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  currentOrder: null,
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.currentOrder = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Ошибка при создании заказа';
        state.currentOrder = null;
      })
      // Get Order
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.currentOrder = action.payload;
        } else {
          state.error = 'Заказ не найден';
          state.currentOrder = null;
        }
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Ошибка при получении заказа';
        state.currentOrder = null;
      });
  }
});

export const { clearOrder, clearError } = orderSlice.actions;

export const selectCurrentOrder = (state: { order: OrderState }) =>
  state.order.currentOrder;
export const selectOrderLoading = (state: { order: OrderState }) =>
  state.order.loading;
export const selectOrderError = (state: { order: OrderState }) =>
  state.order.error;

export default orderSlice.reducer;
