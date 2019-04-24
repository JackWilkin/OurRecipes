import React from 'react';
// import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Views/Home';
import Browse from './Views/Browse';
import Recipe from './Views/Recipe';

export default function App() {
  return (
    <Router>
      <Route path="/Recipe/:id" component={Recipe} />
      <Route path="/" component={Home} />
      <Route path="/Browse" component={() => <Browse />} />
    </Router>
  );
}
