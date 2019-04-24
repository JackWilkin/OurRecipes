import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import background from '../Content/Images/pasta.png';
import { darkBlue } from '../Styles/constants';
import RecipePreview from '../Components/RecipePreview';
import MockData from '../tests/MockData';

const HomePage = styled.main`
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

const NavbarLink = styled.span`
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

function Home() {
  return (
    <HomePage>
      <Navbar>
        <NavbarTitle>Our Recipes</NavbarTitle>
        <NavbarLink>
          Browse
        </NavbarLink>
        <NavbarLink>
          About
        </NavbarLink>
      </Navbar>
      <Header>
        <Input placeholder="Search Recipes" />
      </Header>
      <RecipePreview recipe={MockData.recipes[0]} />
      <RecipePreview recipe={MockData.recipes[1]} />
      <RecipePreview recipe={MockData.recipes[2]} />
    </HomePage>
  );
}

export default Home;
