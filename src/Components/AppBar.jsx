import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darkBlue } from '../Styles/constants';

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

export default function RecipePreview() {
  return (
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
  );
}