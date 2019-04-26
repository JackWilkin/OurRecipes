
// scaler = scales to a cup, meaning that to get a scaler for a
// unit you need to know how many fit in a cup
const LOREM_1 = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut imperdiet risus, a laoreet ex. Donec vitae ipsum ullamcorper velit scelerisque hendrerit. Etiam a 
    enim ac magna ornare suscipit. Morbi accumsan tellus eu porta tincidunt. Donec ut felis sed augue accumsan fringilla. Praesent imperdiet risus tellus, non malesuada arcu 
    hendrerit a. Praesent quam arcu, convallis sed massa eget, commodo pharetra nulla. Nam vel ornare quam. Aliquam erat volutpat.
`;
const LOREM_2 = `
    Integer a nunc in massa finibus consequat. Curabitur scelerisque lorem aliquam mauris rhoncus egestas. In at eros et quam tempor faucibus a ut risus. Praesent in libero 
    ullamcorper, elementum neque ac, consequat enim. Donec vulputate lorem eu turpis varius, laoreet varius augue finibus. Nulla facilisi. Nulla mollis bibendum erat, non pretium 
    tortor placerat eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque vel dolor ac odio lobortis dignissim vel quis nunc. 
    Donec convallis nulla tortor, et facilisis turpis scelerisque fermentum. Cras et enim sed orci blandit viverra.

    Pellentesque tristique dolor nec molestie blandit. Nam volutpat velit sed laoreet consequat. Maecenas non maximus libero. Etiam ut volutpat magna. Curabitur sed purus 
    vestibulum, blandit justo eget, facilisis massa. Donec maximus in sem nec molestie. Quisque bibendum, magna ut rutrum malesuada, nisl tellus fermentum justo, nec 
    fermentum nisi urna in nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed gravida lectus enim, id tincidunt est 
    auctor vel. Phasellus consequat consequat turpis, nec semper odio imperdiet id. Donec ac dapibus enim. Quisque bibendum sem nisl, in pretium nisi sodales vitae. 
    Interdum et malesuada fames ac ante ipsum primis in faucibus.
`;
const LOREM_3 = `
    Pellentesque tristique dolor nec molestie blandit. Nam volutpat velit sed laoreet consequat. Maecenas non maximus libero. Etiam ut volutpat magna. Curabitur sed purus 
    vestibulum, blandit justo eget, facilisis massa. Donec maximus in sem nec molestie. Quisque bibendum, magna ut rutrum malesuada, nisl tellus fermentum justo, nec 
    fermentum nisi urna in nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed gravida lectus enim, id tincidunt est 
    auctor vel. Phasellus consequat consequat turpis, nec semper odio imperdiet id. Donec ac dapibus enim. Quisque bibendum sem nisl, in pretium nisi sodales vitae. 
    Interdum et malesuada fames ac ante ipsum primis in faucibus.
`;

const LOREM = `${LOREM_1}${LOREM_2}${LOREM_3}`;
const CUP = {
  scaler: 1, name: 'cup', plural: 'cups', id: 0,
};
const TSP = {
  scaler: 48, name: 'tsp', plural: 'tsp', id: 1,
};
const TBSP = {
  scaler: 16, name: 'Tbsp', plural: 'Tbsp', id: 2,
};
const BOX = {
  scaler: null, name: 'box', plural: 'boxes', id: 3,
};
const PACKAGE = {
  scaler: null, name: 'package', plural: 'packages', id: 4,
};

const AVAILABLE_UNITS = [CUP, TSP, TBSP];

const BLENDER = { name: 'Blender', instructions: 'follow instructions on the box', id: 0 };
const ELECTRIC_MIXER = { name: 'Electric mixer', instructions: null, id: 1 };

const APPLIANCES = [BLENDER, ELECTRIC_MIXER];

const SALT = { name: 'salt', unit: TSP, quantity: 1.5 };
const PARMESAN = { name: 'parmesan', unit: CUP, quantity: 1 };
const PASTA = { name: 'pasta', unit: BOX, quantity: 0.75 };
const BACON = { name: 'bacon', unit: PACKAGE, quantity: 0.5 };
const EGGS = {
  name: 'egg', plural: 'eggs', unit: null, quantity: 3,
};

const INGREDIENTS = [SALT, PARMESAN, PASTA, BACON, EGGS];

const RECIPE_FULL = {
  id: 2,
  scaler: 2,
  title: 'Full Recipe',
  subTitle: 'Mock Subtitle',
  isCelsius: false,
  ovenHeat: 350,
  servings: 4,
  instructions: LOREM,
  appliances: APPLIANCES,
  ingredients: INGREDIENTS,
  image: '17.jpg',
};

const RECIPE_1 = {
  id: 1,
  title: 'Recipe 1',
  isCelsius: false,
  instructions: LOREM_2,
  ingredients: INGREDIENTS,
  image: '17.jpg',
};

const BARE_RECIPE = {
  id: 0,
  title: 'Basic Recipe',
  instructions: LOREM_1,
  ingredients: [],
};

const RECIPES = [RECIPE_FULL, BARE_RECIPE, RECIPE_1];

const MOCK_DATA = {
  recipe: RECIPE_FULL, recipes: RECIPES, availableUnits: AVAILABLE_UNITS, ingredients: INGREDIENTS,
};

export default MOCK_DATA;
