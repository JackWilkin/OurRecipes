import React from 'react';
// import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Views/Home';
import Browse from './Views/Browse';
import Recipe from './Views/Recipe';
import { darkBlue } from './Styles/constants';
import useAllRecipes from './Hooks/useAllRecipes';

const Navbar = styled.div`
  align-items: center;
  background-color: ${darkBlue};
  display: flex;
  height: 3.5rem;
  width: 100%;
`;

const NavbarTitle = styled.span`
  color: white;
  font-size: 1.5rem;
  flex-grow: 1;
  padding-left: 1rem;
`;

const NavbarLink = styled(Link)`
  border-left: 1px solid white;
  color: white;
  height: 100%
  width: fit-content;
  padding: 1rem;

  &:hover {
    background-color: white;
    color: ${darkBlue};
  }
`;

export default function App() {
  const context = useAllRecipes();

  const recipes = context.recipes.map((recipe) => {
    const { recipeIngredients } = context;
    if (recipeIngredients && recipeIngredients.length) {
      const ingredients = recipeIngredients[recipe.id];
      const fullRecipe = { ...recipe, ingredients };
      return fullRecipe;
    }
    return recipe;
  });

  const browseContext = { recipes };
  return (
    <Router>
      <Navbar>
        <NavbarTitle>Our Recipes</NavbarTitle>
        <NavbarLink to="/Browse">
          Browse
        </NavbarLink>
        {/* <NavbarLink>
          About
        </NavbarLink> */}
        <NavbarLink to="/">
          Home
        </NavbarLink>
      </Navbar>

      <Route path="/Recipe/:id" component={Recipe} />
      <Route exact path="/" component={() => <Home context={browseContext} />} />
      <Route path="/Browse" component={() => <Browse context={browseContext} />} />
    </Router>
  );
}
