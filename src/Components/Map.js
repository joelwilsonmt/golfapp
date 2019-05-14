import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import Typography from '@material-ui/core/Typography';
let globalPosition = {};
const getPosition = () => {
  console.log("Getting user location");
  if (navigator.geolocation) {
    console.log("Navigator has geolocation");
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("position and all that: ", position);
      globalPosition = position.coords;
    },
  (err) => {
    console.log("error", err);
  }, {enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0});
  } else {
    console.error("Browser does not support Geolocation");
  }
}
const offset = {
  position: "relative",
  top: "-40px",
  left: "-25px"
}
getPosition();
function Map(props) {
  // const [position, setPosition] = useState([]);
  // setPosition(globalPosition);
  console.log("position in map: ", globalPosition);
  return (
    <div style={{ height: '85vh', width: '100%' }}>
    {globalPosition ?
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
      defaultCenter={{lat: globalPosition.latitude, lng: globalPosition.longitude}}
      defaultZoom={16}
    >
      <Typography
        lat={globalPosition.latitude}
        lng={globalPosition.longitude}
        text="My Marker">
        <img alt="tee" width="60" style={offset} src="https://unixtitan.net/images/golf-clipart-golf-ball-1.png"/>
      </Typography>
    </GoogleMapReact>
    : null}
  </div>
  );
}

  export default Map;