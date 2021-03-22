const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const Users = require('./models/users');
const port = 3001;

//app.use(bodyParser.urlencoded({ extended: true}))

const topScores = require('./helpers/top-scores');

//static files of frontend
//app.use('/', express.static('../../build'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post('/user/', (req, res)=> {
    let user = req.query.userName;
    let score = req.query.score;
    score = parseInt(score);
    console.log('user: ' + user + ' score: ' + score);
    topScores.insertUser(user, score)
    .then((resolve, reject)=> {
        res.send('done');
    })
    .catch((err)=> {
        console.log(err);
    });
})

app.get('/topScores/', (req, res)=> {
    let result = [];
    topScores.getTopScores()
    .then((resolve, reject)=> {
        result = resolve;
        res.send(result);
    })
    .catch((err)=> {
        console.log(err);
    });
})

app.get('/topScores/user/', (req, res)=> {
    let result = [];
    topScores.getTopScoresPerUser()
    .then((resolve, reject)=> {
        result = resolve;
        res.send(result);
    })
    .catch((err)=> {
        console.log(err);
    });
})

app.get('/totalGames/', (req, res)=> {
    let result = [];
    topScores.totalGames()
    .then((resolve, reject)=> {
        result = resolve;
        res.send(result);
    })
    .catch((err)=> {
        console.log(err);
    });
})

app.get('/totalGames/user/', (req, res)=> {
    let result = [];
    topScores.totalGamesPerUser()
    .then((resolve, reject)=> {
        result = resolve;
        res.send(result);
    })
    .catch((err)=> {
        console.log(err);
    });
})

app.listen(port);