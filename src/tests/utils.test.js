import MockData from './MockData';
import {
  decimalToFraction, convertTemperature, convertUnit, createIngredientDisplay,
} from '../utils';

const CUP = MockData.availableUnits[0];
const TSP = MockData.availableUnits[1];
const TBSP = MockData.availableUnits[2];

const SALT = MockData.ingredients[0];
const PARMESAN = MockData.ingredients[1];
const PASTA = MockData.ingredients[2];
const BACON = MockData.ingredients[3];
const EGGS = MockData.ingredients[4];

describe('Test Utils Functions', () => {
  test('Test decimalToFraction', () => {
    expect(decimalToFraction(0.66666, 1000)).toBe('2/3');
    expect(decimalToFraction(1, 1000)).toBe('1');
    expect(decimalToFraction(1.5, 1000)).toBe('1 1/2');
  });

  test('Test convertTemperature', () => {
    expect(convertTemperature(350, false)).toBe(177);
    expect(convertTemperature(180, true)).toBe(356);
    expect(convertTemperature(-40, true)).toBe(-40);
    expect(convertTemperature(-40, false)).toBe(-40);
  });

  test('Test convertUnit', () => {
    expect(convertUnit(0.5, TBSP.scaler, TSP.scaler)).toBe(1.5);
    expect(convertUnit(1.5, TSP.scaler, TBSP.scaler)).toBe(0.5);
    expect(convertUnit(0.5, CUP.scaler, TBSP.scaler)).toBe(8);
    expect(convertUnit(8, TBSP.scaler, CUP.scaler)).toBe(0.5);
  });

  test('Test createIngredientDisplay', () => {
    expect(createIngredientDisplay({ ingredient: SALT, scaler: 1 }).ingredientString).toBe('1 1/2 tsp salt');
    expect(createIngredientDisplay({ ingredient: PARMESAN, scaler: 1 }).ingredientString).toBe('1 cup parmesan');
    expect(createIngredientDisplay({ ingredient: PARMESAN, scaler: 3 }).ingredientString).toBe('3 cups parmesan');
    expect(createIngredientDisplay({ ingredient: PASTA, scaler: 1 }).ingredientString).toBe('3/4 box pasta');
    expect(createIngredientDisplay({ ingredient: BACON, scaler: 3 }).ingredientString).toBe('1 1/2 packages bacon');
    expect(createIngredientDisplay({ ingredient: EGGS, scaler: 1 }).ingredientString).toBe('3  eggs');
    expect(createIngredientDisplay({ ingredient: EGGS, scaler: 1 / 3 }).ingredientString).toBe('1  egg');
  });

  // TODO: tests for getRecipeImage
});
