import React, { useContext } from 'react';
import styled from 'styled-components';
import LoadingSpinner from '../Components/LoadingSpinner';
import ToolBar from '../Components/ToolBar';
import RecipeIngredients from '../Components/RecipeIngredients';
import RecipeContext from '../Context/RecipeContext';
import { onMobile, appBarHeight } from '../Styles/constants';
import GlobalContext from '../Context/GlobalContext';
import { getRecipeImage } from '../utils';

const titleFontSize = '4rem';
const mobileFontSize = '3rem';

const RecipePage = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 900px;
    padding-left: 1rem;
    padding-right: 1rem;

    ${props => (props.isLoading ? `
      height: calc(100% - ${appBarHeight}); 
      justify-content: center; 
      align-items: center;`
    : '')}
`;

const RecipeTitle = styled.h1`
    width: 100%;
    display: flex;
    font-size: ${titleFontSize};
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
  const {
    match: {
      params: { id: recipeId },
    },
  } = props;
  const { recipes, isLoading } = useContext(GlobalContext);
  const context = recipes.length > 1
    ? recipes.find(recipe => recipe.id.toString() === recipeId) : {};

  const {
    title, id, instructions, subTitle, ingredients,
  } = context;

  const [scaler, setScaler] = React.useState(1);
  const recipePageContext = { ...context, scaler, setScaler };

  const { hasImage, recipeImage } = getRecipeImage(recipeId);

  return (
    <RecipePage isLoading={isLoading}>
      {isLoading ? <LoadingSpinner /> : (
        <RecipeContext.Provider value={recipePageContext}>
          <RecipeTitle>{title}</RecipeTitle>
          {subTitle && <RecipeSubTitle>{`"${subTitle}"`}</RecipeSubTitle>}
          {hasImage && <StyledImage src={recipeImage} alt={id} />}
          <RecipeInfo>
            <RecipeContent>
              <RecipeContentHeader>Ingredients</RecipeContentHeader>
              {ingredients ? <RecipeIngredients /> : <LoadingSpinner />}
              <RecipeContentHeader>Instructions</RecipeContentHeader>
              <RecipeInstructions>{instructions}</RecipeInstructions>
            </RecipeContent>
            <ToolBar />
          </RecipeInfo>
        </RecipeContext.Provider>
      )}
    </RecipePage>
  );
}

export default Recipe;
