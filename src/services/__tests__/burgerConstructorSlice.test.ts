import burgerConstructorSlice, {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearOrder,
  createOrder
} from '../slices/burgerConstructorSlice';
import { TIngredient } from '@utils-types';

// Моковые данные
const mockIngredient: TIngredient = {
  _id: '1',
  name: 'Тестовый ингредиент',
  type: 'main',
  price: 100,
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  image: 'test.jpg',
  image_mobile: 'test-mobile.jpg',
  image_large: 'test-large.jpg'
};

const mockBun: TIngredient = {
  _id: '2',
  name: 'Тестовая булка',
  type: 'bun',
  price: 50,
  proteins: 5,
  fat: 5,
  carbohydrates: 5,
  calories: 50,
  image: 'bun.jpg',
  image_mobile: 'bun-mobile.jpg',
  image_large: 'bun-large.jpg'
};

describe('burgerConstructorSlice', () => {
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null,
    loading: false,
    error: null
  };

  afterEach(() => {
    // Очистка моковых данных после каждого теста
    jest.clearAllMocks();
  });

  describe('addIngredient', () => {
    it('должен добавлять обычный ингредиент в конструктор', () => {
      // 1. Проверяем, что ингредиента нет в конструкторе
      expect(initialState.constructorItems.ingredients).toHaveLength(0);

      // 2. Выполняем действие
      const action = addIngredient(mockIngredient);
      const newState = burgerConstructorSlice.reducer(initialState, action);

      // 3. Проверяем, что ингредиент появился в конструкторе
      expect(newState.constructorItems.ingredients).toHaveLength(1);
      expect(newState.constructorItems.ingredients[0]).toMatchObject(
        mockIngredient
      );
      expect(newState.constructorItems.ingredients[0]).toHaveProperty('id');
    });

    it('должен добавлять булку в конструктор', () => {
      // 1. Проверяем, что булки нет в конструкторе
      expect(initialState.constructorItems.bun).toBeNull();

      // 2. Выполняем действие
      const action = addIngredient(mockBun);
      const newState = burgerConstructorSlice.reducer(initialState, action);

      // 3. Проверяем, что булка появилась в конструкторе
      expect(newState.constructorItems.bun).toEqual(
        expect.objectContaining(mockBun)
      );
      expect(newState.constructorItems.bun).toHaveProperty('id');
    });
  });

  describe('removeIngredient', () => {
    it('должен удалять ингредиент из конструктора', () => {
      const stateWithIngredient = {
        ...initialState,
        constructorItems: {
          ...initialState.constructorItems,
          ingredients: [{ ...mockIngredient, id: 'test-id' }]
        }
      };

      // 1. Проверяем, что ингредиент есть в конструкторе
      expect(stateWithIngredient.constructorItems.ingredients).toHaveLength(1);

      // 2. Выполняем действие
      const action = removeIngredient({ ...mockIngredient, id: 'test-id' });
      const newState = burgerConstructorSlice.reducer(
        stateWithIngredient,
        action
      );

      // 3. Проверяем, что ингредиент исчез из конструктора
      expect(newState.constructorItems.ingredients).toHaveLength(0);
    });
  });

  describe('moveUpIngredient', () => {
    it('должен перемещать ингредиент вверх', () => {
      const ingredient2 = { ...mockIngredient, _id: '2', id: 'test-id-2' };
      const stateWithIngredients = {
        ...initialState,
        constructorItems: {
          ...initialState.constructorItems,
          ingredients: [{ ...mockIngredient, id: 'test-id-1' }, ingredient2]
        }
      };

      // 1. Проверяем изначальный порядок
      expect(stateWithIngredients.constructorItems.ingredients[0]._id).toBe(
        '1'
      );
      expect(stateWithIngredients.constructorItems.ingredients[1]._id).toBe(
        '2'
      );

      // 2. Выполняем действие - перемещаем второй элемент вверх
      const action = moveUpIngredient(1);
      const newState = burgerConstructorSlice.reducer(
        stateWithIngredients,
        action
      );

      // 3. Проверяем, что порядок изменился
      expect(newState.constructorItems.ingredients[0]._id).toBe('2');
      expect(newState.constructorItems.ingredients[1]._id).toBe('1');
    });
  });

  describe('moveDownIngredient', () => {
    it('должен перемещать ингредиент вниз', () => {
      const ingredient2 = { ...mockIngredient, _id: '2', id: 'test-id-2' };
      const stateWithIngredients = {
        ...initialState,
        constructorItems: {
          ...initialState.constructorItems,
          ingredients: [{ ...mockIngredient, id: 'test-id-1' }, ingredient2]
        }
      };

      // 1. Проверяем изначальный порядок
      expect(stateWithIngredients.constructorItems.ingredients[0]._id).toBe(
        '1'
      );
      expect(stateWithIngredients.constructorItems.ingredients[1]._id).toBe(
        '2'
      );

      // 2. Выполняем действие - перемещаем первый элемент вниз
      const action = moveDownIngredient(0);
      const newState = burgerConstructorSlice.reducer(
        stateWithIngredients,
        action
      );

      // 3. Проверяем, что порядок изменился
      expect(newState.constructorItems.ingredients[0]._id).toBe('2');
      expect(newState.constructorItems.ingredients[1]._id).toBe('1');
    });
  });

  describe('clearOrder', () => {
    it('должен очищать конструктор', () => {
      const stateWithData = {
        constructorItems: {
          bun: mockBun,
          ingredients: [{ ...mockIngredient, id: 'test-id' }]
        },
        orderRequest: false,
        orderModalData: { _id: 'order-id' } as any,
        loading: false,
        error: null
      };

      // 1. Проверяем, что в конструкторе есть данные
      expect(stateWithData.constructorItems.bun).not.toBeNull();
      expect(stateWithData.constructorItems.ingredients).toHaveLength(1);

      // 2. Выполняем действие
      const action = clearOrder();
      const newState = burgerConstructorSlice.reducer(stateWithData, action);

      // 3. Проверяем, что конструктор очистился
      expect(newState).toEqual(initialState);
    });
  });

  describe('createOrder async thunk', () => {
    it('должен обрабатывать начало запроса', () => {
      // 1. Проверяем изначальное состояние
      expect(initialState.orderRequest).toBe(false);
      expect(initialState.error).toBeNull();

      // 2. Выполняем действие
      const action = { type: createOrder.pending.type };
      const newState = burgerConstructorSlice.reducer(initialState, action);

      // 3. Проверяем, что состояние изменилось
      expect(newState.orderRequest).toBe(true);
      expect(newState.error).toBeNull();
    });

    it('должен обрабатывать успешный ответ и очищать конструктор', () => {
      const stateWithRequest = {
        ...initialState,
        orderRequest: true,
        constructorItems: {
          bun: mockBun,
          ingredients: [{ ...mockIngredient, id: 'test-id' }]
        }
      };

      const mockOrder = {
        _id: 'order-123',
        status: 'done',
        name: 'Тестовый заказ',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
        number: 123,
        ingredients: ['1', '2']
      };

      // 1. Проверяем, что запрос в процессе и конструктор заполнен
      expect(stateWithRequest.orderRequest).toBe(true);
      expect(stateWithRequest.constructorItems.bun).not.toBeNull();
      expect(stateWithRequest.constructorItems.ingredients).toHaveLength(1);

      // 2. Выполняем действие
      const action = {
        type: createOrder.fulfilled.type,
        payload: { order: mockOrder }
      };
      const newState = burgerConstructorSlice.reducer(stateWithRequest, action);

      // 3. Проверяем, что запрос завершен, заказ сохранен и конструктор очищен
      expect(newState.orderRequest).toBe(false);
      expect(newState.orderModalData).toEqual(mockOrder);
      expect(newState.constructorItems.bun).toBeNull();
      expect(newState.constructorItems.ingredients).toHaveLength(0);
      expect(newState.error).toBeNull();
    });

    it('должен обрабатывать ошибку запроса', () => {
      const stateWithRequest = {
        ...initialState,
        orderRequest: true
      };

      const errorMessage = 'Ошибка сервера';

      // 1. Проверяем, что запрос в процессе
      expect(stateWithRequest.orderRequest).toBe(true);

      // 2. Выполняем действие
      const action = {
        type: createOrder.rejected.type,
        error: { message: errorMessage }
      };
      const newState = burgerConstructorSlice.reducer(stateWithRequest, action);

      // 3. Проверяем, что запрос завершен с ошибкой
      expect(newState.orderRequest).toBe(false);
      expect(newState.error).toBe(errorMessage);
    });
  });
});
