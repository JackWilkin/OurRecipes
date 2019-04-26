import React from 'react';
// import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Views/Home';
import Browse from './Views/Browse';
import Recipe from './Views/Recipe';
import { darkBlue } from './Styles/constants';

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
  return (
    <Router>
      <Navbar>
        <NavbarTitle>Our Recipes</NavbarTitle>
        <NavbarLink to="/Browse">
          Browse
        </NavbarLink>
        <NavbarLink>
          About
        </NavbarLink>
        <NavbarLink to="/Recipe/1">
          Recipe Test
        </NavbarLink>
        <NavbarLink to="/">
          Home
        </NavbarLink>
      </Navbar>

      <Route path="/Recipe/:id" component={Recipe} />
      <Route exact path="/" component={Home} />
      <Route path="/Browse" component={Browse} />
    </Router>
  );
}
