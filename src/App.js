
import React from 'react';
import './App.css';
import Hole from './Components/Hole';
import Home from './Components/Home';
import NavBar from './Components/NavBar';
import ScoreCardWrapper from './Components/ScoreCardWrapper';
import Start from './Components/Start';
import Welcome from './Components/Welcome';
import NewRound from './Components/NewRound';
import RoundReview from './Components/RoundReview';
import { BrowserRouter, Route} from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import {ProviderContext} from './ContextProviders/Provider';

require('dotenv').config();

function App(props) {

  return (
    <ProviderContext.Consumer>
      {game =>
        <BrowserRouter>
          <NavBar game={game}/>
          <Route path="/" exact render={(props) => <Home game={game} {...props}/>}/>
          <Route path="/:coursename/hole/:holeNumber" render={(props) => <Hole game={game} {...props}/>} />
          <Route path="/scorecard/:courseName" render={(props) => <ScoreCardWrapper game={game} {...props}/>}/>
          <Route path="/start/" component={Start} />
          <Route path="/roundreview/" render={(props) => <RoundReview game={game} {...props}/>}/>
          <Route path="/welcome/" component={Welcome} />
          <Route path="/newround/" render={(props) => <NewRound game={game} {...props}/>} />
        </BrowserRouter>
      }
    </ProviderContext.Consumer>
  );
}

export default App;
