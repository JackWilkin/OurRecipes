import React, { useContext } from 'react';
import styled from 'styled-components';
import RecipeSidebar from '../Components/RecipeSidebar';
import RecipeIngredients from '../Components/RecipeIngredients';
import RecipeContext from '../Context/RecipeContext';
import { onMobile } from '../Styles/constants';
import useRecipeData from '../Hooks/useRecipeData';
import GlobalContext from '../Context/GlobalContext';
import { convertTemperature, getRecipeImage } from '../utils';

const titleFontSize = '4rem';
const mobileFontSize = '3rem';

const RecipePage = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 100%;
    max-width: 900px;
    padding-left: 2rem;
    padding-right: 2rem;
`;

const RecipeTitle = styled.h1`
    width: 100%;
    display: flex;
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

/**
 * Display values for temp tool
 * @param {int} ovenHeat
 * @param {bool} isCelsius
 * @returns {String} celsius
 * @returns {String} fahrenheit
 */
function ovenHeatDisplay({ ovenHeat, isCelsius }) {
  const hasOvenHeat = ovenHeat > 0;
  let celsius = 'Celsius';
  let fahrenheit = 'Fahrenheit';
  if (hasOvenHeat) {
    const convertedTemp = convertTemperature(ovenHeat, isCelsius);
    const celsiusDisplay = isCelsius ? ovenHeat : convertedTemp;
    const fahrenheitDisplay = isCelsius ? convertedTemp : ovenHeat;
    celsius = celsiusDisplay;
    fahrenheit = fahrenheitDisplay;
  }
  return { celsius, fahrenheit };
}

function Recipe(props) {
  const {
    match: {
      params: { id: recipeId },
    },
  } = props;
  const recipeContext = useRecipeData(recipeId);
  const { recipes } = useContext(GlobalContext);
  const context = recipes.length > 1
    ? recipes.find(recipe => recipe.id.toString() === recipeId) : recipeContext;

  const {
    title, id, instructions, subTitle, ovenHeat, isCelsius,
  } = context;

  const [scaler, setScaler] = React.useState(1);
  const [inCelsius, setInCelsius] = React.useState(isCelsius);
  const { celsius, fahrenheit } = ovenHeatDisplay({ ovenHeat, isCelsius });
  const { hasImage, recipeImage } = getRecipeImage(recipeId);

  const recipePageContext = {
    ...context, scaler, setScaler, celsius, fahrenheit, setInCelsius, inCelsius,
  };

  return (
    <RecipePage>
      <RecipeContext.Provider value={recipePageContext}>
        <RecipeTitle>{title}</RecipeTitle>
        {subTitle && <RecipeSubTitle>{`"${subTitle}"`}</RecipeSubTitle>}
        {hasImage && <StyledImage src={recipeImage} alt={id} />}
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
