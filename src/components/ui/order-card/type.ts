import { Location } from 'react-router-dom';
import { TIngredient } from '@utils-types';

export type OrderCardUIProps = {
  orderInfo: {
    _id: string;
    number: number;
    name: string;
    status: string;
    createdAt: string;
    ingredients: string[];
    ingredientsInfo: TIngredient[];
    total: number;
    date: Date;
  };
  maxIngredients?: number;
  locationState?: any;
};
