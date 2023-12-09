const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8");
const rows = data.split("\n")

const sum = rows.reduce((sum, row) => {
    const intInRow = row.match(/\d/g)
    const firstInt = intInRow[0];
    const lastInt = intInRow[intInRow.length - 1];

    const result = parseInt(firstInt + lastInt)

    return sum + result
}, 0)

console.log("sum", sum)