import React from 'react';
// import MockData from '../tests/MockData';
import RecipeClient from '../RecipeAPI/RecipeClient';

const client = new RecipeClient();

// function createIngredient(ingredient) {
//   const {
//     name, unit, quantity, plural,
//   } = ingredient;
//   const hasUnit = unit !== undefined && unit !== null;
//   const unitConvertable = hasUnit && unit.scaler !== undefined && unit.scaler !== null;
//   return {
//     name, unit, quantity, hasUnit, unitConvertable, plural,
//   };
// }

// function formatRecipeData(recipe) {
//   const formattedRecipe = recipe;

//   const ingredients = recipe.ingredients.map(ingredient => createIngredient(ingredient));
//   formattedRecipe.ingredients = ingredients;
//   return formattedRecipe;
// }

// async function getIngredients(recipe) {
//   const recipeIngredients = await client.getIngredients({ recipeId: recipe.id });
//   return { recipeId: recipe.id, recipeIngredients };
// }

// async function getAvailableUnits() {
//   // const { availableUnits } = MockData;
//   const fetchAvailableUnits = client.getConvertableUnits();
//   const availableUnits = await fetchAvailableUnits;
//   return availableUnits;
// }

export default function useSiteData() {
  const [recipes, setRecipes] = React.useState([]);
  const [recipeIngredients, setRecipeIngredients] = React.useState([]);
  const [availableUnits, setAvailableUnits] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const fetchRecipes = client.getAllRecipes();
      const fetchRecipeIngredients = client.getRecipeIngredients();
      const fetchAvailableUnits = client.getConvertableUnits();
      setRecipes(await fetchRecipes);
      setRecipeIngredients(await fetchRecipeIngredients);
      setAvailableUnits(await fetchAvailableUnits);
    })();
  }, []);


  return {
    recipes,
    recipeIngredients,
    availableUnits,
  };
}
