import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';

interface CurrentIngredientState {
  ingredient: TIngredient | null;
}

const initialState: CurrentIngredientState = {
  ingredient: null
};

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    setCurrentIngredient(state, action: PayloadAction<TIngredient | null>) {
      state.ingredient = action.payload;
    }
  }
});

export const { setCurrentIngredient } = currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;
