import React, { Component } from "react";
import Data from "../data.json";


// By importing the Section.css file, it is added to the DOM whenever this component loads

// We can also style a component inside of its JavaScript file by adding style properties to its rendered elements
// Unlike regular HTML, a JSX style property must be an object instead of a string
// On a style object, we camelCase all property names, and put all of the values in quotes
// Non quoted values default to "pixels", e.g. height, margin, padding

const styles = {
 disney: {
   background: "white",
   border:"10px solid blue",
   height:"150px",
   weight:"150px"
 }
};

// We use JSX curly braces to evaluate the style object on the JSX tag
// console.log(this.state.Data)
class Section extends Component {

  state = {
    data: Data,
  }
  componentDidMount() {
    this.setState({ data: Data });
  }

  handleClick(key) {
    let clickData = this.state.data;

    console.log("key", key, "clicked", clickData[key].clicked);
    let gameOver=false

    if (clickData[key].clicked) {
      gameOver = true;
      console.log("game over");
      for (var i = 0; i < clickData.length; i++) {
        clickData[i].clicked = false;
      }
    }
    else {
      clickData[key].clicked = true;
    }
    this.setState({ data: clickData.sort(() => 0.5 - Math.random()) });
    this.props.updateScore(gameOver)
  }

  handleIncrement = (key) => {
    if (!this.state.data[key].clicked) {
      this.props.updateScore(false);
    }
  };

  click = (key) => {
    this.handleIncrement(key)
    this.handleClick(key)

  }

  render(props) {
    return (
      // <div>section</div>
      <div>
        <div>
          {
            this.state.data.map((item, index) =>
              <img src={item.image} style = {styles.disney} key={index}
                className="disney" alt="disney" height="120" width="120" onClick={() => this.click(index)} />
            )
          }
        </div>
        {/* <span onClick={() => props.updateScore(props.score)} className="updateScore"> */}
        {/* </span> */}
      </div>
    )
  }
}

export default Section;