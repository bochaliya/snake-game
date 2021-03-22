const mongoClient = require('mongodb');

const url = 'mongodb://localhost:27017';

async function insertUser(userName, score) {
    try {
        let currTime = new Date();
        currTime = currTime.setHours(0, 0, 0, 0);
        currTime = new Date(currTime);
        let client = await mongoClient.connect(url);
        let db = await client.db('usersDB');
        let user = await db.collection('users');
        if(user != null ) {
            await user.insertOne({ user: userName, score: score, score_date: currTime });
        }
        client.close();
    }
    catch (err) {
        console.log('error while inserting new user: ', err);
    }
}

async function getTopScores() {
    try {
        let topScores = [];
        let client = await mongoClient.connect(url);
        let db = await client.db('usersDB');
        let user = await db.collection('users');
        const pipeline = [
            {
                $sort: {
                    score: -1
                }
            },
            {
                $limit: 10
            }
        ]
        const result = await user.aggregate(pipeline);
        topScores = await result.toArray();
        console.log(topScores);
        client.close();
        return topScores;
    }
    catch (err) {
        console.log('error while getting top scores: ', err);
    }
}

async function getTopScoresPerUser() {
    try {
        let topScores = [];
        let client = await mongoClient.connect(url);
        let db = await client.db('usersDB');
        let user = await db.collection('users');
        const pipeline = [
            { $sort: { user: -1, score: -1 } },
            {
                $group:
                    { '_id': '$user', 'scores': { '$push': '$$ROOT' } }
            },
            {
                $project:
                    { 'topTen': { '$slice': ['$scores', 10] } }
            }
        ]
        const result = await user.aggregate(pipeline);
        topScores = await result.toArray();
        console.log(topScores);
        client.close();
        return topScores;
    }
    catch (err) {
        console.log('error while gettting top scores per user: ', err);
    }
}

async function totalGames() {
    try {
        let totalGames = [];
        let client = await mongoClient.connect(url);
        let db = await client.db('usersDB');
        let user = await db.collection('users');
        const pipeline = [
            {
                $group: {
                    _id: '$score_date', count: { $sum: 1 }
                }
            }
        ]
        const result = await user.aggregate(pipeline);
        totalGames = await result.toArray();
        console.log(totalGames);
        client.close();
        return totalGames;
    }
    catch (err) {
        console.log('error while getting total games: ', err);
    }
}

async function totalGamesPerUser() {
    try {
        let totalGames = [];
        let client = await mongoClient.connect(url);
        let db = await client.db('usersDB');
        let user = await db.collection('users');
        const pipeline = [
            {
                $group: {
                    _id: { score_date: '$score_date', user: '$user' },
                    count: { $sum: 1 }
                }
            }
        ]
        const result = await user.aggregate(pipeline);
        totalGames = await result.toArray();
        console.log(totalGames);
        client.close();
        return totalGames;
    }
    catch (err) {
        console.log('error while getting total games per user', err);
    }
}

module.exports = {
    insertUser: insertUser,
    getTopScores: getTopScores,
    getTopScoresPerUser: getTopScoresPerUser,
    totalGames: totalGames,
    totalGamesPerUser: totalGamesPerUser
}