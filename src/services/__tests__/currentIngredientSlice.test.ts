import currentIngredientSlice, {
  setCurrentIngredient
} from '../slices/currentIngredientSlice';
import { TIngredient } from '../../utils/types';

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

describe('currentIngredientSlice', () => {
  const initialState = {
    ingredient: null
  };

  afterEach(() => {
    // Очистка моковых данных после каждого теста
    jest.clearAllMocks();
  });

  describe('setCurrentIngredient', () => {
    it('должен устанавливать текущий ингредиент', () => {
      // 1. Проверяем, что текущего ингредиента нет
      expect(initialState.ingredient).toBeNull();

      // 2. Выполняем действие
      const action = setCurrentIngredient(mockIngredient);
      const newState = currentIngredientSlice(initialState, action);

      // 3. Проверяем, что ингредиент установлен
      expect(newState.ingredient).toEqual(mockIngredient);
    });

    it('должен очищать текущий ингредиент', () => {
      const stateWithIngredient = {
        ingredient: mockIngredient
      };

      // 1. Проверяем, что текущий ингредиент установлен
      expect(stateWithIngredient.ingredient).toEqual(mockIngredient);

      // 2. Выполняем действие - очищаем ингредиент
      const action = setCurrentIngredient(null);
      const newState = currentIngredientSlice(stateWithIngredient, action);

      // 3. Проверяем, что ингредиент очищен
      expect(newState.ingredient).toBeNull();
    });

    it('должен заменять текущий ингредиент на новый', () => {
      const anotherIngredient: TIngredient = {
        _id: '2',
        name: 'Другой ингредиент',
        type: 'sauce',
        price: 50,
        proteins: 5,
        fat: 5,
        carbohydrates: 5,
        calories: 50,
        image: 'test2.jpg',
        image_mobile: 'test2-mobile.jpg',
        image_large: 'test2-large.jpg'
      };

      const stateWithIngredient = {
        ingredient: mockIngredient
      };

      // 1. Проверяем, что установлен первый ингредиент
      expect(stateWithIngredient.ingredient).toEqual(mockIngredient);

      // 2. Выполняем действие - устанавливаем другой ингредиент
      const action = setCurrentIngredient(anotherIngredient);
      const newState = currentIngredientSlice(stateWithIngredient, action);

      // 3. Проверяем, что ингредиент заменился
      expect(newState.ingredient).toEqual(anotherIngredient);
      expect(newState.ingredient).not.toEqual(mockIngredient);
    });
  });
});
