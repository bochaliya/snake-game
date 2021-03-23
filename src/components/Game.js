import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Snake from './Snake';
import Food from './Food';
import ScoreBoard from './ScoreBoard';
import UserDetails from './UserDetails';

import utils from '../utils/utils';

const initialState = {
  food: utils.getRandomPoints(),
  direction: 'RIGHT',
  isGameOver: false,
  isGameStarted: false,
  speed: 200,
  snakeParts: [
    [50, 50],
    [52, 50],
  ]
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
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
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
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
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
        food: utils.getRandomPoints()
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
    this.state.isGameOver = true;
    //alert(`game over. score: ${this.state.snakeParts.length}`)
    this.state.isGameOver = true;
    //this.setState(initialState);
  }

  render() {
    if (this.state.isGameOver) {
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
          <div className='area'>
            <Snake snakeParts={this.state.snakeParts} />
            <Food dot={this.state.food} />
          </div>
        </div>
      );
    }
  }
}

export default App;
