const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8");
const rows = data.split("\n")
let count = 0

rows.forEach(row => {
    const values = row.split(' ')
    let firstDiffSign = undefined

    for (let i = 0; i < values.length - 1; i++) {
        const diff = values[i] - values[i + 1]
        if (i === 0) {
            firstDiffSign = Math.sign(diff)
        }

        if (firstDiffSign !== Math.sign(diff)) {
            break;
        }

        const absDiff = Math.abs(diff)

        if (absDiff > 3) {
            break;
        }

        if (i === values.length - 2) {
            count += 1
        }
    }
})

console.log('count', count)