import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import RestoreIcon from '@material-ui/icons/Restore';
import Paper from '@material-ui/core/Paper';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';




import BottomNavBar from './BottomNavBar';
import BlockButton from './BlockButton';
import RoundTable from './RoundTable';
import {ProviderContext} from '../ContextProviders/Provider';


function RoundReview(props) {
  const [tab, switchTab] = useState("FINISH");
  const tabs = [{
    name: "FINISH",
    icon: <RestoreIcon />
  }]
  const bottom = {paddingBottom: '36px'}
  const handleClick = () => {
    console.log("clearing local storage...");
    console.log("also, props: ", props);
    props.game.clearLocalStorage();
  }
  const appBar = {
    top: 'auto',
    bottom: 0,
  };
  return (
    <div>
      <div style={bottom}>
        <ProviderContext.Consumer>
        {game => <RoundTable game={game} />}
        </ProviderContext.Consumer>
        </div>
        <AppBar position="fixed" color="primary" style={appBar}>
          <BlockButton
          title="FINISH"
          link={`/`}
          onClick={() => handleClick()}
          />
      </AppBar>
    </div>
  );
}

export default RoundReview;
