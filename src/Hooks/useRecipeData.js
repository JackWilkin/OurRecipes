import React from 'react';
import RecipeClient from '../RecipeAPI/RecipeClient';
import { convertTemperature } from '../utils';

export default function useRecipeData(recipeId) {
  const [id, setId] = React.useState();
  const [title, setTitle] = React.useState();
  const [subTitle, setSubTitle] = React.useState('');
  const [instructions, setInstructions] = React.useState('');
  const [ingredients, setIngredients] = React.useState([]);
  const [ovenHeat, setOvenHeat] = React.useState(0);
  const [servings, setServings] = React.useState('');
  const [appliances, setAppliances] = React.useState([]);
  const [scaler, setScaler] = React.useState(1);
  const [isCelsius, setIsCelsius] = React.useState(false);
  const [celsius, setCelsius] = React.useState('Celsius');
  const [fahrenheit, setFahrenheit] = React.useState('Fahrenheit');
  const [availableUnits, setAvailableUnits] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const client = new RecipeClient();
      const fetchRecipe = client.getRecipe({ recipeId });
      const fetchAvailableUnits = client.getConvertableUnits();
      const recipe = await fetchRecipe;

      setId(recipe.id);
      setTitle(recipe.title);
      setSubTitle(recipe.subTitle);
      setInstructions(recipe.instructions);
      setIngredients(recipe.ingredients);
      setOvenHeat(recipe.ovenHeat);
      setServings(recipe.servings);
      setAppliances(recipe.appliances);
      setIsCelsius(recipe.isCelsius);
      setAvailableUnits(await fetchAvailableUnits);

      const hasOvenHeat = !(recipe.ovenHeat === 0);
      if (hasOvenHeat) {
        const convertedTemp = convertTemperature(recipe.ovenHeat, recipe.isCelsius);
        const celsiusDisplay = recipe.isCelsius ? recipe.ovenHeat : convertedTemp;
        const fahrenheitDisplay = recipe.isCelsius ? convertedTemp : recipe.ovenHeat;
        setCelsius(celsiusDisplay);
        setFahrenheit(fahrenheitDisplay);
      }
    })();
  }, []);

  return {
    scaler,
    setScaler,
    isCelsius,
    setIsCelsius,
    celsius,
    fahrenheit,
    id,
    title,
    subTitle,
    instructions,
    availableUnits,
    ingredients,
    ovenHeat,
    servings,
    appliances,
  };
}
