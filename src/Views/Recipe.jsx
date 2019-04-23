import React from 'react';
import styled from 'styled-components';
// import { restdb } from '../RecipeAPI/RestDB.js';
import RecipeSidebar from '../Components/RecipeSidebar';
import RecipeIngredients from '../Components/RecipeIngredients';
import RecipeContext from '../Context/RecipeContext';
import RecipeImage from '../Content/Images/pasta.png';
import { onMobile } from '../Styles/constants';
import useRecipeData from '../Hooks/useRecipeData';

const titleFontSize = '4rem';

const RecipePage = styled.main`
    display: flex;
    flex-direction: column;
    width: 85%;
    margin: auto;
`;

const RecipeTitle = styled.div`
    width: 100%;
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${titleFontSize};
`;

const RecipeInfo = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;

    ${onMobile} {
        flex-direction: column-reverse;
    }
`;

const RecipeContent = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding-right: 0.5rem;
    padding-bottom: 1rem;
`;

const RecipeContentHeader = styled.span`
    font-size: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
`;

const RecipeInstructions = styled.div`

`;

const StyledImage = styled.img`
    height: auto;
    width: 100%;
`;

function Recipe(props) {
  const recipeId = props.match.params.id;
  const context = useRecipeData(recipeId);
  const {
    title, id, instructions,
  } = context;

  return (
    <RecipePage>
      <RecipeContext.Provider value={context}>
        <RecipeTitle>{title}</RecipeTitle>
        <StyledImage src={RecipeImage} alt={id} />
        <RecipeInfo>
          <RecipeContent>
            <RecipeContentHeader>Ingredients</RecipeContentHeader>
            <RecipeIngredients />
            <RecipeContentHeader>Instructions</RecipeContentHeader>
            <RecipeInstructions>{instructions}</RecipeInstructions>
          </RecipeContent>
          <RecipeSidebar />
        </RecipeInfo>
      </RecipeContext.Provider>
    </RecipePage>
  );
}

export default Recipe;
