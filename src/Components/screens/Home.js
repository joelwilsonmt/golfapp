import React from 'react';
import {Link} from "react-router-dom";
import RecoverGame from './RecoverGame';
import {ProviderContext} from '../../ContextProviders/Provider';

function Home(props) {

  return (
    <div>

      <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/hole/">Hole</Link>
      </li>
      <li>
        <Link to="/scorecard/Testing">Score Card Testing</Link>
      </li>
      <li>
        <Link to="/start/">Start Screen</Link>
      </li>
      <li>
        <Link to="/welcome/">Welcome</Link>
      </li>
      <li>
        <Link to="/newround/">New Round Screen</Link>
      </li>
      <li>
        <Link to="/listusers/">See Users</Link>
      </li>
      <li>
        <Link to={`/listrounds/${"Joel"}`}>See games for player Joel</Link>
      </li>
      <li>
        Name:
      </li>
    </ul>
  </div>
  );
}
// <ProviderContext.Consumer>
//   {game =><RecoverGame game={game}/>}
// </ProviderContext.Consumer>
export default Home;
