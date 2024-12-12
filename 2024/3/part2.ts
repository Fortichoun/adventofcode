const fs = require("fs");

const data = fs.readFileSync("input2.txt", "utf8");
const sentences = data.split("\n")
const regexp = /mul\(\d{1,3},\d{1,3}\)/g

const mergesSentences = sentences.join('')

const chunkedSentence = mergesSentences.split('don\'t()')

const count = chunkedSentence.reduce((doAcc, chunk, doIndex) => {
    const doChunk = chunk.split('do()')

    const doCount = doChunk.reduce((matchAcc, elem, currentIndex) => {

        if (currentIndex === 0 && doIndex !== 0) {
            return matchAcc
        }
        const matches = elem.match(regexp)

        const matchCount = matches.reduce((acc, match) => {
            const cleanedMatch = match.replace('mul(', '').replace(')', '')
            const [first, second] = cleanedMatch.split(',')

            const result = Number(first) * Number(second)

            return acc + result
        }, 0)

        return matchCount + matchAcc
    }, 0)

    return doAcc + doCount
}, 0)


console.log('count', count)
