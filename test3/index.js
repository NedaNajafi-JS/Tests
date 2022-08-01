const assert = require("chai").assert;

const positions = [
  { a: ["C", 2], b: ["D", 4], canAttack: true },
  { a: ["F", 7], b: ["E", 5], canAttack: true },
  { a: ["C", 2], b: ["A", 1], canAttack: true },
  { a: ["A", 6], b: ["B", 4], canAttack: true },
  { a: ["A", 6], b: ["B", 5] },
  { a: ["C", 2], b: ["C", 2] },
  { a: ["A", -1], b: ["B", 1] },
  { a: ["D", 4], b: ["E", 5] },
];

// implement this method to test if two knights threaten eachother

//65 is ASCII code for 'A' and 72 is for 'H'
//Assuming that the chess board indexes on the X-axis start from A to H
//and indexes on the Y-axis start from 1 to 8,
//any position out of this range is invalid
// I prefered to use range method from lodash module, however I prefered not to install any extra modules
const positionIsInBoard = (x, y) => (x.charCodeAt() >= 65 && x.charCodeAt() <= 72) && (y >= 1 && y <= 8);
const areEqual = position1 => position2 => position1.every((value, index) => value === position2[index]);

//For each position, there exists at most 8 threatening positions
//For a knight, they are calculated as provided
const threateningPositionsForKnight = (x, y) => {
  const xAsciiNumber = x.charCodeAt();
  return [
    [String.fromCharCode(xAsciiNumber - 1), y + 2],
    [String.fromCharCode(xAsciiNumber + 1), y + 2],
    [String.fromCharCode(xAsciiNumber - 2), y + 1],
    [String.fromCharCode(xAsciiNumber + 2), y + 1],
    [String.fromCharCode(xAsciiNumber - 2), y - 1],
    [String.fromCharCode(xAsciiNumber + 2), y - 1],
    [String.fromCharCode(xAsciiNumber - 1), y - 2],
    [String.fromCharCode(xAsciiNumber + 1), y - 2],
  ].filter(position => positionIsInBoard(...position));
}

const canAttack = (a, b) => {
  if (!positionIsInBoard(...a) || !positionIsInBoard(...b)) {
    //One of the knights or both are not in valid positions on the board, they might be out of board
    //So they can not attack eachother
    return false;
  }

  const threateningPositionsFor_a = threateningPositionsForKnight(...a);
  return threateningPositionsFor_a.some(areEqual(b));//Check if b is equal to any calculated threatening positions
};

positions.forEach((test) => {
  try {
    assert.equal(canAttack(test.a, test.b), !!test.canAttack);
  } catch (e) {
    console.error("FAILED", test);
  }
});
