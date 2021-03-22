const getRandomPoints = () => {
    let min = 1, max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y];
}

module.exports = {
    getRandomPoints: getRandomPoints,
    
}