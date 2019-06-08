import React, { useContext } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import SearchableSelect from '../Components/Search';
import LoadingSpinner from '../Components/LoadingSpinner';
import background from '../Content/Images/pasta.png';
import RecipeCard from '../Components/RecipeCard';
import GlobalContext from '../Context/GlobalContext';
import { appBarHeight } from '../Styles/constants';

const HomePage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: ${props => (props.isLoading ? `calc(100% - ${appBarHeight})` : 'auto')}; 
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
`;

const FeaturedRecipes = styled.div`
  display: flex;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const FeaturedRecipe = styled.div`
  width: 100%;
  max-width: 28rem;
  margin: 1rem;
`;

function Home() {
  const { recipes, isLoading } = useContext(GlobalContext);

  const featuredIds = [15, 34, 17, 33, 7, 35, 36];
  const featuredRecipes = recipes.filter(
    recipe => featuredIds.includes(recipe.id),
  );

  const displayRecipes = featuredRecipes.map(
    featuredRecipe => (
      <FeaturedRecipe key={featuredRecipe.id}>
        <RecipeCard recipe={featuredRecipe} />
      </FeaturedRecipe>
    ),
  );

  const searchOptions = recipes.map(recipe => ({ label: recipe.title, value: recipe.id }));
  const [doRedirect, setDoRedirect] = React.useState(false);
  const [redirectLink, setRedirectLink] = React.useState('');
  const redirect = (item) => {
    if (Number.isInteger(item.value)) {
      setRedirectLink(`/Recipe/${item.value}`);
      setDoRedirect(true);
    }
  };

  return (
    <HomePage isLoading={isLoading}>
      {doRedirect && <Redirect to={redirectLink} />}
      <Header>
        <SearchableSelect
          id="home-search"
          // label="Search"
          onChange={redirect}
          placeholder="Search recipes"
          options={searchOptions}
          isDisabled={isLoading}
        />
      </Header>
      <FeaturedRecipes>
        {isLoading ? <LoadingSpinner /> : displayRecipes}
      </FeaturedRecipes>
    </HomePage>
  );
}

export default Home;
