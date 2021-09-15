import React from "react";
import Tilty from "react-tilty";
import "./Logo.css";
import brain from "./brain.png";

const Logo = () => {
	return (
		<div className="ma4 mt0">
			<Tilty
				className="Tilt br2 shadow-2"
				options={{ max: 80 }}
				style={{ height: 150, width: 150 }}
			>
				<div className="Tilt-inner pa3">
					<img
						style={{ paddingTop: "5px", paddingLeft: "8px" }}
						alt="logo"
						src={brain}
					></img>
				</div>
			</Tilty>
		</div>
	);
};

export default Logo;
