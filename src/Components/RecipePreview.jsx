import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darkBlue } from '../Styles/constants';
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
    max-height: 15rem;
`;

const RecipeTitle = styled.div`
  background-color: #2E3E55;
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
`;

const RecipeLink = styled(Link)`
  color: white;
  padding: 1rem;

  &:hover {
    background-color: white;
    color: ${darkBlue};
  }
`;


const RecipeServings = styled.div`
    padding: 0.5rem;
`;

const RecipeIngredient = styled.span`
    padding-left: 0.5rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
`;

const RecipeIngredients = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    overflow: auto;
`;

export default function RecipePreview(props) {
  const { recipe } = props;

  let hasImage = true;
  let recipeImage;
  try {
    const images = require.context('../Content/Recipe Images', true);
    recipeImage = images(`./${recipe.id}.jpg`);
  } catch (e) {
    hasImage = false;
  }

  let ingredients;
  if (recipe.ingredients.length > 0) {
    ingredients = recipe.ingredients.map(ingredient => (
      <RecipeIngredient key={ingredient.id}>
        {createIngredientDisplay({ ingredient, scaler: 1 }).ingredientString}
      </RecipeIngredient>
    ));
  }

  return (
    <StyledRecipePreview>
      {hasImage
      && <RecipeImage><StyledImage src={recipeImage} alt={recipe.id} /></RecipeImage>
      }
      <RecipeInfo>
        <RecipeTitle>
          <RecipeLink to={`/Recipe/${recipe.id}`}>
            {recipe.title}
          </RecipeLink>
        </RecipeTitle>
        {recipe.servings && (
        <RecipeServings>
          { `Servings: ${recipe.servings}`}
        </RecipeServings>
        )
        }
        <RecipeIngredients>
          {ingredients}
        </RecipeIngredients>
      </RecipeInfo>
    </StyledRecipePreview>
  );
}
