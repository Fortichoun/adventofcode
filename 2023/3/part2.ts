const fs = require("fs");

const data = fs.readFileSync("input2.txt", "utf8");
const rows = data.split("\n")

const getNumbersInUpperPortion = (gearIndex, row, index) => {
    if (index === 0) return []

    const [...numbers] = rows[index - 1].matchAll(/\d+/g)
    const validNumbers = numbers.flatMap(number => {
        const firstIndex = number.index
        const lastIndex = firstIndex + number[0].length - 1

        const gearLeftDiagIndex = gearIndex - 1
        const gearRightDiagIndex = gearIndex + 1

        return (firstIndex >= gearLeftDiagIndex && firstIndex <= gearRightDiagIndex) || (lastIndex >= gearLeftDiagIndex && lastIndex <= gearRightDiagIndex) ?
            [parseInt(number[0])] : []
    })


    return validNumbers
}

const getNumbersInLowerPortion = (gearIndex, row, index) => {
    if (index === rows.length - 1) return []

    const [...numbers] = rows[index + 1].matchAll(/\d+/g)
    const validNumbers = numbers.flatMap(number => {
        const firstIndex = number.index
        const lastIndex = firstIndex + number[0].length - 1

        const gearLeftDiagIndex = gearIndex - 1
        const gearRightDiagIndex = gearIndex + 1

        return (firstIndex >= gearLeftDiagIndex && firstIndex <= gearRightDiagIndex) || (lastIndex >= gearLeftDiagIndex && lastIndex <= gearRightDiagIndex) ?
            [parseInt(number[0])] : []
    })


    return validNumbers
}

const getNumbersInSameRow = (gearIndex, row, index) => {
    const [...numbers] = rows[index].matchAll(/\d+/g)
    const validNumbers = numbers ? numbers.flatMap(number => {
        const firstIndex = number.index
        const lastIndex = firstIndex + number[0].length - 1

        const gearLeftDiagIndex = gearIndex - 1
        const gearRightDiagIndex = gearIndex + 1

        return (lastIndex === gearLeftDiagIndex) || (firstIndex === gearRightDiagIndex) ?
            [parseInt(number[0])] : []
    }) : []

    return validNumbers
}

const sum = rows.reduce((sum, row, index) => {
    const [...gears] = row.matchAll(/\*/g)

    const rowSum = gears ? gears.reduce((sum, numberMatch) => {
        const gearIndex = numberMatch.index

        const numbersInUpperPortion = getNumbersInUpperPortion(gearIndex, row, index)
        const numbersInLowerPortion = getNumbersInLowerPortion(gearIndex, row, index)
        const numbersInSameRow = getNumbersInSameRow(gearIndex, row, index)

        const allValidNumbers = [...numbersInUpperPortion, ...numbersInLowerPortion, ...numbersInSameRow]
        const power = allValidNumbers.length === 2 ? allValidNumbers[0] * allValidNumbers[1] : 0

        return sum + power
    }, 0) : 0

    return sum + rowSum
}, 0)

console.log("sum", sum)