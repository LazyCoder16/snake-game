import { Component } from "react";
import Board from "./Board";

class Game extends Component {
  N = 13;
  state = {
    board: this.makeBoard(),
    done: false,
    snake: [[8, 3], [9, 3], [10, 3]],
    dx: -1,
    dy: 0,
    apple: this.spawnApple(this.makeBoard()),
    changingDir: false
  };

  handleKeyPress = (e) => {
    var {dx, dy, changingDir} = this.state;
    if(changingDir) return;

    switch(e.keyCode) {
      case 38: {
        if(dx !== 0) break;
        dx = -1;
        dy = 0;
        this.setState({dx, dy, changingDir: true});
        break;
      }
      case 40: {
        if(dx !== 0) break;
        dx = 1;
        dy = 0;
        this.setState({dx, dy, changingDir: true});
        break;
      }
      case 37: {
        if(dy !== 0) break;
        dx = 0;
        dy = -1;
        this.setState({dx, dy, changingDir: true});
        break;
      }
      case 39: {
        if(dy !== 0) break;
        dx = 0;
        dy = 1;
        this.setState({dx, dy, changingDir: true});
        break;
      }
      default: { }
    }
  }

  componentDidMount = () => {
    this.interval = setInterval(() => {
      var {snake, board, dx, dy, apple, done} = this.state;
      if(done) return;
      var temp = snake[snake.length-1];
      snake.splice(snake.length-1, 1);
      
      var x = snake[0][0]+dx, y = snake[0][1]+dy;
      if(x<0 || x>=this.N || y<0 || y>=this.N) {
        this.setState({done: true});
        return;
      }
      for(var i=0; i<snake.length; ++i) {
        if(snake[i][0]===x && snake[i][1]===y) {
          this.setState({done: true});
          return;
        }
      }
      if(x===apple[0] && y===apple[1]) {
        apple = this.spawnApple(board);
        snake.push(temp);
      }
      snake.splice(0, 0, [x, y]);

      board = this.makeBoard();
      for(i=0; i<snake.length; ++i) {
        board[snake[i][0]][snake[i][1]] = 1;
      }
      board[apple[0]][apple[1]] = 2;
      this.setState({board, snake, apple, changingDir: false});
    }, 150);
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  makeBoard() {
    var board = Array(this.N);
    for(var i=0; i<this.N; ++i) {
      board[i] = Array(this.N).fill(0);
    }
    return board;
  }

  spawnApple(board) {
    while(1) {
      var ax = Math.floor(Math.random() * this.N);
      var ay = Math.floor(Math.random() * this.N);
      if(board[ax][ay] === 0) {
        return [ax, ay];
      }
    }
  }

  handleRetry = () => {
    var state = {
      board: this.makeBoard(),
      done: false,
      snake: [[8, 3], [9, 3], [10, 3]],
      dx: -1,
      dy: 0,
      apple: this.spawnApple(this.makeBoard())
    }
    this.setState(state);
  }

  render() {
    let {board, snake, done} = this.state;
    return (
      <div className="game" onKeyDown={this.handleKeyPress}>
        <Board N={this.N} board={board}/>
        <div className="bottom-bar">
          <p id="score">Score: {snake.length - 3 + done}</p>
          <button id="retry-button" onClick={this.handleRetry}>Retry</button>
        </div>
      </div>
    );
  }
}

export default Game;