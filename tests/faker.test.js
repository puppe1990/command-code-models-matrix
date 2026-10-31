import { test } from "node:test";
import assert from "node:assert/strict";
import { faker } from "@faker-js/faker";

import {
  MODELS,
  PROFILE,
  SCORED,
  TOKENS_PER_REQ,
  WINDOW,
  blendOf,
  balanceOf,
  costReqOf,
  windowsOf
} from "../src/core.js";

faker.seed(20261031);

function fakePaidModel(overrides = {}) {
  return {
    n: faker.commerce.productName(),
    v: faker.company.name(),
    inp: faker.number.float({ min: 0.01, max: 20, fractionDigits: 4 }),
    cr: faker.number.float({ min: 0.001, max: 2, fractionDigits: 5 }),
    out: faker.number.float({ min: 0.01, max: 80, fractionDigits: 4 }),
    iq: faker.number.float({ min: 10, max: 60, fractionDigits: 1 }),
    tags: [],
    cred: faker.helpers.arrayElement([10, 20, 40, 50, 60, 70, 100]),
    ...overrides
  };
}

test("faker: costReqOf segue o perfil 800 / 50k / 160", () => {
  for (let i = 0; i < 50; i++) {
    const m = fakePaidModel();
    const expected = (PROFILE.input * m.inp + PROFILE.cache * m.cr + PROFILE.output * m.out) / 1e6;
    assert.equal(costReqOf(m), expected, m.n);
  }
});

test("faker: modelo grátis zera custo e blend", () => {
  for (let i = 0; i < 20; i++) {
    const m = fakePaidModel({
      tags: ["free"],
      inp: faker.number.float({ min: 0, max: 5, fractionDigits: 3 }),
      out: faker.number.float({ min: 0, max: 20, fractionDigits: 3 }),
      cr: faker.number.float({ min: 0, max: 1, fractionDigits: 4 })
    });
    assert.equal(costReqOf(m), 0, m.n);
    assert.equal(blendOf(0), 0);
  }
});

test("faker: blend é costReq / 50960 × 1e6", () => {
  assert.equal(TOKENS_PER_REQ, 50960);
  for (let i = 0; i < 50; i++) {
    const m = fakePaidModel();
    const cost = costReqOf(m);
    assert.equal(blendOf(cost), (cost / TOKENS_PER_REQ) * 1e6);
  }
});

test("faker: janelas são 20% e 50% do teto mensal", () => {
  for (let i = 0; i < 50; i++) {
    const monthly = faker.number.int({ min: 100, max: 500000 });
    const w = windowsOf(monthly);
    assert.equal(w.h5, monthly * WINDOW.h5);
    assert.equal(w.week, monthly * WINDOW.week);
    assert.equal(w.h5, monthly * 0.2);
    assert.equal(w.week, monthly * 0.5);
  }
});

test("faker: equilíbrio fica em 0–100 para pares pontuáveis", () => {
  const iqs = SCORED.map(m => m.iq);
  const blends = SCORED.map(m => m.blend);
  const range = {
    iqMin: Math.min(...iqs),
    iqMax: Math.max(...iqs),
    bMin: Math.min(...blends),
    bMax: Math.max(...blends)
  };
  for (let i = 0; i < 50; i++) {
    const iq = faker.number.float({ min: range.iqMin, max: range.iqMax, fractionDigits: 1 });
    const blend = faker.number.float({ min: range.bMin, max: range.bMax, fractionDigits: 6 });
    const b = balanceOf(iq, blend, range);
    assert.ok(b != null && b >= 0 && b <= 100, String(b));
  }
});

test("faker: costReqOf nos modelos reais bate com o pré-computado", () => {
  const sample = faker.helpers.arrayElements(MODELS, 40);
  for (const m of sample) {
    assert.equal(costReqOf(m), m.costReq, m.n);
    assert.equal(blendOf(m.costReq), m.blend, m.n);
  }
});
