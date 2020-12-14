const fs = require("fs");
const file = fs.readFileSync("./adapter_array.txt").toString("utf-8");
// const file = fs.readFileSync("./test.txt").toString("utf-8");
const rows = file.split("\n");

const part_1 = function () {
  const sorted = rows.sort((a, b) => a - b);
  const diff = mapDiff(sorted);
  return diff["1"] * diff["3"];
};

const mapDiff = function (array) {
  const map = {};
  //Loops through array to map differences
  for (let i = 1; i < array.length; i++) {
    if (map[array[i] - array[i - 1]]) {
      map[array[i] - array[i - 1]]++;
    } else {
      map[array[i] - array[i - 1]] = 1;
    }
  }
  //Handle first adapter to outlet diff
  map[array[1] - array[0]]++;
  //Handle last adapter to device built in adapter diff
  map["3"]++;
  return map;
};

const part_2 = function () {
  const sorted = rows.sort((a, b) => a - b).map(element => Number(element));
  // console.log(sorted);
  //const map = mapAll(sorted);
  // let routes = 0;
  const solution = routes(sorted);
  return solution;
};

const mapAll = function (array) {
  const map = {};
  for (let i = 0; i < array.length; i++) {
    map[i] = find3(array, i);
  }
  // console.log(map);
};

const find3 = function (array, index) {
  let end = index + 1;
  while (array[index] && array[end] - array[index] <= 3) {
    end++;
  }
  return end - index - 1;
};

const routes = function (array) {
  const ways = {};
  ways[0] = 1;
  array.unshift(0);
  array.push(array[array.length-1]+3)
  // console.log(array);
  for(let  i= 1; i < array.length; i++){
    // ways[i] = 0;
    // console.log(ways);
    // console.log(ways[array[i]-3])
    ways[array[i]] = (ways[array[i]-1] || 0) + (ways[array[i]-2] || 0) + (ways[array[i]-3] || 0);
  }
  return ways;
};
// console.log(part_1())
console.log(part_2());
