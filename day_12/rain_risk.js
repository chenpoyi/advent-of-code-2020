const fs = require("fs");
const file = fs.readFileSync("./rain_risk.txt").toString("utf-8");
// const file = fs.readFileSync("./test.txt").toString("utf-8");
const rows = file.split("\n");

const part_1 = function () {
  let position = {
    x: 0,
    y: 0,
    face: 1,
  };
  const directions = ["N", "E", "S", "W"];
  const parse = rows.map((row) => {
    const direction = row[0];
    const value = Number(row.substring(1, row.length));
    return [direction, value];
  });
  //console.log(parse);

  for (let instruction of parse) {
    //console.log(instruction);
    switch (instruction[0]) {
      case "N":
        position.y += instruction[1];
        break;
      case "S":
        position.y -= instruction[1];
        break;
      case "W":
        position.x -= instruction[1];
        break;
      case "E":
        position.x += instruction[1];
        break;
      case "R":
        position.face = (position.face + 4 + instruction[1] / 90) % 4;
        break;
      case "L":
        position.face = (position.face + 4 - instruction[1] / 90) % 4;
        break;
      case "F":
        position = forward(position, instruction[1]);
      default:
        break;
    }
  }

  return Math.abs(position.x) + Math.abs(position.y);
};

const part_2 = function () {
  const position = {
    x: 0,
    y: 0,
  };
  const waypoint = {
    x: 10,
    y: 1,
  };
  const parse = rows.map((row) => {
    const direction = row[0];
    const value = Number(row.substring(1, row.length));
    return [direction, value];
  });

  for (let instruction of parse) {
    console.log(instruction);
    console.log(position);
    console.log(waypoint);
    let times = 0;
    switch (instruction[0]) {
      case "N":
        waypoint.y += instruction[1];
        break;
      case "S":
        waypoint.y -= instruction[1];

        break;
      case "W":
        waypoint.x -= instruction[1];

        break;
      case "E":
        waypoint.x += instruction[1];

        break;
      case "R":
        while(times < instruction[1]/90){
          const temp = waypoint.x;
          waypoint.x = waypoint.y;
          waypoint.y = -temp;
          times++;
        }
        break;
      case "L":
        while(times < instruction[1]/90){
          const temp = waypoint.x;
          waypoint.x = -waypoint.y;
          waypoint.y = temp;
          times++;
        }
        break;
      case "F":
        position.x += instruction[1] * waypoint.x;
        position.y += instruction[1] * waypoint.y;
        break;

      default:
        break;
    }
  }
  return Math.abs(position.x) + Math.abs(position.y);
};

const forward = function (position, steps) {
  switch (position.face) {
    case 0:
      position.y += steps;
      break;
    case 1:
      position.x += steps;
      break;
    case 2:
      position.y -= steps;
      break;
    case 3:
      position.x -= steps;
      break;
  }
  return position;
};

// console.log(part_1());
console.log(part_2());
