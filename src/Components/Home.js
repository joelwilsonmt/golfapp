import React from 'react';
import {Link} from "react-router-dom";

function Home() {

  return (
    <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/hole/">Hole</Link>
    </li>
    <li>
      <Link to="/scorecard/">Score Card</Link>
    </li>
    <li>
      <Link to="/start/">Start Screen</Link>
    </li>
    <li>
      <Link to="/welcome/">Welcome</Link>
    </li>
    <li>
      <Link to="/newgame/">New Game Screen</Link>
    </li>
  </ul>
  );
}

export default Home;
