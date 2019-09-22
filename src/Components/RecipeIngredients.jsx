import React, { useContext } from 'react';
import styled from 'styled-components';
import RecipeIngredient from './RecipeIngredient';
import RecipeContext from '../Context/RecipeContext';

const Ingredients = styled.div``;

function createIngredientTool(ingredient) {
  return (
    <RecipeIngredient
      key={ingredient.id}
      ingredient={ingredient}
    />
  );
}

export default function RecipeIngredients() {
  const { ingredients } = useContext(RecipeContext);

  const ingredientList = ingredients.map(createIngredientTool);

  return (
    <Ingredients>
      {ingredientList}
    </Ingredients>
  );
}
