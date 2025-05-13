import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';
import { setCurrentIngredient } from '../../services/slices/currentIngredientSlice';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const ingredientData = useSelector((state) => state.currentIngredient.ingredient);
  const allIngredients = useSelector((state) => state.ingredients.ingredients);

  useEffect(() => {
    if (allIngredients.length && id) {
      const found = allIngredients.find((item) => item._id === id);
      if (found) {
        dispatch(setCurrentIngredient(found));
      }
    }
  }, [allIngredients, id, dispatch]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
