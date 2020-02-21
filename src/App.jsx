import "./App.css";

// imports the React node modules
import React, { Component } from "react";

import Card from "./components/Card";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import tiles from "./tiles.json";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isGuessCorrect: true,
      tiles: tiles,
      score: 0,
      maxScore: 12,
      topScore: 0,
      message: "Click to Image to Start!"
    };
  }

  // REMOVES animation CSS class
  removeAnimation = () => {
    let element = document.getElementById("animate-this");
    if (this.state.isGuessCorrect) {
      element.classList.remove("jello-vertical");
    }
    if (!this.state.isGuessCorrect) {
      element.classList.remove("shake-horizontal");
    }
  };

  // ADDS animation CSS class
  addAnimation = isCorrect => {
    let element = document.getElementById("animate-this");
    if (isCorrect) {
      element.classList.add("jello-vertical");
    }
    if (!isCorrect) {
      element.classList.add("shake-horizontal");
    }
  };

  // TOGGLES the CSS class for animation
  toggleAnimation = isCorrect => {
    if (isCorrect) {
      this.addAnimation(true);
      setTimeout(this.removeAnimation, 500);
    }
    if (!isCorrect) {
      this.addAnimation(false);
      setTimeout(this.removeAnimation, 500);
    }
  };


  // Main click handler function
  handleSaveClick = id => {
    // Variable to hold the tiles state.
    const tilez = this.state.tiles;
    // Search through character tiles to find the one that matches the clicked id.
    const tileClicked = tilez.filter(tile => tile.id === id);

    // If the tile isn't clicked...
    if (!tileClicked[0].clicked) {
      // ...set it to now be clicked
      tileClicked[0].clicked = true;
      // ...call this function to register the correct guess
      this.handleCorrectClick();
      // ...add the bouncy animation for correct guess
      this.toggleAnimation(true);

      // ... randomize character tiles
      this.randomizeCharacters(tilez);

      this.setState({ tilez });
    } else {
      this.handleIncorrectClick();
      this.toggleAnimation(false);
    }
  };

  // Function to randomize the characters
  randomizeCharacters = characters => {
    characters.sort((a, b) => {
      return 0.5 - Math.random();
    });
  };

  // Handler for correct guesses/clicks
  handleCorrectClick = () => {
    this.setState({ isGuessCorrect: true });
    if (this.state.score + 1 > this.state.topScore) {
      this.setState({ topScore: this.state.topScore + 1 });
    }
    if (this.state.score + 1 >= this.state.maxScore) {
      this.setState({
        score: this.state.score + 1,
        message: "CONGRATS! YOU WIN!",
        messageClass: "correct"
      });
    } else {
      this.setState({
        score: this.state.score + 1,
        message: "GUESSED CORRECTLY!",
        messageClass: "correct"
      });
    }
  };

  // Handler for incorrect guesses/clicks
  handleIncorrectClick = () => {
    this.setState({
      message: "GUESSED INCORRECT. PLAY AGAIN?",
      isGuessCorrect: false
    });
    // this.toggleIncorrectAnimation();
    this.resetGame();
  };

  // Resets the game
  resetGame = id => {
    const tilez = this.state.tiles;
    for (let i = 0; i < tilez.length; i++) {
      tilez[i].clicked = false;
    }
    this.setState({ score: 0 });
  };

  // Render the App component on the page
  render() {
    const { message, score, tiles, topScore } = this.state;
    return (
      <div className="fluid-container lodge h-100vh">
        <Navbar
          className="row"
          score={score}
          topScore={topScore}
          message={message}
        />
        <Header className="bg-header row" />

        <div className="d-flex flex-row justify-content-center mx-auto padding-main flex-wrap">
          {tiles.map(({ id, name, image, clicked }) => (
            <Card
              key={id}
              id={id}
              name={name}
              image={image}
              clicked={clicked}
              clickHandler={this.handleSaveClick}
            />
          ))}
        </div>

        <Footer className="footer-mgn row" />
      </div>
    );
  }
}

export default App;
