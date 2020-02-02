import React, {useState, useEffect} from 'react';
import {Link, Redirect} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import RestoreIcon from '@material-ui/icons/Restore';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import Loading from '../basic/Loading'
import BottomNavBar from '../basic/BottomNavBar';
import BlockButton from '../basic/BlockButton';
import RoundTable from './RoundTable';
import {ProviderContext} from '../../ContextProviders/Provider';
import Frame from '../templates/Frame'


export default (props) => {
  const [loading, toggleLoading] = useState(true)
  const [redirect, toggleRedirect] = useState(false)
  const [activeGameChoice, toggleActiveGameChoice] = useState(false)
  const name = props.match.params.name
  const [playerData, setPlayerData] = useState(null)
  const [playerDataIndex, setPlayerDataIndex] = useState(0)
  const [gameIndexToLoad, setGameIndexToLoad] = useState(null)
  const getPlayerData = async () => {
    toggleLoading(true)
    const data = await props.game.getPlayerData(name)
    toggleLoading(false)
    setPlayerData(data)
  }
  useEffect(() => {
    getPlayerData()
  }, [])
  const getGameById = async (index, active) => {
    setPlayerDataIndex(index)
    toggleLoading(true)
    toggleActiveGameChoice(active)
    const game = await props.game.getGameById(playerData[index].gameId)
    props.game.recoverGame(game)
    toggleRedirect(true)
  }
  return (
    <Frame game={props.game}>
      <p>Getting rounds by username {name}</p>
      <Fab onClick={() => getPlayerData()}>GPD</Fab>
      {playerData ? playerData.map((round, index) => {
        return (
          <div>
            <p>{index + 1}) {round.courseName}</p>
            <p>ID) {round.gameId}</p>
            <p>{round.active ? 'Active!' : 'Not Active.'}</p>
            <Button
              onClick={() => {
                  getGameById(index, round.active)
                }
              }
              color="primary"
              variant="contained"
            >
              {round.active ? 'Resume this game' : 'Review this game'}
            </Button>
          </div>
        )
      }) : null}
      <Loading open={loading} />
      {redirect ?
        <Redirect
          to={{
            pathname: activeGameChoice ?
            `/scorecard/${playerData[playerDataIndex].courseName}`
            : `/roundreview/`
          }} 
        />
          : null}
    </Frame>
  );
}
