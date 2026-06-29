import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = readFileSync("lib/validations/date-time.ts", "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
});
const exportsObject = {};
const sandbox = {
  exports: exportsObject,
  module: { exports: exportsObject },
};

vm.runInNewContext(transpiled.outputText, sandbox, {
  filename: "lib/validations/date-time.ts",
});

const {
  birthDateInputToIsoDate,
  isValidBirthDate,
  normalizeBirthDateInput,
} = sandbox.module.exports;

const validCases = [
  "18/07/1995",
  "18/7/1995",
  "18071995",
  "18-07-1995",
  "18.07.1995",
];

for (const value of validCases) {
  assert.equal(normalizeBirthDateInput(value), "18/07/1995");
  assert.equal(isValidBirthDate(value), true);
  assert.equal(birthDateInputToIsoDate(value), "1995-07-18");
}

const invalidCases = [
  "31/02/1995",
  "29/02/1995",
  "00/07/1995",
  "18/13/1995",
  "18/07/1899",
  "18/07/2101",
  "1807199",
];

for (const value of invalidCases) {
  assert.equal(isValidBirthDate(value), false);
}

assert.equal(isValidBirthDate("29/02/1996"), true);
assert.equal(normalizeBirthDateInput("29/2/1996"), "29/02/1996");

process.stdout.write("Date-time validation passed\n");
