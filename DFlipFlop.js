const { DLatch, connect_gates } = require("jhtrauntvein-latches");
const { EdgeDetector } = require("./EdgeDetector");

/**
 * Defines a flip flop based upon a D type latch and a rising edge detector
 * driving the clock.
 * @type {@import("jhtrauntvein-basic-logic-gates").GateInterface} implements the gate interface
 */
class DFlipFlop {
   #detector;
   #latch;

   constructor() {
      this.#latch = new DLatch();
      this.#detector = new EdgeDetector();
      connect_gates(this.#detector, 0, this.#latch, 1);
   }

   /**
    * Sets the state of a device input channel
    * @param {boolean} value specifies the value for the input line
    * @param {number} channel specifies the channel to set.  Must be one of:
    * - 0: set the data input
    * - 1: set the clock input
    * @returns {boolean[]} returns a single boolean array that reports the device status
    */
   set(value, channel) {
      if(channel === 0) {
         this.#latch.set_d(value);
      }
      else {
         this.#detector.set(value, 0);
      }
      return this.evaluate();
   }

   /**
    * Sets the value of the data line
    * @param {boolean} value specifies the value to assign
    * @returns {boolean[]} returns a boolean array with one value that reports the device status
    */
   set_d(value) {
      return this.set(value, 0);
   }

   /**
    * Sets the clock input state
    * @param {boolean} value specifies the clock input value
    * @returns {boolean[]} returns a boolean array with one value that reports the device status
    */
   set_clock(value) {
      return this.set(value, 1);
   }

   /**
    * 
    * @param {@import("jhtrauntvein-basic-logic-gates").OutputHandlerType} handler specifies the function that will be called after an input has been changed
    * @param {number?} channel specifies the output channel number.  For this device type, this value should only be zero.
    */
   on(handler, channel = 0) {
      if(channel == 0) {
         this.#latch.on((value) => {
            handler(value, channel, this);
         });
      }
   }

   /**
    * @returns {boolean[]} returns the current device state
    */
   evaluate() {
      return [ this.#latch.evaluate()[0] ];
   }
}

module.exports = {
   DFlipFlop
};
