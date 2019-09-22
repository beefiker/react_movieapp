import React from "react";
import PropTypes from "prop-types";

class App extends React.Component {
  state = {
    count: 0
  };
  add = () => {
    this.setState({ count: this.state.count + 1 }); // state에 직접적으로 기대는 효율이 나쁜 방법
  };
  minus = () => {
    this.setState(current => ({ count: current.count - 1 })); // 효율이 좋은 방법
  };
  render() {
    return (
      <div>
        <h1> The number is {this.state.count}</h1>
        <button onClick={this.add}>Add</button>
        <button onClick={this.minus}>Minus</button>
      </div>
    );
  }
}

export default App;
