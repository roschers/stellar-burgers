import { TOrder, TConstructorIngredient } from '@utils-types';

export interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

export type BurgerConstructorUIProps = {
  constructorItems: ConstructorState;
  price: number;
  orderRequest?: boolean;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
