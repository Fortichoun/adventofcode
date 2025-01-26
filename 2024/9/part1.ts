const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8");
const row = data.split('')
let diskCounter = 0
let extendedDisk = [];

row.forEach((diskNumberStr, index) => {
    const diskNumber = Number(diskNumberStr)

    if (index % 2 === 0) {
        for (let i = 0; i < diskNumber; i++) {
            extendedDisk.push(diskCounter.toString())
        }
        diskCounter += 1
    } else {
        for (let j = 0; j < diskNumber; j++) {
            extendedDisk.push('.')
        }
    }
})

const extendedDiskToFormat = extendedDisk.slice()
const finalDisk = extendedDiskToFormat.slice()

console.log("extendedDiskToFormat", extendedDiskToFormat)

for (let index = extendedDiskToFormat.length - 1; index >= 0; index--) {
    const element = extendedDiskToFormat[index];

    if (element !== '.') {
        const firstPoint = finalDisk.indexOf(".")
        const hasOtherNumberToReplace = finalDisk.slice(firstPoint).some(elem => elem !== '.')
        if (hasOtherNumberToReplace) {
            finalDisk[index] = '.'
            finalDisk[firstPoint] = element
        } else {
            break;
        }
    }
}

console.log("finalDisk", finalDisk)

const checksum = finalDisk.reduce((acc, element, index) => {
    if (element !== '.') {
        return acc += (index * Number(element))
    } else {
        return acc
    }
}, 0)

console.log("checksum", checksum)