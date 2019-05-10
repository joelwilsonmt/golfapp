
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
import {ProviderContext} from './ContextProviders/Provider';
require('dotenv').config();

function App() {

  return (
    <ProviderContext.Consumer>
      {game =>
        <Router>
          <NavBar/>
          <Route path="/" exact component={Home} />
          <Route path="/hole/:holeNumber" render={(props) => <Hole game={game} {...props}/>} />
          <Route path="/scorecard/:courseName" render={(props) => <ScoreCard game={game} {...props}/>}/>
          <Route path="/start/" component={Start} />
          <Route path="/welcome/" component={Welcome} />
          <Route path="/newgame/" render={(props) => <NewGame game={game} {...props}/>} />
        </Router>
      }
    </ProviderContext.Consumer>
  );
}

export default App;
