import React, { useContext } from 'react';
import styled from 'styled-components';
import Ingredient from './Ingredient';
import { darkBlue } from '../Styles/constants';
import RecipeContext from '../Context/RecipeContext';

const Ingredients = styled.div`
    border-bottom: 1px solid ${darkBlue};
    border-left: 1px solid ${darkBlue};
    border-right: 1px solid ${darkBlue};
`;

export default function RecipeIngredients() {
  const { ingredients } = useContext(RecipeContext);

  const ingredientList = ingredients.map(
    ingredient => <Ingredient key={ingredient.id} ingredient={ingredient} />,
  );

  return (
    <Ingredients>
      {ingredientList}
    </Ingredients>
  );
}
