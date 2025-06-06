import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  getUserApi,
  updateUserApi
} from '../../utils/burger-api';
import { RootState } from '../store';

export const login = createAsyncThunk(
  'user/login',
  async (data: { email: string; password: string }) => {
    const response = await loginUserApi(data);
    return response.user;
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (data: { email: string; password: string; name: string }) => {
    const response = await registerUserApi(data);
    return response.user;
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
});

export const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await getUserApi();
  return response.user;
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: { name: string; email: string; password: string }) => {
    const response = await updateUserApi(data);
    return response.user;
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (error) {
      // Если ошибка не связана с токеном, пробрасываем её дальше
      if (
        (error as { message: string }).message !== 'jwt expired' &&
        (error as { message: string }).message !== 'jwt malformed' &&
        (error as { message: string }).message !== 'Token is invalid'
      ) {
        throw error;
      }
      // Если ошибка связана с токеном, считаем пользователя неавторизованным
      return rejectWithValue('unauthorized');
    }
  }
);

interface User {
  email: string;
  name: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Ошибка при входе';
        state.user = null;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Ошибка при регистрации';
        state.user = null;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      })
      // Get User
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Ошибка при получении данных пользователя';
        state.user = null;
      })
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Ошибка при обновлении данных пользователя';
      })
      // Check Auth
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.loading = false;
        if (action.payload !== 'unauthorized') {
          state.error = action.error.message || 'Ошибка при проверке авторизации';
        }
        state.user = null;
      });
  }
});

export const { clearError } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;
export const selectIsAuthenticated = (state: RootState) => !!state.user.user;

export default userSlice.reducer;
