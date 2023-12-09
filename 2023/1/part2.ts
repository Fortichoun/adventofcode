const fs = require("fs");

const data = fs.readFileSync("input2.txt", "utf8");
const rows = data.split("\n")

const numberMap = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
}

const numberInLetters = Object.keys(numberMap)

const sum = rows.reduce((sum, row) => {
    const intInRow = row.match(/\d/g)
    const firstInt = intInRow ? intInRow[0] : Infinity;
    const lastInt = intInRow ? intInRow[intInRow.length - 1] : -1;

    console.log("lastInt", lastInt)

    const letterResult = numberInLetters.reduce((boundaries, numberInLetter) => {
        const firstIndex = row.indexOf(numberInLetter)
        const lastIndex = row.lastIndexOf(numberInLetter)

        const first = firstIndex !== -1 ? firstIndex : boundaries.first
        const last = lastIndex !== -1 ? lastIndex : boundaries.last

        const isFirstLower = first < boundaries.first.index
        const isLastHigher = last > boundaries.last.index

        return {
            first: isFirstLower ? {index: first, value: numberMap[numberInLetter]} : boundaries.first,
            last: isLastHigher ? {index: last, value: numberMap[numberInLetter]} : boundaries.last,
        }
    }, {first: {index: Infinity, value: ''}, last: {index: -1, value: ''}})

    const finalFirst = intInRow && row.indexOf(firstInt) < letterResult.first.index ? firstInt : letterResult.first.value
    const finalLast = intInRow && row.lastIndexOf(lastInt) > letterResult.last.index ? lastInt : letterResult.last.value

    const result = parseInt(finalFirst.toString() + finalLast.toString())

    console.log("row => ", row, 'result => ', result)

    return sum + result
}, 0)

console.log("sum", sum)