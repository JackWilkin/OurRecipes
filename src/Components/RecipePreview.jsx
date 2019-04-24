import React from 'react';
import styled from 'styled-components';
import { darkBlue } from '../Styles/constants';
import pasta from '../Content/Images/pasta.png';
import pancake from '../Content/Images/pancake.jpeg';
import cake from '../Content/Images/chocolate-cake.png';

const StyledRecipePreview = styled.div`
    border: 1px solid ${darkBlue};
    display: flex;
    margin: auto;
    width: 80%;
    margin-bottom: 3rem;
`;

const RecipeImage = styled.div`
    width: fit-content;
    overflow: hidden;
`;

const StyledImage = styled.img`
    display: flex;
    max-height: 15rem;
`;

const RecipeInfo = styled.div`
    flex-grow: 1;
    min-width: 10rem;
`;

const RecipeTitle = styled.div`
    align-items: center;
    background-color: ${darkBlue};
    color: white;
    display: flex;
    font-size: 1.5rem;
    font-weight: bold;
    height: 3rem;
    padding-left: 0.75rem;
    width: 100%;
`;

export default function RecipePreview(props) {
  const { recipe } = props;

  let source;

  switch (recipe.id) {
    case 0:
      source = pancake;
      break;
    case 1:
      source = cake;
      break;
    default:
      source = pasta;
      break;
  }

  let ingredients;
  if (recipe.ingredients.length > 0) {
    ingredients = recipe.ingredients.map(ingredient => (
      <div>
        {ingredient.quantity}
        {' '}
        {ingredient.unit ? ingredient.unit.name : ''}
        {' '}
        {ingredient.quantity > 1 ? ingredient.plural : ingredient.name}
      </div>
    ));
  }

  return (
    <StyledRecipePreview>
      <RecipeImage><StyledImage src={source} alt={recipe.id} /></RecipeImage>
      <RecipeInfo>
        <RecipeTitle>{recipe.title}</RecipeTitle>
        {ingredients}
      </RecipeInfo>
    </StyledRecipePreview>
  );
}
