const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8");
const rows = data.split("\n")

const symbols = ['*', '#', '+', '$', '-', '/', '%', '=', '&', '@']

const getIsSymbolInUpperPortion = (firstIndex, lastIndex, row, index) => {
    if (index === 0) return false

    const upperAdjacentPortion = rows[index - 1].slice(firstIndex === 0 ? firstIndex : firstIndex - 1, lastIndex === row.length - 1 ? lastIndex + 1 : lastIndex + 2)

    return !!symbols.find(symbol => upperAdjacentPortion.includes(symbol))
}

const getIsSymbolInLowerPortion = (firstIndex, lastIndex, row, index) => {
    if (index === rows.length - 1) return false

    const lowerAdjacentPortion = rows[index + 1].slice(firstIndex === 0 ? firstIndex : firstIndex - 1, lastIndex === row.length - 1 ? lastIndex + 1 : lastIndex + 2)

    return !!symbols.find(symbol => lowerAdjacentPortion.includes(symbol))
}

const getIsSymbolInSameRow = (firstIndex, lastIndex, row) => {
    const leftAdjacentPortion = firstIndex !== 0 && row.slice(firstIndex - 1, firstIndex)
    const rightAdjacentPortion = lastIndex !== row.length - 1 && row.slice(lastIndex + 1, lastIndex + 2)

    return symbols.includes(leftAdjacentPortion) || symbols.includes(rightAdjacentPortion)
}

const sum = rows.reduce((sum, row, index) => {
    const [...numbers] = row.matchAll(/\d+/g)

    const rowSum = numbers ? numbers.reduce((sum, numberMatch) => {
        const firstIndex = numberMatch.index
        const lastIndex = firstIndex + numberMatch[0].length - 1

        const isSymbolInUpperPortion = getIsSymbolInUpperPortion(firstIndex, lastIndex, row, index)
        const isSymbolInLowerPortion = getIsSymbolInLowerPortion(firstIndex, lastIndex, row, index)
        const isSymbolInSameRow = getIsSymbolInSameRow(firstIndex, lastIndex, row)

        const numberValue = (isSymbolInUpperPortion || isSymbolInLowerPortion || isSymbolInSameRow) ? parseInt(numberMatch[0]) : 0

        return sum + numberValue
    }, 0) : 0

    return sum + rowSum
}, 0)

console.log("sum", sum)