import React, { useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import Typography from '@material-ui/core/Typography';
import Loading from './Loading';
import usePosition from './hooks/usePosition';

const offset = {
  position: "relative",
  top: "-40px",
  left: "-25px"
}
function Map(props) {
  const [position, error] = usePosition();

  console.log("position in map: ", position);
  return (
    <div style={{ height: '85vh', width: '100%' }}>
    {position ?
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
      defaultCenter={{lat: position.coords.latitude, lng: position.coords.longitude}}
      defaultZoom={16}
    >
      <Typography
        lat={position.coords.latitude}
        lng={position.coords.longitude}
        text="My Marker">
        <img alt="tee" width="60" style={offset} src="https://unixtitan.net/images/golf-clipart-golf-ball-1.png"/>
      </Typography>
    </GoogleMapReact>
    : <Loading />}
  </div>
  );
}

  export default Map;
