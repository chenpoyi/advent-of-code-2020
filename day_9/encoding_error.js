const fs = require("fs");
const file = fs.readFileSync("./encoding_error.txt").toString("utf-8");
const rows = file.split("\n");

const part_1 = function(){
  for(let index = 25; index < rows.length; index++) {
    const subArray = rows.slice(index-25, index);
    if(!checkSum(subArray,rows[index])){
      return rows[index];
    }
  }

}

const checkSum = function(array, number){
  for(let entry of array){
    if(array.find(element => element == number - entry)){
      return true;
    }
  }
  return false;
}

console.log(part_1())