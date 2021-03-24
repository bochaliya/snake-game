import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Snake from './Snake';
import Food from './Food';
import ScoreBoard from './ScoreBoard';
import UserDetails from './UserDetails';
import Board from './Board';

import utils from '../utils/utils';

const initialState = {
  food: utils.getRandomPoints(40),
  direction: 'RIGHT',
  isGameOver: false,
  isGameStarted: false,
  arenaWidth: 100,
  arenaHeight: 100,
  boardSize: 99,
  userBoardSize: 99,
  difficulty: 2,
  speed: 200,
  snakeParts: [
    [2, 2],
    [2, 3]
  ],
  areaStyle: {
    position: 'relative',
    margin: '50px auto',
    width: '700px',
    height: '700px',
    //border: '2px solid #000000',
    //backgroundColor: 'thistle',
  },
  foodStyle: {
    position: 'absolute',
    width: '1%',
    height: '1%',
    backgroundColor: 'red',
    border: '1px solid #ffffff',
    zIndex: '1',
  },
  snakeStyle: {
    position: 'absolute',
    width: '1%',
    height: '1%',
    backgroundColor: '#000000',
    border: '1px solid #ffffff',
    zIndex: '2',
  }
}

class App extends Component {
  state = initialState;

  componentDidMount() {
    if (this.state.isGameOver == false) {
      setInterval(this.moveSnake, this.state.speed);
      document.onkeydown = this.onKeyDown;
    }
  }

  componentDidUpdate() {
    this.isOutOfArea();
    this.isCollapsed();
    this.willEatFood();
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        if (!['LEFT', 'RIGHT'].includes(this.state.direction)) {
          this.setState({ direction: 'LEFT' });
        }
        break;
      case 38:
        if (!['UP', 'DOWN'].includes(this.state.direction)) {
          this.setState({ direction: 'UP' });
        }
        break;
      case 39:
        if (!['LEFT', 'RIGHT'].includes(this.state.direction)) {
          this.setState({ direction: 'RIGHT' });
        }
        break;
      case 40:
        if (!['UP', 'DOWN'].includes(this.state.direction)) {
          this.setState({ direction: 'DOWN' });
        }
        break;
    }
  }

  moveSnake = () => {
    let parts = [...this.state.snakeParts];
    let head = parts[parts.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 1, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 1, head[1]];
        break;
      case 'UP':
        head = [head[0], head[1] - 1];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 1];
        break;
    }
    parts.push(head);
    parts.shift();
    this.setState({
      snakeParts: parts
    })
  }

  isOutOfArea = () => {
    let head = this.state.snakeParts[this.state.snakeParts.length - 1];
    if (head[0] >= this.state.boardSize-1 || head[1] >= this.state.boardSize-1 || head[0] <= 0 || head[1] <= 0) {
      this.gameOver();
    }
  }

  isCollapsed = () => {
    let parts = [...this.state.snakeParts];
    let head = parts[parts.length - 1];
    parts.pop();
    parts.forEach(part => {
      if (head[0] == part[0] && head[1] == part[1]) {
        this.gameOver();
      }
    })
  }

  willEatFood = () => {
    let head = this.state.snakeParts[this.state.snakeParts.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: utils.getRandomPoints(this.state.boardSize)
      })
      this.increaseSnake();
    }
  }

  increaseSnake = () => {
    let newSnakeParts = [...this.state.snakeParts];
    newSnakeParts.unshift([]);
    this.setState({
      snakeParts: newSnakeParts
    })
  }

  gameOver = () => {
    //if(this.state.isGameStarted == true) {
      this.state.isGameOver = true;
    //}
    //alert(`game over. score: ${this.state.snakeParts.length}`)
    //this.state.isGameOver = true;
    //this.setState(initialState);
  }

  setUserDetails = (event) => {
    this.state.difficulty = parseInt(this.state.difficulty);
    let newSpeed = 500 / this.state.difficulty;
    //let newSpeed = 500;
    console.log(newSpeed);
    let newBoardSize = parseInt(this.state.userBoardSize);
    this.state.boardSize = newBoardSize;
    //this.state.areaStyle.width = (parseInt(this.state.arenaWidth) * 7) + 'px';
    //this.state.areaStyle.height = (parseInt(this.state.arenaHeight) * 7) + 'px';
    this.state.speed = newSpeed;
    let originSnakePartLeft = Math.floor((parseInt(this.state.arenaWidth) * 7)/2);
    let originSnakePartRight = Math.floor((parseInt(this.state.arenaHeight) * 7)/2);
    this.state.snakeParts = [
      [2, 2],
      [2, 3],
    ];
    initialState.speed = newSpeed;
    //this.setState({speed: newSpeed});
    console.log(this.state);
    this.setState({isGameStarted: true});
    this.componentDidMount();
    event.preventDefault();
  }

  render() {
    if(this.state.isGameStarted == false) {
      return (
        <div className='game-details'>
          <form onSubmit={this.setUserDetails}>
            <label> Board Size:
              <input type="text" value={this.state.userBoardSize} onChange={e => this.setState({userBoardSize: e.target.value})}/>
            </label>
            <label> Game Difficulty:
              <input type="text" value={this.state.difficulty} onChange={e => this.setState({difficulty: e.target.value})}/>
            </label>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      )
    }
    else if (this.state.isGameOver) {
      return (
        <div>
          <div className="user-form">
            <UserDetails score={this.state.snakeParts.length} />
            <h3 style={{textAlign: 'center'}}>Your Score: {this.state.snakeParts.length}</h3>
          </div>
        </div>
      );
    }
    else {
      return (
        <div>
          <div style={this.state.areaStyle}>
            <Board boardSize={this.state.boardSize}/>
            <Snake snakeParts={this.state.snakeParts} snakeStyle={this.state.snakeStyle} />
            <Food dot={this.state.food} foodStyle={this.state.foodStyle}/>
          </div>
        </div>
      );
    }
  }
}

export default App;
