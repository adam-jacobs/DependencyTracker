import { React } from 'react';
import './XButton.css';

const XButton = ({size, rotation = 0, tooltip = "", onClick}) => {

  const buttonStyle = {
    "--Xbutton-size": `${size}px`,
    "--Xbutton-horizontal-rotation": `${rotation}deg`,
    "--Xbutton-vertical-rotation": `${rotation + 180}deg`,
  };

    return (
      <button className="Xbutton" title={tooltip} style={buttonStyle} onClick={onClick}>
        <span className="Xbutton-horizontal" />
        <span className="Xbutton-vertical" />
      </button>
    );
}

export default XButton;