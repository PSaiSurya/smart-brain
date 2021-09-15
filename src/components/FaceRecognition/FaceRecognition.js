import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, boxes }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2" id="faceRecognize">
        <img
          id="inputimage"
          alt="preview"
          src={imageURL}
          width="500px"
          height="auto"
        />
        {boxes.map((box) => (
          <div
            key={box.topRow}
            className="bounding-box br0"
            style={{
              inset: `${box.topRow}% ${box.rightCol}% ${box.bottomRow}% ${box.leftCol}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default FaceRecognition;
