import store, { rootReducer } from '../store';

describe('Store', () => {
  afterEach(() => {
    // Очистка моковых данных после каждого теста
    jest.clearAllMocks();
  });

  it('должен правильно инициализировать store', () => {
    const state = store.getState();
    expect(state).toBeDefined();
    expect(state.burgerconstructor).toBeDefined();
    expect(state.ingredients).toBeDefined();
    expect(state.user).toBeDefined();
    expect(state.feeddata).toBeDefined();
    expect(state.ordershistory).toBeDefined();
    expect(state.currentIngredient).toBeDefined();
  });

  it('должен правильно работать rootReducer с неизвестным действием', () => {
    // 1. Проверяем, что rootReducer возвращает корректное начальное состояние
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    // 2. Проверяем структуру начального состояния
    expect(initialState).toBeDefined();
    expect(initialState.burgerconstructor).toEqual({
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    });
    expect(initialState.ingredients).toEqual({
      ingredients: [],
      loading: false,
      error: null
    });
    expect(initialState.user).toEqual({
      user: null,
      loading: false,
      error: null
    });
    expect(initialState.feeddata).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
      loading: false,
      modalOrder: null
    });
    expect(initialState.ordershistory).toEqual({
      orders: [],
      loading: false,
      error: null,
      modalOrder: null
    });
    expect(initialState.currentIngredient).toEqual({
      ingredient: null
    });

    // 3. Проверяем, что неизвестное действие не изменяет состояние
    const stateAfterUnknownAction = rootReducer(initialState, {
      type: 'ANOTHER_UNKNOWN_ACTION'
    });
    expect(stateAfterUnknownAction).toEqual(initialState);
  });
});
