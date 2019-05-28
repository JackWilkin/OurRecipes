import math from 'mathjs';

export function decimalToFraction(decimal) {
  let fraction = math.fraction(decimal);

  if (fraction.d > 32) {
    fraction = math.fraction(math.round(32 * decimal) / 32);
  }

  if (fraction.d === 1) {
    return fraction.n.toString();
  }
  if (fraction.n > fraction.d) {
    const integer = math.floor(fraction.n / fraction.d);
    const remainder = fraction.n % fraction.d;
    return `${integer} ${remainder}/${fraction.d}`;
  }

  return math.format(fraction).toString();
}

export function convertTemperature(temperature, isCelsius) {
  if (isCelsius) {
    return Math.round((temperature * 9 / 5) + 32);
  }

  return Math.round((temperature - 32) * 5 / 9);
}

export function convertUnit(quantity, origionalUnitScaler, newUnitScaler) {
  if (quantity === null) {
    return quantity;
  }
  return quantity * newUnitScaler / origionalUnitScaler;
}

export function createIngredientDisplay({ ingredient, scaler }) {
  const quantity = ingredient.quantity * scaler;
  const quantityDisplay = decimalToFraction(quantity, 1000);
  let unitDisplay = ingredient.unit ? ingredient.unit.name : '';
  unitDisplay = unitDisplay !== '' && quantity > 1 && ingredient.unit.plural ? ingredient.unit.plural : unitDisplay;
  const ingredientDisplay = quantity > 1 && ingredient.plural ? ingredient.plural : ingredient.name;
  const ingredientString = `${quantityDisplay} ${unitDisplay} ${ingredientDisplay}`;

  return {
    ingredientString, quantityDisplay, unitDisplay, ingredientDisplay,
  };
}

/**
 * Get recipe image for the given recipe
 * @param {int} recipeId
 * @returns {bool} hasImage -> whether this recipe has an image
 * @returns {String} recipeImage -> src of this recipe image or null
 */
export function getRecipeImage(recipeId) {
  let hasImage = true;
  let recipeImage = null;
  try {
    const images = require.context('./Content/Recipe Images', true);
    recipeImage = images(`./${recipeId}.jpg`);
  } catch (e) {
    hasImage = false;
  }
  return { hasImage, recipeImage };
}
