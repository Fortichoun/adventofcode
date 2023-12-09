const fs = require("fs");

const data = fs.readFileSync("input2.txt", "utf8");
const rows = data.split("\n")

const sum = rows.reduce((sum, row) => {
    const [, sets] = row.split(':')
    const arraySets = sets.split(';')

    const max = arraySets.reduce((max, set) => {
        const redMatch = set.match(/(\d+) red/)
        const greenMatch = set.match(/(\d+) green/)
        const blueMatch = set.match(/(\d+) blue/)

        const redValue = redMatch ? parseInt(redMatch[1]) : 0
        const greenValue = greenMatch ? parseInt(greenMatch[1]) : 0
        const blueValue = blueMatch ? parseInt(blueMatch[1]) : 0

        return {
            red: redValue > max.red ? redValue : max.red,
            green: greenValue > max.green ? greenValue : max.green,
            blue: blueValue > max.blue ? blueValue : max.blue
        }
    }, {red: 0, green: 0, blue: 0})

    const power = max.red * max.green * max.blue

    return sum + power
}, 0)

console.log("sum", sum)