import React from 'react';
import MockData from '../tests/MockData';
import RecipeClient from '../RecipeAPI/RecipeClient';

function createIngredient(ingredient) {
  const {
    name, unit, quantity, plural,
  } = ingredient;
  const hasUnit = unit !== undefined && unit !== null;
  const unitConvertable = hasUnit && unit.scaler !== undefined && unit.scaler !== null;
  return {
    name, unit, quantity, hasUnit, unitConvertable, plural,
  };
}

function getAvailableUnits() {
  const { availableUnits } = MockData;
  return availableUnits;
}

function formatRecipeData(recipe) {
  const formattedRecipe = recipe;

  const ingredients = recipe.ingredients.map(ingredient => createIngredient(ingredient));
  formattedRecipe.ingredients = ingredients;
  return formattedRecipe;
}

export default function useRecipeData(recipeId) {
  const { recipe } = MockData;
  const {
    id,
    title,
    subTitle,
    instructions,
    ingredients,
    ovenHeat,
    servings,
    appliances,
    image,
  } = formatRecipeData(recipe);
  const [scaler, setScaler] = React.useState(recipe.scaler ? recipe.scaler : 1);
  const [isCelsius, setIsCelsius] = React.useState(recipe.isCelsius);
  const availableUnits = getAvailableUnits();

  React.useEffect(() => {
    (async () => {
      const client = new RecipeClient();
      const fetchRecipe = client.getRecipe({ recipeId });
      console.log(await fetchRecipe);
    })();
  }, []);


  return {
    scaler,
    setScaler,
    isCelsius,
    setIsCelsius,
    id,
    title,
    subTitle,
    instructions,
    availableUnits,
    ingredients,
    ovenHeat,
    servings,
    appliances,
    image,
  };
}
