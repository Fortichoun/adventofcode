const fs = require("fs");

const data = fs.readFileSync("input2.txt", "utf8");
const rows = data.split("\n")
const rowsCount = rows.length

const {left, right} = rows.reduce((acc, row) => {
    const [left, right] = row.split('   ')

    return {left: [...acc.left, Number(left)], right: [...acc.right, Number(right)]}
}, {left: [], right: []})

let sum = 0

const checkOccurrence = (array, element) => {
    let counter = 0;
    for (let i = 0; i <= array.length; i++) {
        if (array[i] == element) {
            counter++;
        }
    }

    return counter
};

for (let i = 0; i < rowsCount; i++) {
    const leftElement = left.splice(0, 1)
    const rightOccurrence = checkOccurrence(right, leftElement)

    const similarity = leftElement * rightOccurrence
    sum += similarity
}

console.log("sum", sum)
