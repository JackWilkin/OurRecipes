import React from 'react';
import styled from 'styled-components';
import RecipeSidebar from '../Components/RecipeSidebar';
import RecipeIngredients from '../Components/RecipeIngredients';
import RecipeContext from '../Context/RecipeContext';
import { onMobile } from '../Styles/constants';
import useRecipeData from '../Hooks/useRecipeData';

const titleFontSize = '4rem';
const mobileFontSize = '3rem';

const RecipePage = styled.div`
    display: flex;
    flex-direction: column;
    width: 85%;
    margin: auto;
`;

const RecipeTitle = styled.h1`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${titleFontSize};
    margin-bottom: 0;
    text-align: center;

    ${onMobile} {
      font-size: ${mobileFontSize};
    }
`;

const RecipeSubTitle = styled.h2`
    width: 80%;
    margin: auto;
    text-align: center;
    margin-bottom: 1rem;

    ${onMobile} {
      font-size: 1rem;
    }
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
  const { match: { params } } = props;
  const recipeId = params.id;
  const context = useRecipeData(recipeId);
  const {
    title, id, instructions, subTitle,
  } = context;

  let hasImage = true;
  let recipeImage;
  try {
    const images = require.context('../Content/Recipe Images', true);
    recipeImage = images(`./${recipeId}.jpg`);
  } catch (e) {
    hasImage = false;
  }

  return (
    <RecipePage>
      <RecipeContext.Provider value={context}>
        <RecipeTitle>{title}</RecipeTitle>
        {subTitle
        && <RecipeSubTitle>{`"${subTitle}"`}</RecipeSubTitle>
        }
        {hasImage
        && <StyledImage src={recipeImage} alt={id} />
        }
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
