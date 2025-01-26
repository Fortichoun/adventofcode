const fs = require("fs");

const data = fs.readFileSync("input2.txt", "utf8");
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

const findPointGroupThatMatchLength = (firstPoint, lengthNeeded, maxIndex) => {
    if (firstPoint >= finalDisk.length - 1) {
        return -1
    }

    const arrayToFindPointGroup = finalDisk.slice(firstPoint, maxIndex)

    if (arrayToFindPointGroup.length === 0 || lengthNeeded > arrayToFindPointGroup.length ) {
        return -1
    }

    let pointLength = 0

    for (let i = 0; i < arrayToFindPointGroup.length - 1; i++) {
        if (arrayToFindPointGroup[i] === '.') {
            pointLength += 1
        } else {
            break;
        }
    }

    if (pointLength >= lengthNeeded) {
        return firstPoint;
    } else {
        const newFirstPoint = finalDisk.indexOf('.', firstPoint + pointLength)
        return findPointGroupThatMatchLength(newFirstPoint, lengthNeeded, maxIndex)
    }
}


for (let index = extendedDiskToFormat.length - 1; index >= 0; index--) {
    const element = finalDisk[index];

    if (element !== '.') {
        const elementToMoveCount = extendedDiskToFormat.filter(elem => elem === element).length

        const firstPoint = finalDisk.indexOf(".")
        const firstIndexOfGroupToReplace = findPointGroupThatMatchLength(firstPoint, elementToMoveCount, index)

        if (firstIndexOfGroupToReplace !== -1) {
            finalDisk.splice(firstIndexOfGroupToReplace, elementToMoveCount, ...Array(elementToMoveCount).fill(element))
            finalDisk.splice(index - elementToMoveCount + 1, elementToMoveCount, ...Array(elementToMoveCount).fill("."))
        }
    }
}

const checksum = finalDisk.reduce((acc, element, index) => {
    if (element !== '.') {
        return acc += (index * Number(element))
    } else {
        return acc
    }
}, 0)

console.log("checksum", checksum)