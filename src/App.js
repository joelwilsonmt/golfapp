
import React from 'react';
import './App.css';
import Hole from './Components/Hole';
import Home from './Components/Home';
import NavBar from './Components/NavBar';
import ScoreCard from './Components/ScoreCard';
import Start from './Components/Start';
import Welcome from './Components/Welcome';
import NewGame from './Components/NewGame';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
require('dotenv').config();

function App() {

  return (
    <Router>
      <NavBar/>
      <Route path="/" exact component={Home} />
      <Route path="/hole/:holeNumber" component={Hole} />
      <Route path="/scorecard/:courseName" component={ScoreCard}/>
      <Route path="/start/" component={Start} />
      <Route path="/welcome/" component={Welcome} />
      <Route path="/newgame/" component={NewGame} />
  </Router>
  );
}

export default App;
