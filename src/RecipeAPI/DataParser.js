export function recipeParser(json) {
  let recipe = json;
  if (Array.isArray(json)) {
    [recipe] = json;
  }
  const {
    IsCelsius: isCelcius,
    OvenHeat: ovenHeat, RecipeId: id, RecipeInstructions: instructions, RecipeTitle: title,
  } = recipe;

  const ingredients = [];
  return {
    isCelcius, ovenHeat, id, instructions, title, ingredients,
  };
}

export function recipeListParser(jsonList) {
  return jsonList.map(recipeParser);
}

export function ingredientParser(json) {
  let ingredient = json;
  if (Array.isArray(json)) {
    [ingredient] = json;
  }
  const unitName = ingredient.Unit ? ingredient.Unit[0] : '';
  let unit = {
    scaler: null, name: unitName, plural: unitName, id: 1,
  };
  if (unitName === 'Self') {
    unit = null;
  }

  const hasUnit = !(unit === null);
  const unitConvertable = false;
  const {
    IngredientId: id, IngredientName: name, Quantity: quantity, RecipeId: recipeId,
  } = ingredient;

  const ingredients = [];
  return {
    id, name, quantity, recipeId, ingredients, unit, hasUnit, unitConvertable,
  };
}

export function ingredientListParser(jsonList) {
  return jsonList.map(ingredientParser);
}
