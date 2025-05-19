import React, { FC, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  CurrencyIcon,
  FormattedDate
} from '@zlden/react-developer-burger-ui-components';

import styles from './order-card.module.css';

import { OrderCardUIProps } from './type';
import { OrderStatus } from '@components';

export const OrderCardUI: FC<OrderCardUIProps> = memo(
  ({ orderInfo, maxIngredients = 6, locationState }) => {
    const location = useLocation();
    const isProfile = location.pathname === '/profile/orders';

    return (
      <Link
        to={orderInfo.number.toString()}
        relative='path'
        state={locationState}
        className={`p-6 mb-4 mr-2 ${styles.order}`}
      >
        <div className={styles.order_info}>
          <span className={`text text_type_digits-default ${styles.number}`}>
            #{String(orderInfo.number).padStart(6, '0')}
          </span>
          <span className='text text_type_main-default text_color_inactive'>
            <FormattedDate date={orderInfo.date} />
          </span>
        </div>
        <h4 className={`pt-6 text text_type_main-medium ${styles.order_name}`}>
          {orderInfo.name}
        </h4>
        {isProfile && <OrderStatus status={orderInfo.status} />}
        <div className={`pt-6 ${styles.order_content}`}>
          <div className={styles.ingredients}>
            {orderInfo.ingredientsInfo
              .slice(0, maxIngredients)
              .map((ingredient, index) => (
                <div
                  key={index}
                  className={styles.ingredient}
                  style={{ zIndex: maxIngredients - index }}
                >
                  <img
                    src={ingredient.image_mobile}
                    alt={ingredient.name}
                    className={styles.ingredient_image}
                  />
                </div>
              ))}
            {orderInfo.ingredientsInfo.length > maxIngredients && (
              <div className={styles.ingredient_count}>
                +{orderInfo.ingredientsInfo.length - maxIngredients}
              </div>
            )}
          </div>
          <div className={styles.price}>
            <span className='text text_type_digits-default'>
              {orderInfo.total}
            </span>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </Link>
    );
  }
);
