const fs = require("fs");

const data = fs.readFileSync("input2.txt", "utf8");
const rows = data.split("\n")
const map = rows.map(row => row.split(''))
const copy = [...map]
let count = 0
let maxTimeToTravel = 0
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

const getNewPosition = (mapProp, currentRow, currentCol, debug) => {
    mapProp[currentRow][currentCol] = 'X'
    maxTimeToTravel += 1
    const newPosition = directions[currentDirection](currentRow, currentCol)
    const newElement = mapProp?.[newPosition[0]]?.[newPosition[1]]

    if (debug) {
        console.log("===========================")
        mapProp.forEach(m => console.log(`m => ${m}`))
        console.log("===========================")
    }

    if (newElement === undefined) {
        return;
    }

    if (maxTimeToTravel === 6275) {
        return 1
    }

    if (newElement === '#') {
        currentDirection = currentDirection === 3 ? 0 : (currentDirection + 1)
        const viragePosition = directions[currentDirection](currentRow, currentCol)
        return getNewPosition(mapProp, viragePosition[0], viragePosition[1], debug)
    }

    return getNewPosition(mapProp, newPosition[0], newPosition[1], debug)
}

for (let rowIndex = 0; rowIndex < copy.length; rowIndex++) {
    for (let colIndex = 0; colIndex < copy[0].length; colIndex++) {
        currentDirection = 0
        maxTimeToTravel = 0

        const yoloMap = rows.map(row => row.split(''))
        yoloMap[rowIndex][colIndex] = yoloMap[rowIndex][colIndex] === '^' ? '^' : '#'

        const debug = false

        const result = getNewPosition(yoloMap, startingPos[0], startingPos[1], debug)


        if (result === 1) {
            // copy.forEach(m => console.log(`m => ${m}`))
            // console.log(`blocked avec ${rowIndex} & ${colIndex}`)
            count += 1
        }
    }
}

// map.forEach(r => r.forEach(c => c === 'X' ? count += 1 : null))
// map.forEach(m => console.log(`m => ${m}`))

console.log("count", count)