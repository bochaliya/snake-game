import React from 'react';
import axios from 'axios';
import UserDetails from './UserDetails';
import List from './List';
import { render } from 'react-dom';

class GameOver extends React.Component {

    GameOver(props) {
        this.props = props;
    }

    state = {
        topScores: this.getTopScores(),
        //topScoresPerUser: this.getTopScoresPerUser(),
        //totalGames: this.getTotalGames(),
        //totalGamesPerUser: this.getTotalGamesPerUser()
    };

    getTopScores() {
        axios.get('http://localhost:3001/topScores/', {})
            .then(response => {
                console.log(response.data);
                const listItems = response.data.map((d) => {
                    //return <li> User: {d.user} Score: {d.score} Score Date: {d.score_date}</li>
                    let currDate = new Date(d.score_date);
                    d.score_date = currDate.getDate() + '/' + (currDate.getMonth() + 1) + '/' + currDate.getFullYear();
                    return <List data={[d.user, d.score, d.score_date]} />
                })
                listItems.unshift(<List data={['Player Name', 'Score', 'Game Date']}/>);
                //return listItems;
                this.setState({ topScores: listItems });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    /*getTopScoresPerUser() {
    axios.get('http://localhost:3001/topScores/user/', {})
        .then(response => {
            console.log(response.data);
            const listItems = [];
            response.data.forEach((d) => {
                let user = d._id;
                let topTen = d.topTen;
                topTen.forEach((u)=> {
                    listItems.push(<li> User: {user} Score: {u.score} Score Date: {u.score_date}</li>);
                })
            })
            //return listItems;
            this.setState({topScoresPerUser: listItems});
        })
        .catch((err) => {
            console.log(err);
        })
}

    getTotalGames() {
    axios.get('http://localhost:3001/totalGames/', {})
        .then(response => {
            console.log(response.data);
            const listItems = response.data.map((d) => {
                return <li> Date: {d._id} Total Games: {d.count}</li>
            })
            //return listItems;
            this.setState({totalGames: listItems});
        })
        .catch((err) => {
            console.log(err);
        })
}

    getTotalGamesPerUser() {
    axios.get('http://localhost:3001/totalGames/user/', {})
        .then(response => {
            console.log(response.data);
            const listItems = response.data.map((d) => {
            return <li> User: {d._id.user} Date: {d._id.score_date} Total games: {d.count}</li>
            })
            //return listItems;
            this.setState({totalGamesPerUser: listItems});
        })
        .catch((err) => {
            console.log(err);
        })
}*/

    render() {
        return (
            <div className='top-scores'>
                <h2 style={{textAlign: "center" }}>Top Scores</h2>
                <ul>{this.state.topScores}</ul>
            </div>
        );
    }
}

export default GameOver;