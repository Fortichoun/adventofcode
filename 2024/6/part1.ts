const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8");
const rows = data.split("\n")
const map = rows.map(row => row.split(''))
let count = 0
let startingPos = []

const up = (currentRow, currentCol) =>
    [currentRow - 1, currentCol]

const down = (currentRow, currentCol) =>
    [currentRow + 1, currentCol]

const right = (currentRow, currentCol) =>
    [currentRow, currentCol + 1]

const left = (currentRow, currentCol) =>
    [currentRow, currentCol - 1]

const directions = [up, right, down, left]
let currentDirection = 0

loop1: for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === '^') {
            startingPos = [i, j]
            break loop1;
        }
    }
}

const getNewPosition = (map, currentRow, currentCol) => {
    map[currentRow][currentCol] = 'X'
    const newPosition = directions[currentDirection](currentRow, currentCol)
    const newElement = map?.[newPosition[0]]?.[newPosition[1]]

    if (newElement === undefined) {
        return;
    }

    if (newElement === '#') {
        currentDirection = currentDirection === 3 ? 0 : (currentDirection + 1)
        const viragePosition = directions[currentDirection](currentRow, currentCol)
        return getNewPosition(map, viragePosition[0], viragePosition[1])
    }

    return getNewPosition(map, newPosition[0], newPosition[1])
}

getNewPosition(map, startingPos[0], startingPos[1])

map.forEach(r => r.forEach(c => c === 'X' ? count += 1 : null))

console.log("count", count)