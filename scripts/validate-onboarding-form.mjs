import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const nodeRequire = createRequire(import.meta.url);
const moduleCache = new Map();

function loadTsModule(filePath) {
  if (moduleCache.has(filePath)) {
    return moduleCache.get(filePath);
  }

  const source = readFileSync(filePath, "utf8");
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
    require: (specifier) => {
      if (specifier === "zod") {
        return nodeRequire("zod");
      }

      if (specifier === "./date-time") {
        return loadTsModule("lib/validations/date-time.ts");
      }

      return nodeRequire(specifier);
    },
  };

  vm.runInNewContext(transpiled.outputText, sandbox, {
    filename: filePath,
  });
  moduleCache.set(filePath, sandbox.module.exports);

  return sandbox.module.exports;
}

const { profileFormSchema } = loadTsModule("lib/validations/profile.ts");

function buildValidPayload(overrides = {}) {
  return {
    birthDate: "18/07/1995",
    birthPlace: "",
    birthTime: "",
    calendarType: "solar",
    fullName: "Nguyễn An",
    gender: "MALE",
    mainInterest: "Khám phá bản thân",
    relationshipStatus: "Độc thân",
    ...overrides,
  };
}

const passCases = [
  buildValidPayload({ birthDate: "18/07/1995", calendarType: "solar" }),
  buildValidPayload({ birthDate: "18/07/1995", calendarType: "lunar" }),
  buildValidPayload({ birthDate: "18/7/1995", calendarType: "solar" }),
  buildValidPayload({ birthDate: "18071995", calendarType: "lunar" }),
];

for (const payload of passCases) {
  const parsed = profileFormSchema.safeParse(payload);

  assert.equal(parsed.success, true, JSON.stringify(parsed, null, 2));
  assert.equal(parsed.data.birthDate, "18/07/1995");
  assert.match(parsed.data.calendarType, /^(solar|lunar)$/);
}

const failCases = [
  buildValidPayload({ calendarType: undefined }),
  buildValidPayload({ calendarType: "" }),
  buildValidPayload({ calendarType: "am_lich" }),
  buildValidPayload({ birthDate: "31/02/1995" }),
];

for (const payload of failCases) {
  const parsed = profileFormSchema.safeParse(payload);

  assert.equal(parsed.success, false, JSON.stringify(parsed, null, 2));
}

process.stdout.write("Onboarding form validation passed\n");
