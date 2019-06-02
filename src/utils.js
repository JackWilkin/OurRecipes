import math from 'mathjs';

// TODO: return object with decimal and fraction representation
// Investigate: types Metric/english
export function decimalToFraction(decimal) {
  let fraction = math.fraction(decimal);

  // If denominator is over 32 round to nearest 32nd
  const maxDenominator = 32;
  if (fraction.d > maxDenominator) {
    fraction = math.fraction(math.round(maxDenominator * decimal) / maxDenominator);
  }

  if (fraction.d === 1) {
    return fraction.n === 0 ? 'N/A' : fraction.n.toString();
  }
  if (fraction.n > fraction.d) {
    const integer = math.floor(fraction.n / fraction.d);
    const remainder = fraction.n % fraction.d;
    return `${integer} ${remainder}/${fraction.d}`;
  }

  return math.format(fraction).toString();
}

export function convertTemperature(temperature, isCelsius) {
  return isCelsius ? Math.round((temperature * 9 / 5) + 32)
    : Math.round((temperature - 32) * 5 / 9);
}

export function convertUnit(quantity, origionalUnitScaler, newUnitScaler) {
  if (quantity === null) {
    return quantity;
  }
  return quantity * newUnitScaler / origionalUnitScaler;
}

// TODO: take, quantity, unit, name, plural, scaler
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
