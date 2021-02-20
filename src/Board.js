import { Component } from "react";
import Box from "./Box";

class Board extends Component {
  renderBox = (i, j) => {
    var color;
    switch(this.props.board[i][j]) {
      case 0: {
        color = "#000000";
        break;
      }
      case 1: {
        color = "#ffffff";
        break;
      }
      case 2: {
        color = "#ff0000";
        break;
      }
      default: { }
    }
    return <Box color={color} key={`${i} ${j}`}/>
  }

  renderRow = (i) => {
    var items = [];
    for(var j=0; j<this.props.N; ++j) {
      items.push(this.renderBox(i, j));
    }
    return (
      <div className="board-row" key={i}>
        {items}
      </div>
    );
  }

  render() {
    var rows = [];
    for(var i=0; i<this.props.N; ++i) {
      rows.push(this.renderRow(i));
    }
    return (
      <div className="board">
        {rows}
      </div>
    );
  }
}

export default Board;