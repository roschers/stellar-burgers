import store from '../store';
import burgerConstructorSlice from '../slices/burgerConstructorSlice';
import ingredientsSlice from '../slices/ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('Store', () => {
  it('должен правильно инициализировать rootReducer', () => {
    const state = store.getState();
    expect(state).toBeDefined();
    expect(state.burgerconstructor).toBeDefined();
    expect(state.ingredients).toBeDefined();
  });
});

describe('Constructor Reducer', () => {
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

  it('должен обрабатывать добавление ингредиента', () => {
    const ingredient: TIngredient = {
      _id: '1',
      name: 'Test Ingredient',
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

    const action = {
      type: 'burgerconstructor/addIngredient',
      payload: { ...ingredient, id: 'test-id' }
    };

    const newState = burgerConstructorSlice.reducer(initialState, action);
    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({ ...ingredient, id: 'test-id' });
  });

  it('должен обрабатывать удаление ингредиента', () => {
    const state = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [{
          _id: '1',
          name: 'Test Ingredient',
          type: 'main',
          price: 100,
          proteins: 10,
          fat: 10,
          carbohydrates: 10,
          calories: 100,
          image: 'test.jpg',
          image_mobile: 'test-mobile.jpg',
          image_large: 'test-large.jpg',
          id: 'test-id'
        }]
      }
    };

    const action = {
      type: 'burgerconstructor/removeIngredient',
      payload: { _id: '1', id: 'test-id' }
    };

    const newState = burgerConstructorSlice.reducer(state, action);
    expect(newState.constructorItems.ingredients).toHaveLength(0);
  });

  it('должен обрабатывать изменение порядка ингредиентов', () => {
    const state = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          {
            _id: '1',
            name: 'First',
            type: 'main',
            price: 100,
            proteins: 10,
            fat: 10,
            carbohydrates: 10,
            calories: 100,
            image: 'test.jpg',
            image_mobile: 'test-mobile.jpg',
            image_large: 'test-large.jpg',
            id: 'test-id-1'
          },
          {
            _id: '2',
            name: 'Second',
            type: 'main',
            price: 200,
            proteins: 20,
            fat: 20,
            carbohydrates: 20,
            calories: 200,
            image: 'test2.jpg',
            image_mobile: 'test2-mobile.jpg',
            image_large: 'test2-large.jpg',
            id: 'test-id-2'
          }
        ]
      }
    };

    const action = {
      type: 'burgerconstructor/moveUpIngredient',
      payload: 1
    };

    const newState = burgerConstructorSlice.reducer(state, action);
    expect(newState.constructorItems.ingredients[0]._id).toBe('2');
    expect(newState.constructorItems.ingredients[1]._id).toBe('1');
  });
});

describe('Ingredients Reducer', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  it('должен обрабатывать начало запроса', () => {
    const action = { type: 'ingredients/getIngredients/pending' };
    const newState = ingredientsSlice.reducer(initialState, action);
    expect(newState.loading).toBe(true);
  });

  it('должен обрабатывать успешный ответ', () => {
    const ingredients = [
      {
        _id: '1',
        name: 'Test Ingredient',
        type: 'main',
        price: 100,
        proteins: 10,
        fat: 10,
        carbohydrates: 10,
        calories: 100,
        image: 'test.jpg',
        image_mobile: 'test-mobile.jpg',
        image_large: 'test-large.jpg'
      }
    ];

    const action = {
      type: 'ingredients/getIngredients/fulfilled',
      payload: ingredients
    };

    const newState = ingredientsSlice.reducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.ingredients).toEqual(ingredients);
    expect(newState.error).toBeNull();
  });

  it('должен обрабатывать ошибку', () => {
    const error = 'Test error';
    const action = {
      type: 'ingredients/getIngredients/rejected',
      error: { message: error }
    };

    const newState = ingredientsSlice.reducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });
}); 