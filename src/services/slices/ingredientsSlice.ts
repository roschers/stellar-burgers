import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
<<<<<<< HEAD
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

interface IngredientsState {
  items: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  items: [],
=======
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../utils/burger-api';
import { RootState } from '../store';

export type TStateIngredients = {
  ingredients: Array<TIngredient>;
  loading: boolean;
  error: null | string | undefined;
};

const initialState: TStateIngredients = {
  ingredients: [],
>>>>>>> 9fead279876fa10dc662dbe25d31b99fb77e25e2
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
<<<<<<< HEAD
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Произошла ошибка';
        state.items = [];
=======
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
>>>>>>> 9fead279876fa10dc662dbe25d31b99fb77e25e2
      });
  }
});

<<<<<<< HEAD
export const selectIngredients = (state: { ingredients: IngredientsState }) =>
  state.ingredients.items;
export const selectIngredientsLoading = (state: {
  ingredients: IngredientsState;
}) => state.ingredients.loading;
export const selectIngredientsError = (state: {
  ingredients: IngredientsState;
}) => state.ingredients.error;

export default ingredientsSlice.reducer;
=======
export default ingredientsSlice;

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectLoadingStatus = (state: RootState) =>
  state.ingredients.loading;
export const selectError = (state: RootState) => state.ingredients.error;
>>>>>>> 9fead279876fa10dc662dbe25d31b99fb77e25e2
