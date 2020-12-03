const fs = require("fs");
const file = fs.readFileSync("./report_repair.txt").toString("utf-8");
const numbers = file.split("\n");

//console.log(numbers)
const part_1 = function () {
  for (let number of numbers) {
    //console.log (number);
    if (numbers.find((element) => element == 2020 - number)) {
      return number * (2020 - number);
    }
  }
};

const part_2 = function () {
  for (let number of numbers) {
    //console.log (number);
    for (let number2 of numbers) {
      if (numbers.find((element) => element == 2020 - number - number2)) {
        return number * number2 * (2020 - number - number2);
      }
    }
  }
};

console.log(part_1());
console.log(part_2());
