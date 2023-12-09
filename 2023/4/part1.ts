const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8");
const rows = data.split("\n")

const sum = rows.reduce((sum, row) => {
    const [card, numbers] = row.split(':')
    const [winningNumbers, numbersYouHave] = numbers.split('|')

    const winningNumbersArray = winningNumbers.trim().split(' ').filter(value => value !== '')
    const numbersYouHaveArray = numbersYouHave.trim().split(' ').filter(value => value !== '')


    const trulyWinningCount = numbersYouHaveArray.reduce((sum, numberYouHave) => {
        const isWinning = !!winningNumbersArray.find(n => n === numberYouHave) ? 1 : 0

        return sum + isWinning
    }, 0)

    const power = trulyWinningCount < 2 ? trulyWinningCount : Math.pow(2, trulyWinningCount - 1)


    return sum + power
}, 0)

console.log("sum", sum)