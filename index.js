const { DFlipFlop } = require("./DFlipFlop.js");
const { EdgeDetector } = require("./EdgeDetector.js");
const { TriStateBuffer } = require("./TriStateBuffer.js");
const BasicGates = require("jhtrauntvein-basic-logic-gates");

module.exports = {
   DFlipFlop,
   EdgeDetector,
   TriStateBuffer,
   ...BasicGates
};