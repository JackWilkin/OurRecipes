import React from 'react';
import styled from 'styled-components';
import { darkBlue } from '../Styles/constants';
import pasta from '../Content/Images/pasta.png';
import pancake from '../Content/Images/pancake.jpeg';
import cake from '../Content/Images/chocolate-cake.png';
import { createIngredientDisplay } from '../utils';

const StyledRecipePreview = styled.div`
    border: 1px solid ${darkBlue};
    display: flex;
    background-color: white;
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
    display: flex;
    flex-direction: column;
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
    min-height: 3rem;
    padding-left: 0.75rem;
    width: 100%;
`;


const RecipeServings = styled.div`
    padding: 0.5rem;
`;

const RecipeIngredient = styled.div`
    padding-left: 0.5rem;
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
      <RecipeIngredient>
        {createIngredientDisplay({ ingredient, scaler: 1 }).ingredientString}
      </RecipeIngredient>
    ));
  }

  return (
    <StyledRecipePreview>
      <RecipeImage><StyledImage src={source} alt={recipe.id} /></RecipeImage>
      <RecipeInfo>
        <RecipeTitle>{recipe.title}</RecipeTitle>
        {recipe.servings && (
        <RecipeServings>
          { `Servings: ${recipe.servings}`}
        </RecipeServings>
        )
        }
        {ingredients}
      </RecipeInfo>
    </StyledRecipePreview>
  );
}
