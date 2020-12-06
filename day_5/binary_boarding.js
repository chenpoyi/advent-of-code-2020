const { captureRejectionSymbol } = require("events");
const fs = require("fs");
const file = fs.readFileSync("./binary_boarding.txt").toString("utf-8");
const rows = file.split("\n");
console.log(rows);

const part_1 = function () {
  // console.log(format(rows));
  const formatted = format(rows)
  return Math.max.apply(Math, formatted.map(function(o){
    return o.seatID
  }))
};

const format = function (array) {
  const newArray = array.map((element) => {
    let start = 0;
    let end = 127;

    let left = 0;
    let right = 7;
    for (let letter of element.substring(0, 7)) {
      //console.log(letter);
      if (letter === "F") {
        end -= (end - start + 1) / 2;
      } else {
        start += (end - start + 1) / 2;
      }
      console.log(`${start} and ${end}`);
    }
    for(let side of element.substring(7,10)){
      if (side === "L") {
        right -= (right - left + 1) / 2;
      } else {
        left += (right - left + 1) / 2;
      }
      console.log(`${left} and ${right}`);
    }
    console.log('---------')
    const obj = {
      ticketNumber: element,
      row: start,
      column: left,
      seatID: start * 8 + left
    }
    return obj;
  });
  return newArray;
};
// console.log(part_1());

const part_2 = function(){
  const formatted = format(rows);
  const seatMap = {};
  formatted.forEach((element)=>{
    seatMap[element.seatID] = true;

  })
  console.log(seatMap);
  let started = false;
  let counter = 0;
  while(started == false){
    console.log(seatMap[counter]);
    if(seatMap[counter]){
      started = true;
    }
    counter++
  }
  while(seatMap[counter]){
    counter++
  }
  return counter;
}
console.log(part_2());
