import feedDataSlice, {
  getFeedData,
  getOrderByNum,
  updateOrders
} from '../slices/FeedDataSlice';
import { TOrder } from '../../utils/types';

// Моковые данные
const mockOrder: TOrder = {
  _id: 'order-1',
  status: 'done',
  name: 'Тестовый заказ',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  number: 12345,
  ingredients: ['ingredient-1', 'ingredient-2']
};

const mockFeedData = {
  orders: [mockOrder],
  total: 100,
  totalToday: 10
};

describe('feedDataSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
    loading: false,
    modalOrder: null
  };

  afterEach(() => {
    // Очистка моковых данных после каждого теста
    jest.clearAllMocks();
  });

  describe('updateOrders', () => {
    it('должен обновлять данные ленты заказов', () => {
      // 1. Проверяем изначальное состояние
      expect(initialState.orders).toHaveLength(0);
      expect(initialState.total).toBe(0);
      expect(initialState.totalToday).toBe(0);

      // 2. Выполняем действие
      const action = updateOrders(mockFeedData);
      const newState = feedDataSlice.reducer(initialState, action);

      // 3. Проверяем, что данные обновились
      expect(newState.orders).toEqual(mockFeedData.orders);
      expect(newState.total).toBe(mockFeedData.total);
      expect(newState.totalToday).toBe(mockFeedData.totalToday);
    });
  });

  describe('getFeedData async thunk', () => {
    it('должен обрабатывать начало загрузки данных ленты', () => {
      // 1. Проверяем изначальное состояние
      expect(initialState.loading).toBe(false);
      expect(initialState.error).toBeNull();

      // 2. Выполняем действие
      const action = { type: getFeedData.pending.type };
      const newState = feedDataSlice.reducer(initialState, action);

      // 3. Проверяем, что началась загрузка
      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });

    it('должен обрабатывать успешную загрузку данных ленты', () => {
      const stateWithLoading = {
        ...initialState,
        loading: true
      };

      // 1. Проверяем, что данных нет и идет загрузка
      expect(stateWithLoading.orders).toHaveLength(0);
      expect(stateWithLoading.loading).toBe(true);

      // 2. Выполняем действие
      const action = {
        type: getFeedData.fulfilled.type,
        payload: mockFeedData
      };
      const newState = feedDataSlice.reducer(stateWithLoading, action);

      // 3. Проверяем, что данные загрузились
      expect(newState.loading).toBe(false);
      expect(newState.orders).toEqual(mockFeedData.orders);
      expect(newState.total).toBe(mockFeedData.total);
      expect(newState.totalToday).toBe(mockFeedData.totalToday);
    });

    it('должен обрабатывать ошибку загрузки данных ленты', () => {
      const stateWithLoading = {
        ...initialState,
        loading: true
      };

      const errorMessage = 'Ошибка загрузки ленты';

      // 1. Проверяем, что идет загрузка
      expect(stateWithLoading.loading).toBe(true);
      expect(stateWithLoading.error).toBeNull();

      // 2. Выполняем действие
      const action = {
        type: getFeedData.rejected.type,
        error: { message: errorMessage }
      };
      const newState = feedDataSlice.reducer(stateWithLoading, action);

      // 3. Проверяем, что загрузка завершена с ошибкой
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(errorMessage);
    });
  });

  describe('getOrderByNum async thunk', () => {
    it('должен обрабатывать начало загрузки заказа по номеру', () => {
      // 1. Проверяем изначальное состояние
      expect(initialState.loading).toBe(false);
      expect(initialState.error).toBeNull();

      // 2. Выполняем действие
      const action = { type: getOrderByNum.pending.type };
      const newState = feedDataSlice.reducer(initialState, action);

      // 3. Проверяем, что началась загрузка
      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });

    it('должен обрабатывать успешную загрузку заказа по номеру', () => {
      const stateWithLoading = {
        ...initialState,
        loading: true
      };

      // 1. Проверяем, что модального заказа нет и идет загрузка
      expect(stateWithLoading.modalOrder).toBeNull();
      expect(stateWithLoading.loading).toBe(true);

      // 2. Выполняем действие
      const action = {
        type: getOrderByNum.fulfilled.type,
        payload: { orders: [mockOrder] }
      };
      const newState = feedDataSlice.reducer(stateWithLoading, action);

      // 3. Проверяем, что заказ загрузился в модальное окно
      expect(newState.loading).toBe(false);
      expect(newState.modalOrder).toEqual(mockOrder);
    });

    it('должен обрабатывать ошибку загрузки заказа по номеру', () => {
      const stateWithLoading = {
        ...initialState,
        loading: true
      };

      const errorMessage = 'Ошибка загрузки заказа';

      // 1. Проверяем, что идет загрузка
      expect(stateWithLoading.loading).toBe(true);
      expect(stateWithLoading.error).toBeNull();

      // 2. Выполняем действие
      const action = {
        type: getOrderByNum.rejected.type,
        error: { message: errorMessage }
      };
      const newState = feedDataSlice.reducer(stateWithLoading, action);

      // 3. Проверяем, что загрузка завершена с ошибкой
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(errorMessage);
    });
  });
});
