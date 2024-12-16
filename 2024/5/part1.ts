const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8");
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

const [leftRules, rightRules] = rules.reduce((acc, rule) => {
    const [first, last] = rule.split('|')

    return [[...acc[0], Number(first)], [...acc[1], Number(last)]]
}, [[], []])

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
        return acc
    } else {
        const middleElement = formattedRow[Math.floor((formattedRow.length - 1) / 2)]

        return acc + Number(middleElement)
    }
}, 0)

console.log("count", count)
