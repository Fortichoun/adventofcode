const fs = require("fs");

const initialFishes = fs.readFileSync("input.txt", "utf8").split(",").map(stringValue => Number(stringValue))
const finalCounter = [0, 0, 0, 0, 0, 0, 0, 0, 0]
initialFishes.forEach(fish => finalCounter[fish] += 1)
let counter = [...finalCounter]

for (let day = 1; day <= 256; day++) {
    counter = [...finalCounter]
    for (let i = 8; i >= 0; i--) {
        if (i === 0) {
            finalCounter[6] += counter[0]
            finalCounter[8] = counter[0]
        } else {
            finalCounter[i - 1] = counter[i]
        }
    }
}

console.log("finalFishes", finalCounter.reduce((acc, sum) => acc + sum, 0))


