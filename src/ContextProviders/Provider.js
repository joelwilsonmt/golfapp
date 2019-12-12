
import React from 'react';
import axios from 'axios';
import getAllData from './functions/getAllData'
import getPlayerData from './functions/getPlayerData'
import getCurrentGameForUser from './functions/getCurrentGameForUser'
import getGameById from './functions/getGameById'
import getAllPlayerNamesInDB from './functions/getAllPlayerNamesInDB'
import finishRound from './functions/finishRound'


export var ProviderContext = React.createContext();

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.getAllPlayerNamesInDB = getAllPlayerNamesInDB
    this.getAllData = getAllData
    this.getPlayerData = getPlayerData
    this.getCurrentGameForUser = getCurrentGameForUser
    this.getGameById = getGameById
    this.authorize = () => {
      this.setState({
          authorized: true
      });
    }

    this.addUsers = (obj) => {
      let players = this.state.players ? this.state.players : [];
      players.push({
        name: obj.name,
        holes: Array(obj.holes).fill({}),
        courseName: this.state.courseName,
        gameId: this.state.gameId
      })
      this.setState({
        players: players
      });
      localStorage.setItem('game', JSON.stringify(this.state.players));
    }

    this.setCourse = (courseName) => {
      this.setState({
        courseName: courseName
      });
      localStorage.setItem('courseName', this.state.courseName);
    }

    this.setGameId = (gameId) => {
      this.setState({
        gameId: gameId
      });
      localStorage.setItem('gameId', this.state.gameId);
    }

    this.addHole = async (holeObj) => {
      let players = this.state.players;
      for(var i = 0; i < players.length; i++){
        if(players[i].name === holeObj.name){
          let hole = {
            gameId: holeObj.gameId,
            modified: holeObj.modified,
            par: holeObj.par,
            strokes: holeObj.strokes,
            putts: holeObj.putts,
            fairwayHit: holeObj.fairwayHit,
            greensInRegulation: holeObj.greensInRegulation,
            picture: holeObj.picture
          }
          players[i].holes[holeObj.holeNumber-1] = hole;
          this.setState({
            players: players
          })
        }
      }
      const holeRoute = process.env.REACT_APP_BACK_END_SERVER + 'hole';
      holeObj.courseName = this.state.courseName;

      await axios.put(holeRoute, holeObj).then(
        (res) => {
         console.log("hole write to DB complete, writing players object to local storage");
         //let storage = this.state.players;
         localStorage.setItem('game', JSON.stringify(this.state.players));
         localStorage.setItem('courseName', this.state.courseName);
      });//closes axios put
    }

    this.recoverGame = (game) => {
      this.setState({
        gameId: game[0].gameId,
        courseName: game[0].courseName,
        players: game
      });
      localStorage.setItem('game', JSON.stringify(game));
      localStorage.setItem('courseName', JSON.stringify(game[0].courseName));
      localStorage.setItem('gameId', JSON.stringify(game[0].gameId));
    }

    this.getGameFromLocalStorage = () => {

      let game = JSON.parse(localStorage.getItem('game'));
      console.log("getting from local storage in provider...", game)
      // let id = JSON.parse(localStorage.getItem('gameId'));
      //
      // let courseName = JSON.parse(localStorage.getItem('courseName'));

      console.log("game in provider after local storage get: ", game)
      return game
    }

    this.clearLocalStorage = () => {
      localStorage.clear();
      this.setState({
        courseName: '',
        gameId: '',
        players: []
      });
      console.log("local storage and provider data cleared");
    }

    this.state = {
        addUsers : this.addUsers,
        authorize: this.authorize,
        setCourse: this.setCourse,
        addHole: this.addHole,
        recoverGame: this.recoverGame,
        clearLocalStorage: this.clearLocalStorage,
        getAllData: this.getAllData,
        getPlayerData: this.getPlayerData,
        getCurrentGameForUser: this.getCurrentGameForUser,
        getGameById: this.getGameById,
        setGameId: this.setGameId,
        getAllPlayerNamesInDB: this.getAllPlayerNamesInDB,
        getGameFromLocalStorage: this.getGameFromLocalStorage,
        finishRound: finishRound
    }
  }

  render() {
    return (
      <ProviderContext.Provider value={this.state}>
        {this.props.children}
      </ProviderContext.Provider>
    );
  }
}

export default Provider;
