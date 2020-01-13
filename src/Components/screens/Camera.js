import React, { useState } from "react";
import CameraIcon from '@material-ui/icons/Camera';
import HTMLCamera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Fab from '@material-ui/core/Fab';
import Redo from '@material-ui/icons/Replay';


import Image from '../basic/Image';
import BlockButton from '../basic/BlockButton';


function Camera(props) {
  const [pictureTaken, setPictureTaken] = useState(props.picture ? true : false)
  const onTakePhoto = (data) => {
    //setPicture(data);
    props.onTakePhoto(data);
  }
  const styles = {
    container: {
      position: "relative",
      textAlign: "center",
      justifyContent: "center"
    },
    fab: {
      position:"absolute",
      top:"90%",
      left:"50%",
      margin: "-15px 0px 0px -50px"
    },
    extendedIcon: {
    marginRight: 10,
  }};
  return (
    <div>
    {props.picture && pictureTaken ?
      <div style={styles.container}>
        <Image width="100%" src={props.picture}/>
        <Fab
          variant="extended"
          color="secondary"
          aria-label="Retake"
          style={styles.fab}
          onClick={() => {
            setPictureTaken(false)
            props.switchToCamera()
          }}>
          <Redo style={styles.extendedIcon} />
          Retake
        </Fab>
      </div>
      :
      <HTMLCamera
        onTakePhoto = {photo => onTakePhoto(photo)}
        idealFacingMode = {FACING_MODES.USER}
        imageType = {IMAGE_TYPES.JPG}
        idealResolution = {{width: 200, height: 300}}

        />}
  </div>
  );
}

  export default Camera;
