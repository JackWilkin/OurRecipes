import { recipeListParser, recipeParser, ingredientListParser } from './DataParser';

// https://llfrecipes-6c4b.restdb.io/rest/ingredient?q={}&h={%22$groupby%22:[%22RecipeId%22]}
const API_URL = 'https://llfrecipes-6c4b.restdb.io/rest/';
const API_KEY = '5aa5d596f0a7555103cea3c8';

class RecipeClient {
  constructor() {
    this.apiUrl = API_URL;
    this.apikey = API_KEY;
  }

  // Get all RecipeIngredients grouped by RecipeId
  async getRecipeIngredients() {
    const url = `${this.apiUrl}ingredient?q={}&h={"$groupby":["RecipeId"]}`;
    const response = await fetch(url, {
      method: 'get',
      headers: {
        'x-apikey': this.apikey,
      },
    });
    if (response.status >= 400) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    const recipeIngredientLists = Object.entries(json).map(((recipeMapping) => {
      const recipeId = recipeMapping[0];
      const ingredients = ingredientListParser(recipeMapping[1]);
      return { recipeId, ingredients };
    }));
    const recipeIngredientDictionary = [];
    recipeIngredientLists.forEach((entry) => {
      recipeIngredientDictionary[entry.recipeId] = entry.ingredients;
    });
    return recipeIngredientDictionary;
  }

  // Get all ingredients by recipeId
  async getIngredients({ recipeId }) {
    const url = `${this.apiUrl}ingredient?q={"RecipeId":${recipeId}}`;
    const response = await fetch(url, {
      method: 'get',
      headers: {
        'x-apikey': this.apikey,
      },
    });
    if (response.status >= 400) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    return ingredientListParser(json);
  }

  // Get all the recipes in the database -> to display on browse
  async getAllRecipes() {
    const url = `${this.apiUrl}recipe?q={}&h={"$orderby": {"RecipeTitle": 1}}`;
    const response = await fetch(url, {
      method: 'get',
      headers: {
        'x-apikey': this.apikey,
      },
    });
    if (response.status >= 400) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    return recipeListParser(json);
  }

  // Get a recipe by a given id TODO: get by title
  async getRecipe({ recipeId }) {
    const url = `${this.apiUrl}recipe?q={"RecipeId":${recipeId}}`;
    const response = await fetch(url, {
      method: 'get',
      headers: {
        'x-apikey': this.apikey,
      },
    });
    if (response.status >= 400) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    const recipe = recipeParser(json);
    const ingredients = await this.getIngredients({ recipeId: recipe.id });
    recipe.ingredients = ingredients;
    return recipe;
  }
}

export default RecipeClient;
