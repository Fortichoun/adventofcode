const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8");
const rows = data.split("\n")

const redThreshold = 12
const greenThreshold = 13
const blueThreshold = 14

const sum = rows.reduce((sum, row) => {
    const [game, sets] = row.split(':')
    const arraySets = sets.split(';')

    const faultySet = arraySets.find(set => {
        const redMatch = set.match(/(\d+) red/)
        const greenMatch = set.match(/(\d+) green/)
        const blueMatch = set.match(/(\d+) blue/)

        const redValue = redMatch ? redMatch[1] : 0
        const greenValue = greenMatch ? greenMatch[1] : 0
        const blueValue = blueMatch ? blueMatch[1] : 0

        return redValue > redThreshold || greenValue > greenThreshold || blueValue > blueThreshold
    })

    const gameValue = faultySet ? 0 : game.match(/Game (\d+)/)[1];

    return sum + parseInt(gameValue)
}, 0)

console.log("sum", sum)