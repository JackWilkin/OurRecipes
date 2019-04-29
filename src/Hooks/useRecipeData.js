import React from 'react';
import MockData from '../tests/MockData';
import RecipeClient from '../RecipeAPI/RecipeClient';
import { convertTemperature } from '../utils';

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
  // const { recipe } = MockData;
  // const {
  //   id,
  //   title,
  //   subTitle,
  //   instructions,
  //   ingredients,
  //   ovenHeat,
  //   servings,
  //   appliances,
  //   image,
  // } = formatRecipeData(recipe);
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
  const availableUnits = getAvailableUnits();

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
      setOvenHeat(recipe.ovenHeat);
      setServings(recipe.servings);
      setAppliances(recipe.appliances);
      setIsCelsius(recipe.isCelsius);

      const hasOvenHeat = !(recipe.ovenHeat === 0);
      if (hasOvenHeat) {
        setCelsius(recipe.isCelsius ? recipe.ovenHeat : convertTemperature(recipe.ovenHeat, recipe.isCelsius));
        setFahrenheit(recipe.isCelsius ? convertTemperature(recipe.ovenHeat, recipe.isCelsius) : recipe.ovenHeat);
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
