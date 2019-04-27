import React from 'react';
import MockData from '../tests/MockData';
import RecipeClient from '../RecipeAPI/RecipeClient';

const client = new RecipeClient();

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

async function getIngredients(recipe) {
  const recipeIngredients = await client.getIngredients({ recipeId: recipe.id });
  return { recipeId: recipe.id, recipeIngredients };
}

export default function useAllRecipes() {
  const [recipes, setRecipes] = React.useState([]);
  const [recipeIngredients, setRecipeIngredients] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const fetchRecipes = client.getAllRecipes();
      const fetchRecipeIngredients = client.getRecipeIngredients();
      setRecipes(await fetchRecipes);
      setRecipeIngredients(await fetchRecipeIngredients);

      // const allPromises = availableRecipes.map(getIngredients);

      // const recipeIngredientMap = await Promise.all(allPromises);
      // setRecipeIngredients(recipeIngredientMap);
    })();
  }, []);


  return {
    recipes,
    recipeIngredients,
  };
}
