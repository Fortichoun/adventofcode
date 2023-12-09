const fs = require("fs");

const data = fs.readFileSync("input2.txt", "utf8");
const rows = data.split("\n")

const getNextCards = (rowIndex, numberOfCardsScratched) => {
    let acc = 0;

    const [, numbers] = rows[rowIndex].split(':')
    const [winningNumbers, numbersYouHave] = numbers.split('|')

    const winningNumbersArray = winningNumbers.trim().split(' ').filter(value => value !== '')
    const numbersYouHaveArray = numbersYouHave.trim().split(' ').filter(value => value !== '')

    const trulyWinningCount = numbersYouHaveArray.reduce((sum, numberYouHave) => {
        const isWinning = !!winningNumbersArray.find(n => n === numberYouHave) ? 1 : 0

        return sum + isWinning
    }, 0)


    for (let i = rowIndex + 1; i < rowIndex + trulyWinningCount + 1; i += 1) {
        acc += getNextCards(i, numberOfCardsScratched)
    }

    return acc + numberOfCardsScratched + 1
}

const sum = rows.reduce((sum, row, index) => {
    const scratched = getNextCards(index, 0)

    return sum + scratched
}, 0)

console.log("sum", sum)