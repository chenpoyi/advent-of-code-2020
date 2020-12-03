const fs = require("fs");
const file = fs.readFileSync("./password_philosophy.txt").toString("utf-8");
const rows = file.split("\n");
console.log(rows.length)

const process = function(array){
  let newArray = rows.map((row)=>{
    row =row.split(" "); 
    row[0] = row[0].split("-")
    row[1] = row[1].slice(0, -1)
    
    return row;
  
  });
  return newArray;
}

const part_1 = function(){
  let valid = 0;
  //console.log(rows);
  const array = process(rows);
  for(let row of array){
    const frequency = getFrequency(row);
    if(frequency >= row[0][0] && frequency <= row[0][1]){
      valid++;
    }
  }
  return valid;
}

const getFrequency = function(row){
  const frequencies = count(row[2]);
  return frequencies[row[1]];

};

const count = function (string){
  const total = {};
  for(let char of string){
    if(total[char]){
      total[char]++
    } else {
      total[char] = 1;
    }
  }
  return total;
}


const part_2 = function(){
  let valid = 0;
  const array = process(rows);
  for( let row of array){
    const pos1 = row[0][0];
    const pos2 = row[0][1];
    const letter = row[1];
    if((row[2][pos1-1] == letter || row[2][pos2-1] === letter)&&!(row[2][pos1-1] == letter && row[2][pos2-1] === letter)){
        valid++;
    }   
  }
  return valid
}

console.log(part_1());
console.log(part_2());

// console.log(count('aabbcde'));