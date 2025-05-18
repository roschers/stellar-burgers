// Тестовые данные для заказов и ингредиентов
import { TOrder, TIngredient } from './types';

export const testIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка светлая',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 50,
    image: '',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: ''
  },
  {
    _id: '2',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 100,
    price: 80,
    image: '',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: ''
  },
  {
    _id: '3',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 300,
    image: '',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: ''
  }
];

export const testOrders: TOrder[] = [
  {
    _id: 'order1',
    ingredients: ['1', '2', '3'],
    status: 'done',
    name: 'Death Star Starship Main бургер',
    createdAt: '2024-06-01T13:20:00.000Z',
    updatedAt: '2024-06-01T13:20:00.000Z',
    number: 34535
  },
  {
    _id: 'order2',
    ingredients: ['1', '3'],
    status: 'pending',
    name: 'Interstellar бургер',
    createdAt: '2024-06-01T12:20:00.000Z',
    updatedAt: '2024-06-01T12:20:00.000Z',
    number: 34534
  },
  {
    _id: 'order3',
    ingredients: ['2', '3'],
    status: 'done',
    name: 'Black Hole Singularity острый бургер',
    createdAt: '2024-05-31T13:50:00.000Z',
    updatedAt: '2024-05-31T13:50:00.000Z',
    number: 34533
  }
];
