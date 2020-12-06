const fs = require("fs");
const file = fs.readFileSync("./passport_processing.txt").toString("utf-8");
const rows = file.split("\n\n");
//console.log(rows)

const part_1 = function () {
  let count = 0;
  rows.map((row) => {
    row = row.match(/\w{3}:/g);
    // console.log(row);
    if (row.length == 8) {
      count++;
    } else if (row.length == 7 && !row.find((element) => element == "cid:")) {
      count++;
    }
    return row;
  });
  // console.log(rows)
  return count;
};

const part_2 = function () {
  let count = 0;
  const newArray = process(rows);
  // console.log(newArray);

  newArray.forEach((element) => {
    if (check(element)) {
      count++;
    } else {
      // console.log(element);
    }
  });

  return count;
};

const process = function (array) {
  array = array.map((row) => {
    const mapObj = {};
    row = row.split(/(\n| )/).map((element) => {
      if (element != " ") {
        element = element.split(":");
        mapObj[element[0]] = element[1];
      }
    });
    return mapObj;
  });
  return array;
};

const check = function (element) {
  // console.log(element["byr"]);
  if (
    element["byr"] &&
    element["iyr"] &&
    element["eyr"] &&
    element["hgt"] &&
    element["hcl"] &&
    element["ecl"] &&
    element["pid"]
  ) {
    if (element["byr"] < 1920 || element["byr"] > 2002) {
      // console.log(element["byr"]);
      return false;
    }
    if (element["iyr"] < 2010 || element["iyr"] > 2020) {
      return false;
    }
    if (element["eyr"] < 2020 || element["eyr"] > 2030) {
      return false;
    }

    if (element["hgt"].endsWith("in")) {
      if (
        element["hgt"].split("in")[0] < 59 ||
        element["hgt"].split("in")[0] > 76
      ) {
        return false;
      }
    }
    if (element["hgt"].endsWith("cm")) {
      if (
        element["hgt"].split("cm")[0] < 150 ||
        element["hgt"].split("cm")[0] > 193
      ) {
        return false;
      }
    }
    if (!element["hgt"].endsWith("cm") && !element["hgt"].endsWith("in")) {
      return false;
    }
    if (!element["hcl"].match(/^(#([0-9]|[a-f]){6})+$/)) {
      return false;
    }
    if (!element["ecl"].match(/^(amb|blu|brn|gry|grn|hzl|oth)+$/)) {
      return false;
    }
    if (!element["pid"].match(/^([0-9]{9})+$/)) {
      return false;
    }

    return true;
  } else {
    // console.log(element);
    return false;
  }
};
console.log(part_2());
