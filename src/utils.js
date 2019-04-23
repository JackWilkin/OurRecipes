export function decimalToFraction(decimal, maxDenominator) {
  for (let d = 1; d <= maxDenominator; d += 1) {
    const currentNumerator = (decimal * d).toFixed(4);
    if ((currentNumerator % 1) === 0) {
      if (d === 1) {
        const integer = Math.floor(currentNumerator / d);
        return `${integer}`;
      }
      if (currentNumerator > d) {
        const integer = Math.floor(currentNumerator / d);
        const remainder = currentNumerator - integer * d;
        return `${integer} ${remainder}/${d}`;
      }
      if (currentNumerator === d) {
        return '1';
      }
      if (d > currentNumerator) {
        return `${Math.round(currentNumerator)}/${d}`;
      }
    }
  }
  return 'reached max denominator';
}

export function convertTemperature(temperature, isCelsius) {
  if (isCelsius) {
    return Math.round((temperature * 9 / 5) + 32);
  }

  return Math.round((temperature - 32) * 5 / 9);
}

export function convertUnit(quantity, newUnitScaler, origionalUnitScaler) {
  if (quantity === null) {
    return quantity;
  }
  return quantity * newUnitScaler / origionalUnitScaler;
}
