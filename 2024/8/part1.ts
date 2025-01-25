const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8");
const rows = data.split("\n")
const maxRow = rows.length
const maxCol = rows[0].split('').length
let antinodePositions = []

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

                    if (nodeRow < maxRow && nodeRow > -1 && nodeCol < maxCol && nodeCol > -1)
                        if (antinodePositions.some(pos => pos.row === nodeRow && pos.col === nodeCol)) {
                            return;
                        } else {
                            antinodePositions.push({row: nodeRow, col: nodeCol})
                        }
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

console.log("antinode", antinodePositions.length)