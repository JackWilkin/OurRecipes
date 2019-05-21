import React, { useContext } from 'react';
import styled from 'styled-components';
import background from '../Content/Images/pasta.png';
import RecipeCard from '../Components/RecipeCard';
import GlobalContext from '../Context/GlobalContext';

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

const FeaturedRecipes = styled.div`
  display: flex;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const FeaturedRecipe = styled.div`
  width: 100%;
  max-width: 28rem;
  margin: 1rem;
`;

function Home() {
  const { recipes } = useContext(GlobalContext);
  const displayRecipes = recipes.length > 0;
  return (
    <HomePage>
      <Header>
        {/* <Input placeholder="Search Recipes" /> */}
      </Header>
      {displayRecipes
      && (
      <FeaturedRecipes>
        <FeaturedRecipe>
          <RecipeCard recipe={recipes.find(recipe => recipe.id === 15)} />
        </FeaturedRecipe>
        <FeaturedRecipe>
          <RecipeCard recipe={recipes.find(recipe => recipe.id === 34)} />
        </FeaturedRecipe>
        <FeaturedRecipe>
          <RecipeCard recipe={recipes.find(recipe => recipe.id === 17)} />
        </FeaturedRecipe>
        <FeaturedRecipe>
          <RecipeCard recipe={recipes.find(recipe => recipe.id === 33)} />
        </FeaturedRecipe>
      </FeaturedRecipes>
      )
      }
    </HomePage>
  );
}

export default Home;
