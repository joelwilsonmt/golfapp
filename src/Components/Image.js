import React from "react";


function Image(props) {
  return (
    <div style={{width: props.width, margin: 'auto', justifyContent: 'center'}}>
      <img style={{width: "100%"}} src={props.src}/>
    </div>
  );
}

  export default Image;
