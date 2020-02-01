import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
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
  const [names, setNames] = useState(null)
  const [allData, setAllData] = useState(null)
  const [gameIndexToLoad, setGameIndexToLoad] = useState(null)
  const getData = async () => {
    toggleLoading(true)
    const data = await props.game.getAllData()
    toggleLoading(false)
    setAllData(data)
  }
  const getPlayerNames = async () => {
    toggleLoading(true)
    const data = await props.game.getAllPlayerNamesInDB()
    toggleLoading(false)
    setNames(data)
  }
  useEffect(() => {
    getPlayerNames()
  }, [])
  return (
    <Frame game={props.game}>
      <p>Getting all user names:</p>
      <Fab onClick={() => getData()}>DATA</Fab>
      <Fab onClick={() => getPlayerNames()}>NAMES</Fab>
      {names ? names.map((name, index) => {
        return (
          <div>
            <p>{index + 1}) <Link to={`/listrounds/${name}`}>{name}</Link></p>
          </div>
        )
      }) : null}
      <Loading open={loading} />

    </Frame>
  );
}
