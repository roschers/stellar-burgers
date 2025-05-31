import ingredientsSlice, { getIngredients } from '../slices/ingredientsSlice';
import { TIngredient } from '@utils-types';

// Моковые данные
const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Тестовый ингредиент 1',
    type: 'main',
    price: 100,
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 100,
    image: 'test1.jpg',
    image_mobile: 'test1-mobile.jpg',
    image_large: 'test1-large.jpg'
  },
  {
    _id: '2',
    name: 'Тестовый ингредиент 2',
    type: 'sauce',
    price: 50,
    proteins: 5,
    fat: 5,
    carbohydrates: 5,
    calories: 50,
    image: 'test2.jpg',
    image_mobile: 'test2-mobile.jpg',
    image_large: 'test2-large.jpg'
  }
];

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  afterEach(() => {
    // Очистка моковых данных после каждого теста
    jest.clearAllMocks();
  });

  describe('getIngredients async thunk', () => {
    it('должен обрабатывать начало запроса ингредиентов', () => {
      // 1. Проверяем изначальное состояние загрузки
      expect(initialState.loading).toBe(false);
      expect(initialState.error).toBeNull();

      // 2. Выполняем действие
      const action = { type: getIngredients.pending.type };
      const newState = ingredientsSlice.reducer(initialState, action);

      // 3. Проверяем, что состояние загрузки изменилось
      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });

    it('должен обрабатывать успешное получение ингредиентов', () => {
      const stateWithLoading = {
        ...initialState,
        loading: true
      };

      // 1. Проверяем, что ингредиентов нет и идет загрузка
      expect(stateWithLoading.ingredients).toHaveLength(0);
      expect(stateWithLoading.loading).toBe(true);

      // 2. Выполняем действие
      const action = {
        type: getIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const newState = ingredientsSlice.reducer(stateWithLoading, action);

      // 3. Проверяем, что ингредиенты загрузились
      expect(newState.loading).toBe(false);
      expect(newState.ingredients).toEqual(mockIngredients);
      expect(newState.error).toBeNull();
    });

    it('должен обрабатывать ошибку при загрузке ингредиентов', () => {
      const stateWithLoading = {
        ...initialState,
        loading: true
      };

      const errorMessage = 'Ошибка загрузки ингредиентов';

      // 1. Проверяем, что идет загрузка
      expect(stateWithLoading.loading).toBe(true);
      expect(stateWithLoading.error).toBeNull();

      // 2. Выполняем действие
      const action = {
        type: getIngredients.rejected.type,
        error: { message: errorMessage }
      };
      const newState = ingredientsSlice.reducer(stateWithLoading, action);

      // 3. Проверяем, что загрузка завершена с ошибкой
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(errorMessage);
      expect(newState.ingredients).toHaveLength(0);
    });
  });
});
