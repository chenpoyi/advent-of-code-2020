const fs = require("fs");
const file = fs.readFileSync("./handy_haversacks.txt").toString("utf-8");
const rows = file.split("\n");

const part_1 = function () {
  let colors = [];
  const newArray = process(rows);

  colors.push(...search(newArray, "shiny gold"));
  const uniqueColors = [];
  colors.forEach((color)=>{
    if(!uniqueColors.find(element => element === color)){
      uniqueColors.push(color)
    }
  })
  return uniqueColors.length;
};
const process = function (array) {
  return array.map((row) => {
    const obj = {};
    const split = row.split(" bags contain ");
    const parent = split[0];
    const children = split[1].split(", ").map((child) => {
      return child.split(/ (.+)/)[1].split(" bag")[0];
    });
    obj.parent = parent;
    obj.children = children;
    return obj;
  });
};

const search = function (array, color) {
  let colors = [];
  array.forEach((obj) => {
    if (obj.children.find((child) => child === color)) {
      colors.push(obj.parent);
    }
  });
  let newColors = [];
  colors.forEach((newColor)=>{

    newColors.push(...search(array, newColor));
  })
  colors = colors.concat(newColors)
  return colors;
};

const part_2 = function(){
    const bagsMap = process2(rows);
    return countTotal('shiny gold', bagsMap);
};

const process2 = function(array){
  const map = {};
  array.forEach((row)=>{
    // console.log(row)

    const split = row.split(' bags contain ')
    const parent = split[0];
    const obj = {};
    split[1].split(", ").forEach((child) => {
      const number = child.substr(0,child.indexOf(' '));
      const color = child.substr(child.indexOf(' ')+1).substr(0, child.substr(child.indexOf(' ')+1).indexOf(' bag'));
      // const obj = {};
      obj[color] = number;
      
    });
    map[parent] = obj;
    
  })
  return map;
}

const countTotal = function(color, map){
  let count = 0;
  
  for(let child in map[color]){

    if(Object.keys(map[child])[0] === 'other'){
      count += Number(map[color][child]);
    } else {
      count+= Number(map[color][child]) + Number(map[color][child]) * countTotal(child, map)
    }
   
  }
  return count;

}

console.log(part_1());
console.log(part_2());

