import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import background from '../Content/Images/pasta.png';
import RecipePreview from '../Components/RecipePreview';
import MockData from '../tests/MockData';

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

function Home() {
  return (
    <HomePage>
      <Header>
        <Input placeholder="Search Recipes" />
      </Header>
      <FeaturedRecipe>
        <RecipePreview recipe={MockData.recipes[0]} />
      </FeaturedRecipe>
      <FeaturedRecipe>
        <RecipePreview recipe={MockData.recipes[1]} />
      </FeaturedRecipe>
      <FeaturedRecipe>
        <RecipePreview recipe={MockData.recipes[2]} />
      </FeaturedRecipe>
    </HomePage>
  );
}

export default Home;
