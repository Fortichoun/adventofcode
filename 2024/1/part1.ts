const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8");
const rows = data.split("\n")
const rowsCount = rows.length

const {left, right} = rows.reduce((acc, row) => {
    const [left, right] = row.split('   ')

    return {left: [...acc.left, Number(left)], right: [...acc.right, Number(right)]}
}, {left: [], right: []})

let sum = 0

for (let i = 0; i < rowsCount; i++) {
    const indexOfMinLeft = left.indexOf(Math.min.apply(Math, left))
    const [minLeft] = left.splice(indexOfMinLeft, 1)

    const indexOfMinRight = right.indexOf(Math.min.apply(Math, right))
    const [minRight] = right.splice(indexOfMinRight, 1)

    const diff = Math.abs(minLeft - minRight)
    sum += diff
}

console.log("sum", sum)
