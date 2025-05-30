import { OrderCardUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/OrderCard',
  component: OrderCardUI,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof OrderCardUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultOrderCard: Story = {
  args: {
    orderInfo: {
      _id: '32',
      number: 3,
      name: 'Начинка',
      status: 'ready',
      createdAt: '2024-01-25T12:00:00.000Z',
      ingredients: ['111', '222'],
      ingredientsInfo: [
        {
          _id: '111',
          name: 'Булка',
          type: 'top',
          proteins: 12,
          fat: 33,
          carbohydrates: 22,
          calories: 33,
          price: 123,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          _id: '222',
          name: 'Начинка',
          type: 'main',
          proteins: 12,
          fat: 33,
          carbohydrates: 22,
          calories: 33,
          price: 123,
          image: '',
          image_large: '',
          image_mobile: ''
        }
      ],
      total: 246,
      date: new Date('2024-01-25')
    },
    maxIngredients: 5,
    locationState: {
      background: {
        hash: '',
        key: 'eitkep27',
        pathname: '/',
        search: '',
        state: null
      }
    }
  }
};
