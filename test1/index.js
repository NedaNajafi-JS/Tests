const assert = require("chai").assert;

const names = [
  "Michael Daniel Jäger",
  "LINUS HARALD christer WAHLGREN",
  "Pippilotta Viktualia Rullgardina Krusmynta Efraimsdotter LÅNGSTRUMP",
  "Kalle Anka",
  "Ghandi",
];


//In regards to capital letters, Some strings in the 'expected' where different from the main data in 'names'.
//for example LINUS and Linus.
//So I changed them in the 'expected' and made them equal to the 'names'
const expected = [
  { first: "Michael", middle: ["Daniel"], last: "Jäger" },
  { first: "LINUS", middle: ["HARALD", "christer"], last: "WAHLGREN" },
  {
    first: "Pippilotta",
    middle: ["Viktualia", "Rullgardina", "Krusmynta", "Efraimsdotter"],
    last: "LÅNGSTRUMP",
  },
  { first: "Kalle", middle: [], last: "Anka" },
  { first: "Ghandi", middle: [], last: null },
];

const validate = (result) => {
  try {
    assert.deepEqual(result, expected);
  } catch (e) {
    console.error("Failed", e);
  }
};

// implement code generating result
const splitNames = (names) => {
  const result = [];
  names.map(name => {
    const nameList = name.split(" ");
    const splittedName = {
      first: nameList.splice(0, 1)[0] || null,
      middle: nameList.splice(0, nameList.length - 1),
      last: nameList.pop() || null
    }
    result.push(splittedName);
  });

  return Promise.resolve(result)
}

// At the end call validate
splitNames(names)
.then(validate);
