import React from 'react';
import Button from './Button';
import Game from './Game';
import ScoreBoard from './ScoreBoard';

class App extends React.Component {
    state = {
        mainPage: true,
        gameStart: false,
        checkScoreBoard: false,
    }

    beginOnClick = () => {
        this.setState({ mainPage: false });
        this.setState({ gameStart: true });
    }

    scoreBoardOnClick = () => {
        this.setState({ mainPage: false });
        this.setState({ checkScoreBoard: true });
    }

    render() {
        if (this.state.gameStart) {
            return (
                <div>
                    <h1 style={{textAlign: "center"}}>Game Arena</h1>
                    <Game />
                </div>
            );
        }
        else if (this.state.checkScoreBoard) {
            return (
                <div>
                    <ScoreBoard />
                </div>
            );
        }
        else {
            return (
                <div className='main-page'>
                    <Button text='Play!' color='#FFFDD0' onClick={this.beginOnClick} />
                    <Button text='Score Board' color='#FFFDD0' onClick={this.scoreBoardOnClick} />
                </div>
            );
        }
    }
}

export default App;