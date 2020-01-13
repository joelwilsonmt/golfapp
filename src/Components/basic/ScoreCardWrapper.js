import React,  { useState } from 'react';
import {Link} from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GolfCourse from '@material-ui/icons/GolfCourse';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import RestoreIcon from '@material-ui/icons/Restore';
import MapIcon from '@material-ui/icons/Map';
import ViewList from '@material-ui/icons/ViewList';

import ScoreCard from '../screens/ScoreCard';
import Map from '../screens/Map';
import RoundTable from '../screens/RoundTable';
import RecoverGame from '../screens/RecoverGame';
import {ProviderContext} from '../../ContextProviders/Provider';
import BottomNavBar from './BottomNavBar';
require('dotenv').config();


function ScoreCardWrapper(props) {
  const [tab, switchTab] = useState("Score Card");
  const tabs = [{
    name: "Score Card",
    icon: <RestoreIcon />,
    component: <ProviderContext.Consumer>
                {game => <ScoreCard game={game} />}
                </ProviderContext.Consumer>
  },
  {
    name: "Map",
    icon: <MapIcon />,
    component: <Map/>
  },
  {
    name: "Overview",
    icon: <ViewList />,
    component: <ProviderContext.Consumer>
                {game => <RoundTable game={game} />}
                </ProviderContext.Consumer>
  }];
  const bottom = {paddingBottom: '56px'}
  return (
    <div>
      <div style={bottom}>
        {tabs.map(screen => screen.name === tab ? screen.component : null)}
      </div>
      <BottomNavBar currentTab={tab} tabs={tabs} onChange={switchTab}/>
    </div>
  );
}

export default ScoreCardWrapper;
