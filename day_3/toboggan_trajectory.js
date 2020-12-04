const fs = require("fs");
const file = fs.readFileSync("./toboggan_trajectory.txt").toString("utf-8");
const rows = file.split("\n");

console.log(rows);

const process = function(){
  let newArray = rows.map((row)=>{
    row =row.split(""); 

    return row;
  
  });
  return newArray;
}

const part_1 = function(right, down){
  const array = process(rows);
  const width = array[0].length;
  const height = array.length;
  console.log(width);
  let count = 0;
  let x = 0;
  let y = 0;
  while(y < height){
    console.log(`${x%width}, ${y}`);
    console.log(array[y][x%width]);
    if(array[y][x%width] === '#'){
      console.log('YES');
      count++;
    }
    x += right;
    y += down;
  }
  return count;
}

const part_2 = function(){
  return part_1(1,1) * part_1(3,1) * part_1(5,1) * part_1(7,1) * part_1(1,2);
}
console.log(part_2());