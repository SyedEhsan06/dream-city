const fs = require('fs');

const oldMatrix = JSON.parse(fs.readFileSync('./src/data/layoutMatrix.json', 'utf8'));
const newItems = [];

for (let y = 0; y < oldMatrix.length; y++) {
  for (let x = 0; x < oldMatrix[y].length; x++) {
    const cell = oldMatrix[y][x];
    if (cell === 'EMPTY') continue; // We will just leave empty cells out of the array
    
    let type = 'plot';
    let color = '';
    
    if (cell === 'ROAD') {
      type = 'road';
    } else if (cell === 'PARK') {
      type = 'park';
    } else {
      type = 'plot';
      if (cell.startsWith('A')) color = '#fca5a5';
      else if (cell.startsWith('B')) color = '#f9a8d4';
      else if (cell.startsWith('C')) color = '#7dd3fc';
    }

    newItems.push({
      id: cell === 'ROAD' ? `road-${x}-${y}` : cell === 'PARK' ? `park-${x}-${y}` : cell,
      type: type,
      x: x,
      y: y,
      w: 1,
      h: 1,
      color: color,
      label: cell === 'ROAD' ? '' : cell === 'PARK' ? 'P' : cell.split('-')[1] || cell
    });
  }
}

fs.writeFileSync('./src/data/mapGrid.json', JSON.stringify(newItems, null, 2));
console.log(`Migrated to mapGrid.json with ${newItems.length} items.`);
