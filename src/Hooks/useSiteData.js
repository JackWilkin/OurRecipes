import React from 'react';
import RecipeClient from '../RecipeAPI/RecipeClient';

const client = new RecipeClient();

export default function useSiteData() {
  const [recipes, setRecipes] = React.useState([]);
  const [ingredientsByRecipe, setIngredientsByRecipe] = React.useState([]);
  const [availableUnits, setAvailableUnits] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const fetchRecipeIngredients = client.getRecipeIngredients();
      const fetchAvailableUnits = client.getConvertableUnits();
      // TODO: add these back after recipe preview style facelift
      // const fetchRecipes = client.getAllRecipes();
      // setRecipes(await fetchRecipes);
      setIngredientsByRecipe(await fetchRecipeIngredients);
      setAvailableUnits(await fetchAvailableUnits);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      if (ingredientsByRecipe.length > 0) {
        const fetchRecipes = client.getAllRecipes();
        const fetchedRecipes = await fetchRecipes;
        setRecipes(fetchedRecipes.map((recipe) => {
          if (ingredientsByRecipe && ingredientsByRecipe.length) {
            const ingredients = ingredientsByRecipe[recipe.id];
            const fullRecipe = { ...recipe, ingredients };
            setIsLoading(false);
            return fullRecipe;
          }
          return recipe;
        }));
      }
    })();
  }, [ingredientsByRecipe]);

  return {
    isLoading,
    recipes,
    availableUnits,
  };
}
