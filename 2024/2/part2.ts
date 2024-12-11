const fs = require("fs");

const data = fs.readFileSync("input2.txt", "utf8");
const rows = data.split("\n")
let count = 0

rows.forEach(row => {
    let values = row.split(' ')
    const initialValues = [...values]

    loop1: for (let removeIndex = -1; removeIndex < values.length + 1; removeIndex++) {
        let firstDiffSign = undefined

        if (removeIndex !== -1) {
            values = [...initialValues]
            values.splice(removeIndex, 1)
        }

        console.log("values", values)

        loop2: for (let index = 0; index < values.length - 1; index++) {
            const diff = values[index] - values[index + 1]
            if (index === 0) {
                firstDiffSign = Math.sign(diff)
            }

            if (firstDiffSign !== Math.sign(diff)) {
                break loop2;
            }

            const absDiff = Math.abs(diff)

            if (absDiff > 3) {
                break loop2;
            }

            if (index === values.length - 2) {
                count += 1
                break loop1
            }
        }
    }
})

console.log('count', count)