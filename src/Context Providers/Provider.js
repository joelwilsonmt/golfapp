    
import React from 'react';


export var UserContext = React.createContext();

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.authorize = () => {
        this.setState({
            authorized: true
        });
    }
    this.setPlayers = (numberPlayers) => {
      this.setState({
        numberPlayers: numberPlayers
      });
    }
    this.setPlayerNames = (index, name) => {
        let playerNames = this.state.playerNames;
        playerNames[index] = name;
        console.log("player names set in provider state: ", playerNames);
        this.setState({
          playerNames: playerNames
        });
      }
    this.setCourseName = (course) => {
        this.setState({
          course: course
        });
      }
    this.state = {
        setPlayers : this.setPlayers,
        setPlayerNames : this.setPlayerNames,
        setCourseName : this.setCourseName,
        authorize: this.authorize,
    }
  }

  render() {
    //<StateProvider> component returns the <StateContext.Provider> object
    //with the value passing to anything inside of it the state contained
    //in the initial and subsequent setting of this Component's state
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default Provider;