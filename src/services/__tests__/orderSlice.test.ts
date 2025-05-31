import userOrdersHistorySlice, {
  ordersHistory,
  getOrderByNumber,
  updateOrdersHistory
} from '../slices/orderSlice';
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

const mockOrders: TOrder[] = [
  mockOrder,
  {
    _id: 'order-2',
    status: 'pending',
    name: 'Второй заказ',
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
    number: 12346,
    ingredients: ['ingredient-3', 'ingredient-4']
  }
];

describe('orderSlice', () => {
  const initialState = {
    orders: [],
    loading: false,
    error: null,
    modalOrder: null
  };

  afterEach(() => {
    // Очистка моковых данных после каждого теста
    jest.clearAllMocks();
  });

  describe('updateOrdersHistory', () => {
    it('должен обновлять историю заказов', () => {
      // 1. Проверяем, что заказов нет
      expect(initialState.orders).toHaveLength(0);

      // 2. Выполняем действие
      const action = updateOrdersHistory(mockOrders);
      const newState = userOrdersHistorySlice.reducer(initialState, action);

      // 3. Проверяем, что заказы появились
      expect(newState.orders).toEqual(mockOrders);
    });
  });

  describe('ordersHistory async thunk', () => {
    it('должен обрабатывать начало загрузки истории заказов', () => {
      // 1. Проверяем изначальное состояние
      expect(initialState.loading).toBe(false);
      expect(initialState.error).toBeNull();

      // 2. Выполняем действие
      const action = { type: ordersHistory.pending.type };
      const newState = userOrdersHistorySlice.reducer(initialState, action);

      // 3. Проверяем, что началась загрузка
      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });

    it('должен обрабатывать успешную загрузку истории заказов', () => {
      const stateWithLoading = {
        ...initialState,
        loading: true
      };

      // 1. Проверяем, что заказов нет и идет загрузка
      expect(stateWithLoading.orders).toHaveLength(0);
      expect(stateWithLoading.loading).toBe(true);

      // 2. Выполняем действие
      const action = {
        type: ordersHistory.fulfilled.type,
        payload: mockOrders
      };
      const newState = userOrdersHistorySlice.reducer(stateWithLoading, action);

      // 3. Проверяем, что заказы загрузились
      expect(newState.loading).toBe(false);
      expect(newState.orders).toEqual(mockOrders);
      expect(newState.error).toBeNull();
    });

    it('должен обрабатывать ошибку загрузки истории заказов', () => {
      const stateWithLoading = {
        ...initialState,
        loading: true
      };

      const errorMessage = 'Ошибка загрузки истории заказов';

      // 1. Проверяем, что идет загрузка
      expect(stateWithLoading.loading).toBe(true);
      expect(stateWithLoading.error).toBeNull();

      // 2. Выполняем действие
      const action = {
        type: ordersHistory.rejected.type,
        error: { message: errorMessage }
      };
      const newState = userOrdersHistorySlice.reducer(stateWithLoading, action);

      // 3. Проверяем, что загрузка завершена с ошибкой
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(errorMessage);
    });
  });

  describe('getOrderByNumber async thunk', () => {
    it('должен обрабатывать начало загрузки заказа по номеру', () => {
      // 1. Проверяем изначальное состояние
      expect(initialState.loading).toBe(false);
      expect(initialState.error).toBeNull();

      // 2. Выполняем действие
      const action = { type: getOrderByNumber.pending.type };
      const newState = userOrdersHistorySlice.reducer(initialState, action);

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
        type: getOrderByNumber.fulfilled.type,
        payload: { orders: [mockOrder] }
      };
      const newState = userOrdersHistorySlice.reducer(stateWithLoading, action);

      // 3. Проверяем, что заказ загрузился в модальное окно
      expect(newState.loading).toBe(false);
      expect(newState.modalOrder).toEqual(mockOrder);
    });

    it('должен обрабатывать ошибку загрузки заказа по номеру', () => {
      const stateWithLoading = {
        ...initialState,
        loading: true
      };

      const errorMessage = 'Ошибка получения заказа';

      // 1. Проверяем, что идет загрузка
      expect(stateWithLoading.loading).toBe(true);
      expect(stateWithLoading.error).toBeNull();

      // 2. Выполняем действие
      const action = {
        type: getOrderByNumber.rejected.type,
        error: { message: errorMessage }
      };
      const newState = userOrdersHistorySlice.reducer(stateWithLoading, action);

      // 3. Проверяем, что загрузка завершена с ошибкой
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(errorMessage);
    });
  });
});
