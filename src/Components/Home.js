import React from 'react';
import {Link} from "react-router-dom";

function Home() {
  // const allStorage = () => {

  //   var values = [],
  //       keys = Object.keys(localStorage),
  //       i = keys.length;

  //   while ( i-- ) {
  //       values.push( localStorage.getItem(keys[i]) );
  //   }

  //   return values;
  // }
  // let name = allStorage();
  // console.log(name);
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
      <Link to="/newgame/">New Game Screen</Link>
    </li>
    <li>
      Name: 
    </li>
  </ul>
  </div>
  );
}

export default Home;
