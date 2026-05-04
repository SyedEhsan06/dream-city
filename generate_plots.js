const fs = require('fs');

const generatePlots = () => {
  const plots = [];
  
  // A plots: A-101 to A-308
  for (let i = 101; i <= 308; i++) plots.push(`A-${i}`);
  // RA plots: RA-101 to RA-308
  for (let i = 101; i <= 308; i++) plots.push(`RA-${i}`);
  // B plots: B-101 to B-486
  for (let i = 101; i <= 486; i++) plots.push(`B-${i}`);
  // RB plots: RB-101 to RB-406
  for (let i = 101; i <= 406; i++) plots.push(`RB-${i}`);
  // C plots: C-101 to C-580
  for (let i = 101; i <= 580; i++) plots.push(`C-${i}`);
  // RC plots: RC-101 to RC-330
  for (let i = 101; i <= 330; i++) plots.push(`RC-${i}`);
  
  const content = `export const REAL_PLOTS = ${JSON.stringify(plots, null, 2)};\n`;
  fs.writeFileSync('src/data/plots.ts', content);
  console.log('Generated src/data/plots.ts with ' + plots.length + ' plots.');
};

generatePlots();
