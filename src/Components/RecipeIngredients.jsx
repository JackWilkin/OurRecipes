import React, { useContext } from 'react';
import styled from 'styled-components';
import RecipeIngredient from './RecipeIngredient';
import RecipeContext from '../Context/RecipeContext';

const Ingredients = styled.div``;

export default function RecipeIngredients() {
  const { ingredients } = useContext(RecipeContext);

  const ingredientList = ingredients.map(
    ingredient => <RecipeIngredient key={ingredient.id} ingredient={ingredient} />,
  );

  return (
    <Ingredients>
      {ingredientList}
    </Ingredients>
  );
}
