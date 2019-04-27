import React, { useContext } from 'react';
import styled from 'styled-components';
// import { Input } from 'semantic-ui-react';
// import icon from '../Content/Images/pasta.png';
// import { darkBlue } from '../Styles/constants';
import RecipePreview from '../Components/RecipePreview';

const BrowsePage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  justify-content: center;
  display: flex;
  height: fit-content;
  padding: 0.5rem;
  width: 100%;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
`;

const RecipeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const RecipeItem = styled.div`
  width: 100%;
  max-width: 60rem;
  background-color: #EFF1F7;
  border-radius: 1rem;
  margin-bottom: 0.75rem;
  overflow: hidden;

  > :last-child {
    overflow: hidden;
    max-height: 0;
    border: none;
    transition: max-height 0.1s ease-out;
  }

  &:hover {
    background-color: #87AAD1;
      > :last-child {
        max-height: 15rem;
      }
  }
`;

const ItemTitle = styled.h2`
  margin: auto;
  text-align: center;
  padding: 1rem;
`;

function Browse({ context }) {
  const allRecipes = context.recipes;

  const recipeList = allRecipes.length ? allRecipes.map(recipe => (
    <RecipeItem>
      <ItemTitle>{recipe.title}</ItemTitle>
      <RecipePreview recipe={recipe} />
    </RecipeItem>
  )) : '';
  return (
    <BrowsePage>
      <Header>
        <PageTitle>
        Browse Our Recipes
        </PageTitle>
      </Header>
      <RecipeList>
        {recipeList}
      </RecipeList>

    </BrowsePage>
  );
}

export default Browse;
