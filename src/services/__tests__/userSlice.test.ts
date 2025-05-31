import userSlice, {
  login,
  register,
  logout,
  getUser,
  updateUser,
  checkUserAuth,
  clearError
} from '../slices/userSlice';

// Моковые данные
const mockUser = {
  email: 'test@example.com',
  name: 'Тестовый пользователь'
};

const mockUserData = {
  email: 'test@example.com',
  password: 'password123',
  name: 'Тестовый пользователь'
};

describe('userSlice', () => {
  const initialState = {
    user: null,
    loading: false,
    error: null
  };

  afterEach(() => {
    // Очистка моковых данных после каждого теста
    jest.clearAllMocks();
  });

  describe('clearError', () => {
    it('должен очищать ошибку', () => {
      const stateWithError = {
        ...initialState,
        error: 'Тестовая ошибка'
      };

      // 1. Проверяем, что есть ошибка
      expect(stateWithError.error).toBe('Тестовая ошибка');

      // 2. Выполняем действие
      const action = clearError();
      const newState = userSlice(stateWithError, action);

      // 3. Проверяем, что ошибка очистилась
      expect(newState.error).toBeNull();
    });
  });

  describe('login async thunk', () => {
    it('должен обрабатывать начало авторизации', () => {
      // 1. Проверяем изначальное состояние
      expect(initialState.loading).toBe(false);
      expect(initialState.error).toBeNull();

      // 2. Выполняем действие
      const action = { type: login.pending.type };
      const newState = userSlice(initialState, action);

      // 3. Проверяем, что началась загрузка
      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });

    it('должен обрабатывать успешную авторизацию', () => {
      const stateWithLoading = {
        ...initialState,
        loading: true
      };

      // 1. Проверяем, что пользователя нет и идет загрузка
      expect(stateWithLoading.user).toBeNull();
      expect(stateWithLoading.loading).toBe(true);

      // 2. Выполняем действие
      const action = {
        type: login.fulfilled.type,
        payload: mockUser
      };
      const newState = userSlice(stateWithLoading, action);

      // 3. Проверяем, что пользователь авторизован
      expect(newState.loading).toBe(false);
      expect(newState.user).toEqual(mockUser);
    });

    it('должен обрабатывать ошибку авторизации', () => {
      const stateWithLoading = {
        ...initialState,
        loading: true
      };

      const errorMessage = 'Неверные учетные данные';

      // 1. Проверяем, что идет загрузка
      expect(stateWithLoading.loading).toBe(true);
      expect(stateWithLoading.error).toBeNull();

      // 2. Выполняем действие
      const action = {
        type: login.rejected.type,
        error: { message: errorMessage }
      };
      const newState = userSlice(stateWithLoading, action);

      // 3. Проверяем, что загрузка завершена с ошибкой
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(errorMessage);
      expect(newState.user).toBeNull();
    });
  });

  describe('register async thunk', () => {
    it('должен обрабатывать начало регистрации', () => {
      // 1. Проверяем изначальное состояние
      expect(initialState.loading).toBe(false);
      expect(initialState.error).toBeNull();

      // 2. Выполняем действие
      const action = { type: register.pending.type };
      const newState = userSlice(initialState, action);

      // 3. Проверяем, что началась загрузка
      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });

    it('должен обрабатывать успешную регистрацию', () => {
      const stateWithLoading = {
        ...initialState,
        loading: true
      };

      // 1. Проверяем, что пользователя нет и идет загрузка
      expect(stateWithLoading.user).toBeNull();
      expect(stateWithLoading.loading).toBe(true);

      // 2. Выполняем действие
      const action = {
        type: register.fulfilled.type,
        payload: mockUser
      };
      const newState = userSlice(stateWithLoading, action);

      // 3. Проверяем, что пользователь зарегистрирован
      expect(newState.loading).toBe(false);
      expect(newState.user).toEqual(mockUser);
    });

    it('должен обрабатывать ошибку регистрации', () => {
      const stateWithLoading = {
        ...initialState,
        loading: true
      };

      const errorMessage = 'Пользователь уже существует';

      // 1. Проверяем, что идет загрузка
      expect(stateWithLoading.loading).toBe(true);
      expect(stateWithLoading.error).toBeNull();

      // 2. Выполняем действие
      const action = {
        type: register.rejected.type,
        error: { message: errorMessage }
      };
      const newState = userSlice(stateWithLoading, action);

      // 3. Проверяем, что загрузка завершена с ошибкой
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(errorMessage);
      expect(newState.user).toBeNull();
    });
  });

  describe('logout async thunk', () => {
    it('должен обрабатывать выход из системы', () => {
      const stateWithUser = {
        ...initialState,
        user: mockUser
      };

      // 1. Проверяем, что пользователь авторизован
      expect(stateWithUser.user).toEqual(mockUser);

      // 2. Выполняем действие
      const action = { type: logout.fulfilled.type };
      const newState = userSlice(stateWithUser, action);

      // 3. Проверяем, что пользователь вышел из системы
      expect(newState.user).toBeNull();
    });
  });

  describe('getUser async thunk', () => {
    it('должен обрабатывать начало получения данных пользователя', () => {
      // 1. Проверяем изначальное состояние
      expect(initialState.loading).toBe(false);
      expect(initialState.error).toBeNull();

      // 2. Выполняем действие
      const action = { type: getUser.pending.type };
      const newState = userSlice(initialState, action);

      // 3. Проверяем, что началась загрузка
      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });

    it('должен обрабатывать успешное получение данных пользователя', () => {
      const stateWithLoading = {
        ...initialState,
        loading: true
      };

      // 1. Проверяем, что пользователя нет и идет загрузка
      expect(stateWithLoading.user).toBeNull();
      expect(stateWithLoading.loading).toBe(true);

      // 2. Выполняем действие
      const action = {
        type: getUser.fulfilled.type,
        payload: mockUser
      };
      const newState = userSlice(stateWithLoading, action);

      // 3. Проверяем, что данные пользователя получены
      expect(newState.loading).toBe(false);
      expect(newState.user).toEqual(mockUser);
    });

    it('должен обрабатывать ошибку получения данных пользователя', () => {
      const stateWithLoading = {
        ...initialState,
        loading: true
      };

      const errorMessage = 'Ошибка при получении данных пользователя';

      // 1. Проверяем, что идет загрузка
      expect(stateWithLoading.loading).toBe(true);
      expect(stateWithLoading.error).toBeNull();

      // 2. Выполняем действие
      const action = {
        type: getUser.rejected.type,
        error: { message: errorMessage }
      };
      const newState = userSlice(stateWithLoading, action);

      // 3. Проверяем, что загрузка завершена с ошибкой
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(errorMessage);
    });
  });

  describe('updateUser async thunk', () => {
    it('должен обрабатывать начало обновления данных пользователя', () => {
      // 1. Проверяем изначальное состояние
      expect(initialState.loading).toBe(false);
      expect(initialState.error).toBeNull();

      // 2. Выполняем действие
      const action = { type: updateUser.pending.type };
      const newState = userSlice(initialState, action);

      // 3. Проверяем, что началась загрузка
      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });

    it('должен обрабатывать успешное обновление данных пользователя', () => {
      const stateWithUser = {
        ...initialState,
        user: mockUser,
        loading: true
      };

      const updatedUser = {
        ...mockUser,
        name: 'Обновленное имя'
      };

      // 1. Проверяем старые данные пользователя и загрузку
      expect(stateWithUser.user).toEqual(mockUser);
      expect(stateWithUser.loading).toBe(true);

      // 2. Выполняем действие
      const action = {
        type: updateUser.fulfilled.type,
        payload: updatedUser
      };
      const newState = userSlice(stateWithUser, action);

      // 3. Проверяем, что данные пользователя обновлены
      expect(newState.loading).toBe(false);
      expect(newState.user).toEqual(updatedUser);
    });

    it('должен обрабатывать ошибку обновления данных пользователя', () => {
      const stateWithLoading = {
        ...initialState,
        loading: true
      };

      const errorMessage = 'Ошибка при обновлении данных пользователя';

      // 1. Проверяем, что идет загрузка
      expect(stateWithLoading.loading).toBe(true);
      expect(stateWithLoading.error).toBeNull();

      // 2. Выполняем действие
      const action = {
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      };
      const newState = userSlice(stateWithLoading, action);

      // 3. Проверяем, что загрузка завершена с ошибкой
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(errorMessage);
    });
  });

  describe('checkUserAuth async thunk', () => {
    it('должен обрабатывать успешную проверку авторизации', () => {
      // 1. Проверяем, что пользователя нет
      expect(initialState.user).toBeNull();

      // 2. Выполняем действие
      const action = {
        type: checkUserAuth.fulfilled.type,
        payload: mockUser
      };
      const newState = userSlice(initialState, action);

      // 3. Проверяем, что пользователь установлен
      expect(newState.user).toEqual(mockUser);
    });

    it('должен обрабатывать неудачную проверку авторизации (неавторизованный)', () => {
      // 1. Проверяем изначальное состояние
      expect(initialState.user).toBeNull();
      expect(initialState.error).toBeNull();

      // 2. Выполняем действие - пользователь неавторизован
      const action = {
        type: checkUserAuth.rejected.type,
        payload: 'unauthorized'
      };
      const newState = userSlice(initialState, action);

      // 3. Проверяем, что пользователь остался null и ошибки нет
      expect(newState.user).toBeNull();
      expect(newState.error).toBeNull();
    });

    it('должен обрабатывать ошибку проверки авторизации', () => {
      const errorMessage = 'Ошибка при проверке авторизации';

      // 1. Проверяем изначальное состояние
      expect(initialState.error).toBeNull();

      // 2. Выполняем действие - другая ошибка
      const action = {
        type: checkUserAuth.rejected.type,
        error: { message: errorMessage }
      };
      const newState = userSlice(initialState, action);

      // 3. Проверяем, что ошибка установлена
      expect(newState.error).toBe(errorMessage);
    });
  });
});
