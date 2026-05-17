const fs = require("fs");

const COLS = 40;
// 1 top highway + 6 blocks * 12 rows + 5 internal roads + 1 bottom highway
const ROWS = 1 + 6 * 12 + 5 + 1;

const matrix = Array.from({ length: ROWS }, () => Array(COLS).fill("EMPTY"));

// Define x-coordinates for blocks
// 3 A blocks, 5 B blocks, 5 C blocks
const blocksX = [
  { prefix: "A", cols: [1, 2] },
  { prefix: "A", cols: [4, 5] },
  { prefix: "A", cols: [7, 8] },
  { prefix: "B", cols: [10, 11] },
  { prefix: "B", cols: [13, 14] },
  { prefix: "B", cols: [16, 17] },
  { prefix: "B", cols: [19, 20] },
  { prefix: "B", cols: [22, 23] },
  { prefix: "C", cols: [25, 26] },
  { prefix: "C", cols: [28, 29] },
  { prefix: "C", cols: [31, 32] },
  { prefix: "C", cols: [34, 35] },
  { prefix: "C", cols: [37, 38] },
];

// Fill Roads
// Vertical roads at 0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39
for (let y = 0; y < ROWS; y++) {
  for (let x = 0; x < COLS; x += 3) {
    if (x === 39)
      matrix[y][x] = "ROAD"; // 39 is edge
    else matrix[y][x] = "ROAD";
  }
}

// Horizontal roads
// Rows: 0 (highway), 13, 26, 39, 52, 65, 78 (highway)
const hRoads = [0, 13, 26, 39, 52, 65, 78];
for (let y of hRoads) {
  for (let x = 0; x < COLS; x++) {
    matrix[y][x] = "ROAD";
  }
}

// Fill Plots sequentially as a rough approximation
// The user said they will change it, so we just need to populate the valid plot cells.
let aIdx = 101,
  bIdx = 101,
  cIdx = 101;

for (let blockRow = 0; blockRow < 6; blockRow++) {
  const startY = 1 + blockRow * 13; // 12 plots + 1 road

  for (let b = 0; b < blocksX.length; b++) {
    const bDef = blocksX[b];
    const leftX = bDef.cols[0];
    const rightX = bDef.cols[1];

    // Fill 12 rows of the block
    for (let r = 0; r < 12; r++) {
      const y = startY + r;
      if (bDef.prefix === "A") {
        matrix[y][leftX] = `A-${aIdx++}`;
        matrix[y][rightX] = `A-${aIdx++}`;
      } else if (bDef.prefix === "B") {
        matrix[y][leftX] = `B-${bIdx++}`;
        matrix[y][rightX] = `B-${bIdx++}`;
      } else {
        matrix[y][leftX] = `C-${cIdx++}`;
        matrix[y][rightX] = `C-${cIdx++}`;
      }
    }
  }
}

const content = JSON.stringify(matrix, null, 2);
fs.writeFileSync("src/data/layoutMatrix.json", content);
console.log("Matrix generated: 40x79. Saved to src/data/layoutMatrix.json");
