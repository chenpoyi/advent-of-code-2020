const fs = require("fs");
const file = fs.readFileSync("./handy_haversacks.txt").toString("utf-8");
const rows = file.split("\n");

const part_1 = function () {
  //console.log(rows)
  let colors = [];
  const newArray = process(rows);

  //console.log(newArray);
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
  //return obj;
};

const search = function (array, color) {
  let colors = [];
  // console.log('array: ', array);
  // console.log('color: ', color)
  array.forEach((obj) => {
    //console.log(obj.children);
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
console.log(part_1());
