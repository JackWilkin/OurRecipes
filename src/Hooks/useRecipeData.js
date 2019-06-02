import React from 'react';
import RecipeClient from '../RecipeAPI/RecipeClient';

export default function useRecipeData(recipeId) {
  const [id, setId] = React.useState();
  const [title, setTitle] = React.useState();
  const [subTitle, setSubTitle] = React.useState('');
  const [instructions, setInstructions] = React.useState('');
  const [ingredients, setIngredients] = React.useState([]);
  const [ovenHeat, setOvenHeat] = React.useState(0);
  const [servings, setServings] = React.useState('');
  const [appliances, setAppliances] = React.useState([]);
  const [isCelsius, setIsCelsius] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const client = new RecipeClient();
      const fetchRecipe = client.getRecipe({ recipeId });
      const recipe = await fetchRecipe;

      setId(recipe.id);
      setTitle(recipe.title);
      setSubTitle(recipe.subTitle);
      setInstructions(recipe.instructions);
      setIngredients(recipe.ingredients);
      setServings(recipe.servings);
      setAppliances(recipe.appliances);
      setIsCelsius(recipe.isCelsius);
      setOvenHeat(recipe.ovenHeat);
    })();
  }, []);

  return {
    isCelsius,
    id,
    title,
    subTitle,
    instructions,
    ingredients,
    ovenHeat,
    servings,
    appliances,
  };
}
