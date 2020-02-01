
import React, {useState} from 'react';
import './App.css';
import Hole from './Components/screens/Hole';
import Home from './Components/screens/Home';
import NavBar from './Components/basic/NavBar';
import ScoreCardWrapper from './Components/basic/ScoreCardWrapper';
import Start from './Components/screens/Start';
import Welcome from './Components/screens/Welcome';
import NewRound from './Components/screens/NewRound';
import RoundReview from './Components/screens/RoundReview';
import ListRounds from './Components/screens/ListRounds';
import ListUsers from './Components/screens/ListUsers';
import { BrowserRouter, Route} from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import {ProviderContext} from './ContextProviders/Provider';

import Frame from "./Components/templates/Frame"
import defaultScreens from "./Components/templates/defaultScreens"

require('dotenv').config();

function App(props) {
  const [screens, setScreens] = useState(defaultScreens)
  return (
    <ProviderContext.Consumer>
      {game =>
        <BrowserRouter>
            <Route path="/scorecard/:courseName" render={(props) => <ScoreCardWrapper game={game} {...props}/>}/>
            <Route path="/" exact render={(props) => <Home game={game} {...props}/>}/>
            <Route path="/:coursename/hole/:holeNumber" render={(props) => <Hole game={game} {...props}/>} />
            <Route path="/start/" component={Start} />
            <Route path="/roundreview/" render={(props) => <RoundReview game={game} {...props}/>}/>
            <Route path="/listrounds/:name" render={(props) => <ListRounds game={game} {...props}/>}/>
            <Route path="/listusers/" render={(props) => <ListUsers game={game} {...props}/>}/>
            <Route path="/welcome/" component={Welcome} />
            <Route path="/newround/" render={(props) => <NewRound game={game} {...props}/>} />
        </BrowserRouter>
      }
    </ProviderContext.Consumer>
  );
}

export default App;
