import React from 'react';
import './app.css';
import Game from '../game/game';
import Home from '../home/home';
import End from '../end/end';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { LocalizeProvider } from "react-localize-redux";

function App() {
  return (
    <LocalizeProvider>
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/question">
              <Game />
            </Route>
            <Route path="/home">
              <HomeRoute />
            </Route>
            <Route path="/end">
              <End />
            </Route>
          </Switch>
        </div>
      </Router>
    </LocalizeProvider>
  );
}

function HomeRoute() {
  return <Home />
}

export default App;
