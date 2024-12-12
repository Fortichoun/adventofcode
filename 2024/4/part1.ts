const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8");
const rows = data.split("\n")

const lettersToFind = ['M', 'A', 'S']
let horizontalCount = 0
let verticalCount = 0
let diagCount = 0

const wordSearch = (rows, rowIndex, letterIndex) => {
    horizontalCount += horizontalSearch(rows[rowIndex], letterIndex)
    verticalCount += verticalSearch(rows, rowIndex, letterIndex)
    diagCount += diagSearch(rows, rowIndex, letterIndex)
}

const horizontalSearch = (row, letterIndex) => {
    let foundXmas = 0

    for (let i = 0; i < lettersToFind.length; i++) {
        // console.log(`index : ${i} / currentLetter : ${row[letterIndex + i + 1]} / currentToFind = ${lettersToFind[i]}`)
        if (!row?.[letterIndex + i + 1] || row[letterIndex + i + 1] !== lettersToFind[i]) {
            break;
        }

        if (i === lettersToFind.length - 1) {
            foundXmas += 1
        }
    }

    for (let i = 0; i < lettersToFind.length; i++) {
        // console.log(`index : ${i} / currentLetter : ${row[letterIndex + i + 1]} / currentToFind = ${lettersToFind[i]}`)
        if (!row?.[letterIndex - i - 1] || row[letterIndex + -i + -1] !== lettersToFind[i]) {
            break;
        }

        if (i === lettersToFind.length - 1) {
            foundXmas += 1
        }
    }

    return foundXmas
}

const verticalSearch = (rows, rowIndex, letterIndex) => {
    let foundXmas = 0

    for (let i = 0; i < lettersToFind.length; i++) {
        const bottomRow = rows?.[rowIndex + i + 1]
        // console.log(`index : ${i} / currentLetter : ${row[letterIndex + i + 1]} / currentToFind = ${lettersToFind[i]}`)
        if (!bottomRow || (bottomRow[letterIndex] !== lettersToFind[i])) {
            break;
        }

        if (i === lettersToFind.length - 1) {
            foundXmas += 1
        }
    }

    for (let i = 0; i < lettersToFind.length; i++) {
        const upperRow = rows?.[rowIndex - i - 1]
        // console.log(`index : ${i} / currentLetter : ${row[letterIndex + i + 1]} / currentToFind = ${lettersToFind[i]}`)
        if (!upperRow || (upperRow[letterIndex] !== lettersToFind[i])) {
            break;
        }

        if (i === lettersToFind.length - 1) {
            foundXmas += 1
        }
    }

    return foundXmas
}

const diagSearch = (rows, rowIndex, letterIndex) => {
    let foundXmas = 0

    for (let i = 0; i < lettersToFind.length; i++) {
        const bottomRow = rows?.[rowIndex + i + 1]
        // console.log(`index : ${i} / currentLetter : ${row[letterIndex + i + 1]} / currentToFind = ${lettersToFind[i]}`)
        if (!bottomRow || !bottomRow?.[letterIndex + i + 1] || (bottomRow[letterIndex + i + 1] !== lettersToFind[i])) {
            break;
        }

        if (i === lettersToFind.length - 1) {
             foundXmas += 1
        }
    }

    for (let i = 0; i < lettersToFind.length; i++) {
        const bottomRow = rows?.[rowIndex + i + 1]
        // console.log(`index : ${i} / currentLetter : ${row[letterIndex + i + 1]} / currentToFind = ${lettersToFind[i]}`)
        if (!bottomRow || !bottomRow?.[letterIndex - i - 1] || (bottomRow[letterIndex - i - 1] !== lettersToFind[i])) {
            break;
        }

        if (i === lettersToFind.length - 1) {
             foundXmas += 1
        }
    }

    for (let i = 0; i < lettersToFind.length; i++) {
        const upperRow = rows?.[rowIndex - i - 1]
        // console.log(`index : ${i} / currentLetter : ${row[letterIndex + i + 1]} / currentToFind = ${lettersToFind[i]}`)
        if (!upperRow || !upperRow?.[letterIndex - i - 1] || (upperRow[letterIndex - i - 1] !== lettersToFind[i])) {
            break;
        }

        if (i === lettersToFind.length - 1) {
             foundXmas += 1
        }
    }

    for (let i = 0; i < lettersToFind.length; i++) {
        const upperRow = rows?.[rowIndex - i - 1]
        // console.log(`index : ${i} / currentLetter : ${row[letterIndex + i + 1]} / currentToFind = ${lettersToFind[i]}`)
        if (!upperRow || !upperRow?.[letterIndex + i + 1] || (upperRow[letterIndex + i + 1] !== lettersToFind[i])) {
            break;
        }

        if (i === lettersToFind.length - 1) {
             foundXmas += 1
        }
    }

    return foundXmas
}


rows.forEach((row, rowIndex) => {
    const letters = row.split('')

    letters.forEach((letter, letterIndex) => {
        if (letter === 'X') {
            wordSearch(rows, rowIndex, letterIndex)
        }
    })
})

const count = horizontalCount + verticalCount + diagCount
console.log("count", count)
