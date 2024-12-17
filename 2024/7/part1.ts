const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8");
const rows = data.split("\n")
let operators = []
let count = 0

const finalCompute = (numbers, operators) =>
    numbers.reduce((acc, number, index) => {
        if (index === 0) {
            return number
        }

        const operator = operators[index - 1]

        return operator === '+' ? acc + number : acc * number
    }, 0)


const operatorsMap = (array, index, length) => {
    if (index === length) {
        return operators.push(array)
    } else {
        operatorsMap([...array, '+'], index + 1, length)
        operatorsMap([...array, '*'], index + 1, length)
    }
}

rows.forEach(row => {
    operators = []
    const [rawSum, rawNumbers] = row.split(':')
    const sum = Number(rawSum)
    const [_, ...stringNumbers] = rawNumbers.split(' ')
    const numbers = stringNumbers.map(Number)
    operatorsMap([], 0, numbers.length - 1)

    const result = operators.some(ope => {
        const result = finalCompute(numbers, ope)

        return result === sum
    })

    if (result) {
        count += sum
    }
})

console.log("count", count)