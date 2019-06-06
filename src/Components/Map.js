import React, { useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import Typography from '@material-ui/core/Typography';
import Loading from './Loading';

const getPosition = () => {
  console.log("Getting user location");
  if (navigator.geolocation) {
    console.log("Navigator has geolocation");
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("position and all that: ", position);
      return position.coords;
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
function Map(props) {
  const [position, setPosition] = useState(getPosition());
  // setPosition(globalPosition);


  console.log("position in map: ", position);
  return (
    <div style={{ height: '85vh', width: '100%' }}>
    {position ?
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
      defaultCenter={{lat: position.latitude, lng: position.longitude}}
      defaultZoom={16}
    >
      <Typography
        lat={position.latitude}
        lng={position.longitude}
        text="My Marker">
        <img alt="tee" width="60" style={offset} src="https://unixtitan.net/images/golf-clipart-golf-ball-1.png"/>
      </Typography>
    </GoogleMapReact>
    : <Loading />}
  </div>
  );
}

  export default Map;
