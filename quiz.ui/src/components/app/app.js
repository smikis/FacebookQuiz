import React from 'react';
import './app.css';
import Question from '../question/questions'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/question">Question</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/question">
            <QuestionRoute />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function QuestionRoute() {
  var answers = [
    {
      id: 1,
      text: "Europe"
    },
    {
      id: 2,
      text: "Asia"
    },
    {
      id: 3,
      text: "Africa"
    },
    {
      id: 4,
      text: "Oceania"
    }
  ];
  
  return (
    <div>
      <h1>Quiz</h1>
      <Question question={'In what continent is located Lithuania?'} answers={answers} correctAnswerId={1} />
    </div>
  );
}

export default App;
