const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8");
const sentences = data.split("\n")
const regexp = /mul\(\d{1,3},\d{1,3}\)/g

console.log("sentences", sentences)

const globalCount = sentences.reduce((acc, sentence) => {
    const matches = sentence.match(regexp)

    const count = matches.reduce((acc, match) => {
        const cleanedMatch = match.replace('mul(', '').replace(')', '')
        const [first, second] = cleanedMatch.split(',')

        const result = Number(first) * Number(second)

        return acc + result
    }, 0)

    console.log('count', count)

    return acc + count
}, 0)

console.log("globalCount", globalCount)



