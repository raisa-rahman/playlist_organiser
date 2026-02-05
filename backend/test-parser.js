const fs = require('fs');

// Read the mock file
const rawData = fs.readFileSync('./data/mock_history.json');
const streams = JSON.parse(rawData);

console.log(`--- Day 2: Data Analysis Test ---`);
console.log(`Total streams found: ${streams.length}`);

const totalMinutes = streams.reduce((acc, stream) => acc + (stream.ms_played / 1000 / 60), 0);
console.log(`Total Listening Time: ${totalMinutes.toFixed(2)} minutes`);

// Count Skips (based on 'fwdbtn' or 'skipped' field)
const skipCount = streams.filter(s => s.skipped === true || s.reason_end === 'fwdbtn').length;
console.log(`Total Skips: ${skipCount}`);