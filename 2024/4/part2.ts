const fs = require("fs");

const data = fs.readFileSync("input2.txt", "utf8");
const rows = data.split("\n")

const lettersToFind = ['M', 'A', 'S']
let horizontalCount = 0
let verticalCount = 0
let diagCount = 0

const wordSearch = (rows, rowIndex, letterIndex) => {
    diagCount += diagSearch(rows, rowIndex, letterIndex)
}

const diagSearch = (rows, rowIndex, letterIndex) => {
    let foundXmas = 0

    const upperLeft = rows?.[rowIndex - 1]?.[letterIndex - 1]
    const upperRight = rows?.[rowIndex - 1]?.[letterIndex + 1]

    const bottomLeft = rows?.[rowIndex + 1]?.[letterIndex - 1]
    const bottomRight = rows?.[rowIndex + 1]?.[letterIndex + 1]

    const firstDiag= [upperLeft, bottomRight]
    const secondDiag= [upperRight, bottomLeft]

    if (firstDiag.includes("M") && firstDiag.includes("S") && secondDiag.includes("M") && secondDiag.includes("S")) {
        foundXmas += 1
    }

    return foundXmas
}


rows.forEach((row, rowIndex) => {
    const letters = row.split('')

    letters.forEach((letter, letterIndex) => {
        if (letter === 'A') {
            wordSearch(rows, rowIndex, letterIndex)
        }
    })
})

const count = horizontalCount + verticalCount + diagCount
console.log("count", count)
