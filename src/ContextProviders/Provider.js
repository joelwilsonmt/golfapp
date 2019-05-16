    
import React from 'react';
import axios from 'axios';


export var ProviderContext = React.createContext();

class Provider extends React.Component {
  constructor(props) {
    super(props);
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
        courseName: this.state.courseName
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
    this.addHole = async (holeObj) => {
      let players = this.state.players;
      for(var i = 0; i < players.length; i++){
        if(players[i].name === holeObj.name){
          let hole = {
            par: holeObj.par,
            strokes: holeObj.strokes,
            putts: holeObj.putts,
            fairwayHit: holeObj.fairwayHit,
            greensInRegulation: holeObj.greensInRegulation//,
            //picture: { data: Buffer, contentType: String }
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
      console.log("game object to recover: ", game);
      this.setState({
        courseName: game[0].courseName,
        players: game
      });
    }
    this.clearLocalStorage = () => {
      localStorage.clear();
      console.log("local storage cleared");
    }
    this.state = {
        addUsers : this.addUsers,
        authorize: this.authorize,
        setCourse: this.setCourse,
        addHole: this.addHole,
        recoverGame: this.recoverGame,
        clearLocalStorage: this.clearLocalStorage
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