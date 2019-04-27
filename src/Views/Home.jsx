import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import background from '../Content/Images/pasta.png';
import RecipePreview from '../Components/RecipePreview';

const HomePage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 20rem;
  overflow: hidden;
  background-image: url(${background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  justify-content: center;
  margin-bottom: 3rem;
`;

const FeaturedRecipe = styled.div`
  margin-bottom: 3rem;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

function Home({ context }) {
  const { recipes } = context;
  const displayRecipes = recipes.length;
  return (
    <HomePage>
      <Header>
        <Input placeholder="Search Recipes" />
      </Header>
      {displayRecipes
      && (
      <div>
        <FeaturedRecipe>
          <RecipePreview recipe={recipes[11]} />
        </FeaturedRecipe>
        <FeaturedRecipe>
          <RecipePreview recipe={recipes[17]} />
        </FeaturedRecipe>
        <FeaturedRecipe>
          <RecipePreview recipe={recipes[25]} />
        </FeaturedRecipe>
      </div>
      )
      }
    </HomePage>
  );
}

export default Home;
