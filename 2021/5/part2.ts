const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8");
const rows = data.split("\n")

const validRows = rows.map(row => row.split(" -> ")).filter((row) => {
    const [x1, y1] = row[0].split(",").map(stringValue => Number(stringValue))
    const [x2, y2] = row[1].split(",").map(stringValue => Number(stringValue))

    const validDiagonal = Math.abs(x1 - x2) === Math.abs(y1 - y2)

    return x1 === x2 || y1 === y2 || validDiagonal
})

const dangerousAreas = []

validRows.reduce((acc, row) => {
    const [x1, y1] = row[0].split(",").map(stringValue => Number(stringValue))
    const [x2, y2] = row[1].split(",").map(stringValue => Number(stringValue))

    const [smallestX, biggestX] = x1 < x2 ? [x1, x2] : [x2, x1]
    const [smallestY, biggestY] = y1 < y2 ? [y1, y2] : [y2, y1]

    if (x1 === x2) {
        for (let i = smallestY; i <= biggestY; i++) {
            const ventedCoordinates = `x${x1}y${i}`
            acc.includes(ventedCoordinates) ? !dangerousAreas.includes(ventedCoordinates) && dangerousAreas.push(ventedCoordinates) : acc.push(ventedCoordinates)
        }
    } else if (y1 === y2) {
        for (let j = smallestX; j <= biggestX; j++) {
            const ventedCoordinates = `x${j}y${y1}`
            acc.includes(ventedCoordinates) ? !dangerousAreas.includes(ventedCoordinates) && dangerousAreas.push(ventedCoordinates) : acc.push(ventedCoordinates)
        }
    } else if (Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
        const diff = Math.abs(x1 - x2)
        const xModifier = x1 < x2 ? 1 : -1
        const yModifier = y1 < y2 ? 1 : -1
        for (let k = 0; k <= diff; k++) {
            const ventedCoordinates = `x${x1 + (k * xModifier)}y${y1 + (k * yModifier)}`
            acc.includes(ventedCoordinates) ? !dangerousAreas.includes(ventedCoordinates) && dangerousAreas.push(ventedCoordinates) : acc.push(ventedCoordinates)
        }
    }

    return acc
}, [])

console.log("nbr of dangerousAreas", dangerousAreas.length)

