import React, { useContext } from 'react';
import styled from 'styled-components';
// import { lightBlue } from '../Styles/constants';
import RecipeCard from '../Components/RecipeCard';
import GlobalContext from '../Context/GlobalContext';

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

const RecipePreview = styled.div`
  width: 100%
  max-width: 20rem;
  margin: 1rem;
`;

function Browse() {
  const { recipes } = useContext(GlobalContext);

  const displayRecipes = recipes.filter(recipe => recipe.id !== 0);

  const recipeList = recipes.length ? displayRecipes.map(recipe => (
    <RecipePreview key={recipe.id}>
      <RecipeCard recipe={recipe} />
    </RecipePreview>
  )) : '';

  return (
    <BrowsePage>
      <Header>
        <PageTitle>Browse Our Recipes</PageTitle>
      </Header>
      <RecipeList>
        {recipeList}
      </RecipeList>
    </BrowsePage>
  );
}

export default Browse;
