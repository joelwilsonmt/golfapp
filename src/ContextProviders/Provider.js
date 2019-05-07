    
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
      let game = this.state.game ? this.state.game : [];
      game.push({name: obj.name})
      this.setState({
        game: game
      });
      console.log("game state after user push: ", this.state.game);
    }
    this.setCourse = (courseName) => {
      this.setState({
        courseName: courseName
      });
      console.log("course name set in provider: ", this.state.courseName);
    }
    this.state = {
        addUsers : this.addUsers,
        authorize: this.authorize,
        setCourse: this.setCourse
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