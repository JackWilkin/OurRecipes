export function recipeParser(json) {
  let recipe = json;
  if (Array.isArray(json)) {
    [recipe] = json;
  }
  const {
    IsCelsius: isCelsius,
    OvenHeat: ovenHeat, RecipeId: id, RecipeInstructions: instructions, RecipeTitle: title,
  } = recipe;

  const ingredients = [];
  return {
    isCelsius, ovenHeat, id, instructions, title, ingredients,
  };
}

export function ingredientParser(json) {
  let ingredient = json;
  if (Array.isArray(json)) {
    [ingredient] = json;
  }
  const unitName = ingredient.Unit ? ingredient.Unit[0] : '';
  let unit = null;

  switch (unitName) {
    case 'Cup':
      unit = {
        scaler: 1, name: unitName, plural: `${unitName}s`, id: 0,
      };
      break;
    case 'tsp':
      unit = {
        scaler: 48, name: unitName, plural: unitName, id: 1,
      };
      break;
    case 'Tbs':
      unit = {
        scaler: 16, name: unitName, plural: unitName, id: 2,
      };
      break;
    case 'Self':
    default:
      unit = null;
      break;
  }

  const hasUnit = !(unit === null);
  const unitConvertable = true;
  const {
    IngredientId: id, IngredientName: name, Quantity: quantity, RecipeId: recipeId, notes,
  } = ingredient;

  const ingredients = [];
  return {
    id, name, quantity, recipeId, ingredients, unit, hasUnit, unitConvertable, notes,
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
