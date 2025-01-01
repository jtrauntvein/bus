const { DFlipFlop } = require("../DFlipFlop");
const { describe, test, expect } = require("@jest/globals");

describe("tests for D type Flip Flop", () => {
   test("sets data only on rising edge of the clock", () => {
      const cell = new DFlipFlop();
      const initial_state = cell.evaluate();
      const set_state = [ !initial_state[0] ];
      let last_state;
      last_state = cell.set_d(true);
      expect(last_state).toEqual(initial_state);
      last_state = cell.set_clock(true);
      expect(last_state).toEqual(set_state);

      // any future transition has to be on the rising edge of the clock.  D will be ignored and lowering the clock
      // should also be ignored
      last_state = cell.set_d(false);
      expect(last_state).toEqual(set_state);
      last_state = cell.set_clock(false);
      expect(last_state).toEqual(set_state);
   });
});