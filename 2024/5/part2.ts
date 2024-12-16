const fs = require("fs");

const data = fs.readFileSync("input2.txt", "utf8");
const [rawRules, rawRows] = data.split("\n\n")

const rules = rawRules.split("\n")
const rows = rawRows.split("\n")

const indexOfAll = (array, element) => array.reduce((acc, elem, index) => {
    if (elem === element) {
        return [...acc, index]
    } else {
        return acc
    }
}, [])

function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}


const [leftRules, rightRules] = rules.reduce((acc, rule) => {
    const [first, last] = rule.split('|')

    return [[...acc[0], Number(first)], [...acc[1], Number(last)]]
}, [[], []])

const shuffleAndTest = (array) => {
    const result = array.reduce((acc, elem) => {
        const indexesLeft = indexOfAll(leftRules, Number(elem))
        const indexesRight = indexOfAll(rightRules, Number(elem))

        const matchingRight = indexesLeft.map(index => rightRules[index])
        const matchingLeft = indexesRight.map(index => leftRules[index])


        const reversed = acc.slice().reverse()
        const firstFound = reversed.find((elem) => matchingLeft.includes(Number(elem)))

        const lastIndex = acc.indexOf(firstFound)

        const newIndex = lastIndex === (acc.length - 1) ? lastIndex : lastIndex + 1
        // console.log("elem ", elem ," should be placed at", newIndex)

        const copy = [...acc]
        arraymove(copy, copy.indexOf(elem), newIndex)

        // console.log("newCopy => ", copy)

        if (testRow(copy) && acc.indexOf(elem) !== newIndex) {
            return shuffleAndTest(copy)
        } else {
            return copy
        }
    }, array)

    // console.log("result", result)

    return result
}

const testRow = (row) =>
    row.some((number, index) => {
        const indexes = indexOfAll(leftRules, Number(number))
        const matchingRight = indexes.map(index => rightRules[index])

        const previousElementsToTest = row.slice(0, index)

        return previousElementsToTest.some(previous => matchingRight.includes(Number(previous)))
    })

const count = rows.reduce((acc, row) => {
    const formattedRow = row.split(',')

    const oulah = formattedRow.some((number, index) => {
        const indexes = indexOfAll(leftRules, Number(number))
        const matchingRight = indexes.map(index => rightRules[index])

        const previousElementsToTest = formattedRow.slice(0, index)

        // console.log("number =>", number, " / indexes => ", indexes, " / ", matchingRight)
        // console.log("previousElementsToTest =>", previousElementsToTest)

        return previousElementsToTest.some(previous => matchingRight.includes(Number(previous)))
    })

    if (oulah) {
        const numberRow = formattedRow.map(f => Number(f))
        const correctedRow = shuffleAndTest(numberRow)
        console.log("correctedRow", correctedRow)

        const middleElement = correctedRow[Math.floor((correctedRow.length - 1) / 2)]

        return acc + Number(middleElement)
    } else {

        return acc
    }
}, 0)

console.log("count", count)
