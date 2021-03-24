const getRandomPoints = (boardSize) => {
    let min = 1, max = boardSize-1;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y];
}

module.exports = {
    getRandomPoints: getRandomPoints,
    
}