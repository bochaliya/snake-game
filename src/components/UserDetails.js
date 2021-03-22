import React from 'react';
import axios from 'axios';
import Game from './Game';
import ScoreBoard from './ScoreBoard';


class UserDetails extends React.Component {

    UserDetails(props) {
        this.props = props;
        console.log(this.props.score);
    }

    state = {
        userName: 'please enter name',
        isNameSubmitted: false,
    }

    setUserName = (event) => {
        let url = 'http://localhost:3001/user/?userName=' + this.state.userName + '&score=' + this.props.score;
        axios.post(url);
        console.log(this.state.userName);
        this.setState({ isNameSubmitted: true });
        event.preventDefault();
    }

    restartGame = (event) => {
        //do nothing
    }

    render() {
        if (this.isNameSubmitted) {
            return (
                <div>
                    <ScoreBoard/>
                </div>
            );
        }
        else {
            return (
                <div>
                    <form onSubmit={this.setUserName}>
                        <label>User Name:
                    <input type="text" value={this.state.userName} onChange={e => this.setState({ userName: e.target.value })} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            );
        }
    }
}

export default UserDetails;