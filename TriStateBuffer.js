const { TruthTableGate } = require("jhtrauntvein-basic-logic-gates");

/**
 * @type {@import("jhtrauntvein-basic-logic-gates").GateInterface} implements the gate interface
 * with two inputs: I (0) and ENABLE (1)
 */
class TriStateBuffer extends TruthTableGate {
   /**
    * Constructor
    */
   constructor() {
      const truth_table = [
         { inputs: [ false, false ], outputs: [ false ]},
         { inputs: [ false, true ], outputs: [ false ]},
         { inputs: [ true, false ], outputs: [ true ]},
         { inputs: [ true, true ], outputs: [ true ]},
      ];
      super(truth_table);
   }

   /**
    * @return {boolean} Overrides the base class version to return the value of input channel 1 (enable)
    */
   output_enabled() {
      return this.get_input(1);
   }
};

module.exports = {
   TriStateBuffer
}