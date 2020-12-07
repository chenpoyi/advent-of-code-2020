const { count } = require("console");
const fs = require("fs");
const file = fs.readFileSync("./custom_customs.txt").toString("utf-8");
const rows = file.split("\n\n");

const part_1 = function(){
  const newArray = rows.map((row)=>{
    const combined =  row.split('\n').join('');
    return frequency(combined);
  });
  return newArray.reduce((a,b)=> a+b, 0);
}

const part_2 = function(){
  const newArray = rows.map((row)=>{
    const group =  row.split('\n');
    console.log(group);
    return common(group);
  })
  return newArray.reduce((a,b)=> a+b, 0);
}

const frequency = function(group){
  let map = {};
  for(let letter of group){
    // console.log(letter);
    if(map[letter]){
      map[letter]++;
    } else {
      map[letter] = 1;
    }
  }
  return Object.keys(map).length;

}

const common = function(group) {
  let map = {};
  console.log('group: ', group)
  group.forEach((person)=>{
    for(let letter of person){
      // console.log(letter);
      if(map[letter]){
        map[letter]++;
      } else {
        map[letter] = 1;
      }
  }
  
  });

  console.log('map: ', map);
  let count = 0;
  for(const letter in map){
    console.log('map letter: ', map[letter])
    if(map[letter] === group.length){
      count++
    }
  }
  return count;
}

// console.log(part_1());
console.log(part_2());