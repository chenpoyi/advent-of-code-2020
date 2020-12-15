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

const part_2 = function(){
  const schedule = rows[1].split(',').map((element, index) => element === 'x' ? ['x'] : [Number(element), index]).filter(element => element[0] != 'x');
  let departure = 152682;
  console.log(schedule);
  while(true){
    if(check(schedule, departure)){
      return departure * schedule[0][0];
    }
    console.log(departure * schedule[0][0]);
    departure++;
  }
}

// const part_2 = function(){
//   const schedule = rows[1].split(',').map(element => element === 'x' ? 'x' : Number(element));
//   let departure = 152682;
//   console.log(schedule);
//   schedule.forEach(([busNumber, index]) => {
//     if(busNumber != 'x'){
        
//     }
//   })
// }
const check = function(schedule, departure){
  for(let i = 1; i < schedule.length; i++){
    const first = schedule[0][0];
    // console.log('first: ', first);
    // console.log('departure: ', departure);
    // console.log('i: ', i);
    // console.log('timestamp: ', (first * departure+i)%schedule[i])
    if(!((first * departure+schedule[i][1])%schedule[i][0] === 0)){
      // console.log('hi');
      return false;
    }
  }
  return true;
}
// console.log(part_1());
console.log(part_2());