    
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
      })
      this.setState({
        players: players
      });
      console.log("provider state after adding players: ", this.state.players);
    }
    this.setCourse = (courseName) => {
      this.setState({
        courseName: courseName
      });
    }
    this.addHole = async (holeObj) => {
      console.log("adding hole in provider: ", holeObj);
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
      console.log("players state after holes set in provider: ", this.state.players);
      return true;
      const holeRoute = process.env.REACT_APP_BACK_END_SERVER + 'hole';
      await axios.put(holeRoute, holeObj).then(
        (res) => {
         //save to local storage?
      });//closes axios put
    }
    this.state = {
        addUsers : this.addUsers,
        authorize: this.authorize,
        setCourse: this.setCourse,
        addHole: this.addHole,
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