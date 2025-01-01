const { EdgeDetector } = require("../EdgeDetector");
const { describe, test, expect } = require("@jest/globals");

describe("edge detector pulses output on transition from low to high", () => {
   test("steady state is always false", () => {
      const detector = new EdgeDetector();
      const initial_state = detector.evaluate();
      let last_state;
      expect(initial_state[0]).toEqual(false);
      last_state = detector.set(true, 0);
      expect(last_state).toEqual(initial_state);
      last_state = detector.set(false, 0);
      expect(last_state).toEqual(initial_state);
   });

   test("output pulses on rising edge", () => {
      const detector = new EdgeDetector();
      const transitions = [ detector.evaluate()[0] ];
      detector.on((value) => transitions.push(value));
      detector.set(true, 0);
      expect(transitions).toEqual([ false, true, false ]);
      detector.set(false, 0);

      // there should be no additional transitions on the falling edge
      expect(transitions).toEqual([ false, true, false, false, false ]);
   });
});
