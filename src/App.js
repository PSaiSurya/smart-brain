import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-tsparticles";

const particlesOptions = {
  fpsLimit: 30,
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 100,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "square",
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
};

const initialState = {
  input: "",
  imageURL: "",
  boxes: [],
  route: "SignIn",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiArray = data.outputs[0].data.regions.map((region) => {
      return region.region_info.bounding_box;
    });
    const clarifaiFaces = clarifaiArray.map((face) => {
      return {
        leftCol: face.left_col * 100,
        topRow: face.top_row * 100,
        rightCol: 100 - face.right_col * 100,
        bottomRow: 100 - face.bottom_row * 100,
      };
    });
    return clarifaiFaces;
  };

  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes });
  };

  onInputChange = (event) => {
    if (event.target.value === "") {
      this.setState({ boxes: [] });
      this.setState({ imageURL: "" });
    }
    this.setState({ input: event.target.value });
  };

  checkURL(url) {
    return url.match(/\.(jpeg|jpg|gif|png|tiff|webp|bmp)$/) != null;
  }

  updateRank = async () => {
    try {
      const response = await fetch("http://localhost:3000/image", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id: this.state.user.id,
        }),
      });
      const count = await response.json();
      this.setState(Object.assign(this.state.user, { entries: count }));
    } catch (error) {
      console.log(error);
    }
  };

  onButtonSubmit = async () => {
    this.setState({ imageURL: this.state.input });
    this.setState({ boxes: [] });
    try {
      const URL = this.state.input;
      const isImage = this.checkURL(URL);
      if (isImage) {
        const apiResponse = await fetch("http://localhost:3000/imageurl", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            input: URL,
          }),
        });
        const response = await apiResponse.json();
        if (
          !(
            response === "Invalid link. Please try again" ||
            response === "Unable to work with API"
          )
        ) {
          await this.updateRank();
          this.displayFaceBox(this.calculateFaceLocation(response));
        } else {
          alert(response);
        }
      } else {
        alert("Invalid link. Please try again");
      }
    } catch (error) {
      console.log(error);
    }
  };

  onRouteChange = (route) => {
    if (route === "SignOut") {
      this.setState(initialState);
    } else if (route === "Home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageURL, route, boxes } = this.state;
    return (
      <div className="App">
        <Particles
          className="particles"
          id="tsparticles"
          options={particlesOptions}
        />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "Home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition boxes={boxes} imageURL={imageURL} />
          </div>
        ) : route === "SignIn" || route === "SignOut" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
