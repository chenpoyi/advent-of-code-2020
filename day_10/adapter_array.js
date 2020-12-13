const fs = require("fs");
const file = fs.readFileSync("./adapter_array.txt").toString("utf-8");
const rows = file.split("\n");

const part_1 = function(){
  const sorted = rows.sort((a,b) => a- b);
  const diff = mapDiff(sorted);
  return diff['1'] * diff['3']
}

const mapDiff = function(array){
  const map = {};
  //Loops through array to map differences
  for(let i = 1; i < array.length; i++){
    if(map[array[i] - array[i-1]]){
       map[array[i] - array[i-1]]++;
    } else {
      map[array[i] - array[i-1]] = 1;
    }
   
  }
  //Handle first adapter to outlet diff
  map[array[1]-array[0]]++;
  //Handle last adapter to device built in adapter diff
  map['3']++;
  return map;
}
console.log(part_1())