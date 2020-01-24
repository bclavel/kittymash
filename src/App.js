import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from './components/Landing/Landing';
import Results from './components/Results/Results';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/results">
            <Results />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
