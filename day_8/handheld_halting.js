const fs = require("fs");
const file = fs.readFileSync("./handheld_halting.txt").toString("utf-8");
const rows = file.split("\n");

const part_1 = function () {
  const newArray = process(rows);
  return accumulate(newArray);
};

const part_2 = function () {
  const list = process(rows);
  for(let index in list){
    if(list[index].type === 'jmp'){
      const newList = JSON.parse(JSON.stringify(list));

      newList[index].type = 'nop';
      
      const solution = validCheck(newList)
      if(solution){
        return solution;
      }
    } else if(list[index].type==='nop' && list[index].number != 0){
      const newList = JSON.parse(JSON.stringify(list));
      newList[index].type = 'jmp';
      const solution = validCheck(newList)
      if(solution){
        return solution;
      }
    }
  }
 
};

const process = function (array) {
  const processed = array.map((row) => {
    // console.log(row);
    const obj = {};
    obj.type = row.split(" ")[0];
    obj.number = Number(row.split(" ")[1]);
    obj.visited = false;
    return obj;
  });
  return processed;
};

const accumulate = function (array) {
  let accumulator = 0;
  let index = 0;
  while (!array[index].visited) {
    switch (array[index].type) {
      case "acc":
        accumulator += array[index].number;
        array[index].visited = true;
        index++;
        break;
      case "jmp":
        array[index].visited = true;
        index += array[index].number;
        break;
      case "nop":
        array[index].visited = true;
        index++;
        break;
      default:
        break;
    }
  }
  return accumulator;
};

const validCheck = function(array) {
  let index = 0;
  let accumulator = 0;
  while(index != array.length){
    if(!array[index]){
      return accumulator
    }
    if(array[index].visited){
      return false;
    } 
    switch (array[index].type) {
      case "acc":
        accumulator += array[index].number;
        array[index].visited = true;
        index++;
        break;
      case "jmp":
        array[index].visited = true;
        index += array[index].number;
        break;
      case "nop":
        array[index].visited = true;
        index++;
        break;
      default:
        break;
    }
  }
  return accumulator;
}

// console.log(part_1());
console.log(part_2());
