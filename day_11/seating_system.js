const fs = require("fs");
// const file = fs.readFileSync("./seating_system.txt").toString("utf-8");
const file = fs.readFileSync("./test.txt").toString("utf-8");

const rows = file.split("\n");
const inputArray = rows.map((row) => row.split(""));

const part_1 = function (array) {
  let swapped = true;
  let iterations = 0
  while (iterations < 10) {
    console.log('iterate')
    swapped = false;
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        if(array[i][j]!='.'){
          if(checkAdjacents(i, j, array)){
            swapped = true;
          };
          console.log('swapped: ', swapped)
        }
        
      }
    }
    iterations++;
  };
  let occupied = 0;
  
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if(array[i][j] === '#'){
        occupied++;
      }
    }
  }
  return occupied;
};

const checkAdjacents = function (i, j, array) {
  let occupied = 0;
  if (array[i - 1]) {
    if (array[i - 1][j - 1] && array[i - 1][j - 1] === "#") {
      occupied++;
    }
    if (array[i - 1][j] && array[i - 1][j] === "#") {
      occupied++;
    }
    if (array[i - 1][j + 1] && array[i - 1][j + 1] === "#") {
      occupied++;
    }
  }

  if (array[i][j - 1] && array[i][j - 1] === "#") {
    occupied++;
  }
  if (array[i][j + 1] && array[i][j + 1] === "#") {
    occupied++;
  }
  if (array[i + 1]) {
    if (array[i + 1][j - 1] && array[i + 1][j - 1] === "#") {
      occupied++;
    }
    if (array[i + 1][j] && array[i + 1][j] === "#") {
      occupied++;
    }
    if (array[i + 1][j + 1] && array[i + 1][j + 1] === "#") {
      occupied++;
    }
  }
console.log('occupied:',occupied)
  if (array[i][j] === "L") {
    if (occupied === 0) {
      array[i][j] = "#";
      
      return true;
    }
  } else if (array[i][j] === "#") {
    if (occupied >= 4) {
      array[i][j] = "L";
      return true;
    }
  }
  return false;
};
console.log(part_1(inputArray));
