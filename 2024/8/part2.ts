const fs = require("fs");

const data = fs.readFileSync("input2.txt", "utf8");
const rows = data.split("\n")
const maxRow = rows.length
const maxCol = rows[0].split('').length
let antinodePositions = []

const doRecursiveAntiNode = (nodeRow, nodeCol, rowDiff, colDiff) => {
    if (nodeRow < maxRow && nodeRow > -1 && nodeCol < maxCol && nodeCol > -1) {
        if (!antinodePositions.some(pos => pos.row === nodeRow && pos.col === nodeCol)) {
            antinodePositions.push({row: nodeRow, col: nodeCol})
        }
        return doRecursiveAntiNode(nodeRow + rowDiff, nodeCol + colDiff, rowDiff, colDiff)
    }
}

const doScan2 = (symbolToScan, symbolRow, symbolCol) => {
    rows.forEach((row, rowIndex) => {
        const entries = row.split('')

        entries.forEach((entry, colIndex) => {
            if (entry === symbolToScan) {
                const rowDiff = symbolRow - rowIndex
                const colDiff = symbolCol - colIndex

                if (rowDiff !== 0 && colDiff !== 0) {
                    antinodePositions.push({row: symbolRow, col: symbolCol})
                }
            }
        })
    })
}

const doScan = (symbolToScan, symbolRow, symbolCol) => {
    rows.forEach((row, rowIndex) => {
        const entries = row.split('')

        entries.forEach((entry, colIndex) => {
            if (entry === symbolToScan) {
                const rowDiff = symbolRow - rowIndex
                const colDiff = symbolCol - colIndex

                if (rowDiff !== 0 && colDiff !== 0) {
                    const nodeRow = symbolRow + rowDiff
                    const nodeCol = symbolCol + colDiff

                    // if (antinodePositions.filter(pos => (pos.row === symbolRow) && (pos.col === symbolCol)).length === 0) {
                    // antinodePositions.push({row: symbolRow, col: symbolCol})
                    // }

                    return doRecursiveAntiNode(nodeRow, nodeCol, rowDiff, colDiff)
                }
            }
        })
    })
}

rows.forEach((row, rowIndex) => {
    const entries = row.split('')

    entries.forEach((entry, colIndex) => {
        if (entry !== '.') {
            doScan(entry, rowIndex, colIndex)
        }
    })
})

rows.forEach((row, rowIndex) => {
    const entries = row.split('')

    entries.forEach((entry, colIndex) => {
        if (entry !== '.') {
            doScan2(entry, rowIndex, colIndex)
        }
    })
})

const unique = antinodePositions.reduce((acc, obj) => {
    if (!acc.some(o => o.row === obj.row && o.col === obj.col)) {
        acc.push(obj);
    }
    return acc;
}, []);

console.log("unique", unique.length)