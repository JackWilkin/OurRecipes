export function recipeParser(json) {
  let recipe = json;
  const ingredients = [];
  if (Array.isArray(json)) {
    [recipe] = json;
  }
  const {
    IsCelsius: isCelsius,
    OvenHeat: ovenHeat,
    RecipeId: id,
    RecipeInstructions: instructions,
    RecipeTitle: title,
  } = recipe;

  return {
    isCelsius, ovenHeat, id, instructions, title, ingredients,
  };
}

export function ingredientParser(json) {
  let ingredient = json;
  if (Array.isArray(json)) {
    [ingredient] = json;
  }
  let unit = ingredient.Unit;

  if (ingredient.Unit === -1) {
    unit = null;
  }

  const {
    IngredientId: id,
    IngredientName: name,
    Quantity: quantity,
    RecipeId: recipeId,
    notes,
  } = ingredient;

  return {
    id, name, quantity, recipeId, unit, notes,
  };
}

export function unitParser(json) {
  let unit = json;
  if (Array.isArray(json)) {
    [unit] = json;
  }
  const {
    name, plural, scaler, unitId: id,
  } = unit;

  return {
    name, plural, scaler, id,
  };
}

export function ingredientListParser(jsonList) {
  return jsonList.map(ingredientParser);
}

export function recipeListParser(jsonList) {
  return jsonList.map(recipeParser);
}

export function unitListParser(jsonList) {
  return jsonList.map(unitParser);
}
