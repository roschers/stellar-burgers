import { TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: any;
  price: number;
  onOrderClick: () => void;
  closeOrderModal: () => void;
  showModal: boolean;
  orderNumber: number;
};
