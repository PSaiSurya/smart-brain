import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3" style={{ textAlign: "center" }}>
        {"This Magic will detect faces in your picture. Give it a try!"}
      </p>
      <div className="center">
        <div className="form pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70"
            type="text"
            style={{ height: "50px" }}
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            style={{ height: "50px", fontSize: "1em" }}
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
