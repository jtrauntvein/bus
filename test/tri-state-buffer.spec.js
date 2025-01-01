const { TriStateBuffer } = require("../TriStateBuffer");
const { describe, test, expect } = require("@jest/globals");

describe("tests for tri-state latch", () => {
   test("output called only when expected", () => {
      const buffer = new TriStateBuffer();
      let output_count = 0;
      let results;

      buffer.on((value) => ++output_count);
      results = buffer.set(true, 0); // set the input while output is disabled
      expect(output_count).toEqual(0);
      expect(results[0]).toBeTruthy();
      results = buffer.set(true, 1); // set output enable
      expect(output_count).toEqual(1);
      expect(results[0]).toBeTruthy();
      results = buffer.set(false, 1);
      expect(output_count).toEqual(1);
      expect(results[0]).toBeTruthy();
      results = buffer.set(false, 0);
      expect(output_count).toEqual(1);
   });
});