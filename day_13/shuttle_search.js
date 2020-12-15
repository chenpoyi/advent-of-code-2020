const fs = require("fs");
const file = fs.readFileSync("./shuttle_search.txt").toString("utf-8");
// const file = fs.readFileSync("./test.txt").toString("utf-8");
const rows = file.split("\n");

const part_1 = function(){
  const timestamp = rows[0];
  const schedule = rows[1].split(',').filter(element => element != 'x').map(element => Number(element));
  const time = schedule.map(element => [element, element - timestamp % element]).sort( (a, b) => a[1] > b[1]);
  
  return time[0][0] * time[0][1];
};

console.log(part_1());