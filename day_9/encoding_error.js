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

const part_2 = function(){
  const sum = part_1();
  const numArray = rows.map(element => Number(element));
  return checkContiguous(numArray, sum);
}

const checkSum = function(array, number){
  for(let entry of array){
    if(array.find(element => element == number - entry)){
      return true;
    }
  }
  return false;
}

const checkContiguous = function(array, number){
  let sum = array[0] + array[1];
  let start = 0;
  let end = 1;
  while(sum != number && end < array.length){
    
    if(number > sum){
      end++;
      sum += array[end];
    } else if (number < sum){
      sum -= array[start];
      start++;
    }

  }
 

  const subArray = array.slice(start, end + 1).sort((a,b) => a -b);

  return subArray[0] + subArray[subArray.length - 1];
}

console.log(part_1())
console.log(part_2())