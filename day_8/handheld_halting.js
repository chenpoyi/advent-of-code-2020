const fs = require("fs");
const file = fs.readFileSync("./handheld_halting.txt").toString("utf-8");
const rows = file.split("\n");

const part_1 = function(){
  const newArray = process(rows)
  return accumulate(newArray);  
};

const process = function(array){
  const processed = array.map((row)=>{
    console.log(row);
    const obj = {};
    obj.type = row.split(' ')[0];
    obj.number = Number(row.split(' ')[1]);
    obj.visited = false;
    return obj;
  })
  return processed;
}

const accumulate = function(array){
  let accumulator = 0;
  let index = 0;
  while(!array[index].visited){
    switch (array[index].type) {
      case 'acc':
        accumulator += array[index].number;
        array[index].visited = true;
        index++;
        break;
      case 'jmp':
        
        array[index].visited = true;
        index += array[index].number;
        break;
      case 'nop':
        array[index].visited = true;
        index++;
        break;
      default:
        break;
    }
  }
  return accumulator;
}
console.log(part_1());