import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Views/Home';
import Browse from './Views/Browse';
import Recipe from './Views/Recipe';
import useSiteData from './Hooks/useSiteData';
import GlobalContext from './Context/GlobalContext';
import AppBar from './Components/AppBar';

export default function App() {
  const context = useSiteData();

  return (
    <Router>
      <GlobalContext.Provider value={context}>
        <AppBar />

        <Route path="/Recipe/:id" component={Recipe} />
        <Route exact path="/" component={Home} />
        <Route path="/Browse" component={Browse} />
      </GlobalContext.Provider>
    </Router>
  );
}
