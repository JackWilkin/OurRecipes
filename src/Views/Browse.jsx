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

// const RecipeItem = styled.div`
//   width: 100%;
//   max-width: 60rem;
//   background-color: #EFF1F7;
//   border-radius: 1rem;
//   margin-bottom: 0.75rem;
//   overflow: hidden;

//   > :last-child {
//     overflow: hidden;
//     max-height: 0;
//     border: none;
//     transition: max-height 0.1s ease-out;
//   }

//   &:hover {
//     background-color: ${lightBlue};
//       > :last-child {
//         max-height: 15rem;
//       }
//   }
// `;

// const ItemTitle = styled.h2`
//   margin: auto;
//   text-align: center;
//   padding: 1rem;
// `;

function Browse() {
  const { recipes } = useContext(GlobalContext);

  const recipeList = recipes.length ? recipes.map(recipe => (
    <RecipeCard recipe={recipe} />
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
