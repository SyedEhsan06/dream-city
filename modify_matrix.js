const fs = require("fs");
const path = "./src/data/layoutMatrix.json";
let matrix = JSON.parse(fs.readFileSync(path, "utf8"));

// The grid is 40 cols x 79 rows.
// Let's turn a large chunk into a PARK.
// Row 14 to 25 (12 rows), Col 28 to 35 (8 cols) -> 12x8 massive Park
for (let y = 14; y <= 25; y++) {
  for (let x = 28; x <= 35; x++) {
    // Keep roads as roads if we want, or overwrite them.
    // If we overwrite roads, it becomes a unified mega-park.
    // Let's overwrite everything in this box!
    matrix[y][x] = "PARK";
  }
}

// Let's turn another chunk into EMPTY space (white gap)
// Row 40 to 51 (12 rows), Col 10 to 14 (5 cols) -> 12x5 empty gap
for (let y = 40; y <= 51; y++) {
  for (let x = 10; x <= 14; x++) {
    matrix[y][x] = "EMPTY";
  }
}

// Write back
fs.writeFileSync(path, JSON.stringify(matrix, null, 2));
console.log("Added PARK and EMPTY spaces to matrix.");
