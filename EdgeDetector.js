const { NotGate, AndGate, connect_gates } = require("jhtrauntvein-basic-logic-gates");

/**
 * @typedef EdgeDetector
 * @class {@import("jhtrauntvein-basic-logic-gates").GateInterface} 
 */
class EdgeDetector {
   #inverter;
   #output;

   constructor() {
      this.#inverter = new NotGate();
      this.#output = new AndGate();
      connect_gates(this.#inverter, 0, this.#output, 1);
   }

   /**
    * We will implement our own set() method but the return value will be the circuit steady state.
    * we are more interested in the intermediate transition that will momentarily pulse the output
    * when the input is set.
    * @param {boolean} value specifies the input value
    */
   set(value, channel) {
      this.#output.set(value, 0);
      this.#inverter.set(value, 0);
      return this.evaluate();
   }

   on(handler, channel) {
      this.#output.on((value) => {
         handler(value, 0, this);
      })
   }

   /**
    * 
    * @returns {boolean[]} will always return the steady state of the device which is false.  
    */
   evaluate() {
      return this.#output.evaluate();
   }
}

module.exports = {
   EdgeDetector
};
