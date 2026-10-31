import { test } from "node:test";
import assert from "node:assert/strict";

import {
  MODELS,
  PLANS,
  PROFILE,
  WINDOW,
  CRED_TIERS,
  CRED_MAX,
  PICKS,
  BALANCED,
  RANKED,
  SCORED,
  reqMonth,
  reqOf,
  usd,
  usdReq,
  int
} from "../src/core.js";

const byName = name => MODELS.find(m => m.n === name);

test("dataset: 95 modelos (catálogo 97 menos Jev headless), com as contagens da doc", () => {
  assert.equal(MODELS.length, 95);
  assert.equal(MODELS.filter(m => m.onGoat).length, 69); // GOAT 71 − 2 Jev
  assert.equal(MODELS.filter(m => m.isDeal).length, 4);
  assert.equal(MODELS.filter(m => m.isFree).length, 4);
  assert.equal(MODELS.filter(m => m.cred != null && m.onGoat && !m.isFree).length, 65);
  assert.equal(MODELS.filter(m => /jev/i.test(m.n) || /jev/i.test(m.id)).length, 0);
  assert.equal(byName("Ling 3.0 Flash Sante"), undefined);
  assert.equal(byName("MiMo V2.5"), undefined);
  assert.equal(byName("MiMo V2.5 Pro"), undefined);
});

test("perfil de requisição agêntica é o documentado pelo Command Code", () => {
  assert.deepEqual(PROFILE, { input: 800, cache: 50000, output: 160 });
  assert.equal(PROFILE.input + PROFILE.cache + PROFILE.output, 50960);
});

test("planos: créditos e janelas em dólares batem com a doc de 31/out/2026", () => {
  const by = k => PLANS.find(p => p.key === k);
  assert.equal(by("go").credits, 10);
  assert.equal(by("goat").credits, 100);
  assert.equal(by("pro").credits, 110);
  assert.equal(by("max10").credits, 150);
  assert.equal(by("max20").credits, 300);
  assert.match(by("goat").limits, /\$20/);
  assert.match(by("goat").limits, /\$50/);
  assert.match(by("pro").limits, /\$22/);
  assert.match(by("pro").limits, /\$55/);
});

test("custo por requisição e blend seguem a fórmula do perfil", () => {
  const v4flash = byName("DeepSeek V4 Flash");
  // 800*0.15 + 50000*0.003 + 160*0.60 = 366 micro-dólares
  assert.equal(+(v4flash.costReq * 1e6).toFixed(3), 366);
  assert.equal(+v4flash.blend.toFixed(4), 0.0072);

  const sol = byName("GPT-5.6 Sol");
  assert.equal(+(sol.costReq * 1e6).toFixed(0), 33800);
  assert.equal(+sol.blend.toFixed(4), 0.6633);
});

test("modelos grátis não têm custo, valor nem equilíbrio", () => {
  for (const m of MODELS.filter(x => x.isFree)) {
    assert.equal(m.costReq, 0, m.n);
    assert.equal(m.blend, 0, m.n);
    assert.equal(m.value, null, m.n);
    assert.equal(m.balance, null, m.n);
  }
});

test("escala de Intelligence é a do catálogo, sem offset dual", () => {
  assert.equal(byName("DeepSeek V4.1 Flash").iq, 39.5);
  assert.equal(byName("Muse Spark 1.3").iq, 48.1);
  assert.equal(byName("Claude Opus 5.5").iq, 57.6);
  assert.equal(byName("Claude Sonnet 5.5").iq, 56.0);
  assert.equal(byName("Claude Haiku 4.5").iq, 15.4);
  // iqEst replica a nota oficial — não há mais conversão AA + 5,6
  for (const m of MODELS) {
    assert.equal(m.iqEst, m.iq, m.n);
  }
});

test("variantes Contributor e o Ling 3.1 Flash 1019 herdam o IQ do base", () => {
  assert.equal(byName("Muse Spark 1.3 Contributor").iq, byName("Muse Spark 1.3").iq);
  assert.equal(byName("Muse Spark 1.2 Contributor").iq, byName("Muse Spark 1.2").iq);
  assert.equal(byName("Ling 3.1 Flash 1019").iq, byName("Ling 3.1 Flash").iq);
  assert.equal(byName("Ling 3.1 Flash 1019").iq, 41.1);
  assert.ok(byName("Ling 3.1 Flash 1019").isFree);
  assert.ok(byName("Ling 3.1 Flash 1019").isDeal);
});

test("LongCat 2.0 passou a ser pago, com teto negociado de $50", () => {
  const lc = byName("LongCat 2.0");
  assert.equal(lc.isFree, false);
  assert.equal(lc.inp, 0.3);
  assert.equal(lc.out, 1.2);
  assert.equal(lc.cr, 0.006);
  assert.equal(lc.iq, 19.1);
  assert.equal(lc.cred, 50);
  assert.equal(lc.req.goat, 64100);
});

test("equilíbrio: 0–100, topo no Contributor, zera nas duas pontas da escala unificada", () => {
  for (const m of SCORED) {
    assert.ok(m.balance >= 0 && m.balance <= 100, `${m.n}: ${m.balance}`);
  }
  assert.equal(BALANCED[0].n, "Muse Spark 1.3 Contributor");
  // o Contributor não chega a 100: o IQ máximo agora é o Opus 5.5 (57,6)
  assert.ok(BALANCED[0].balance > 80);
  assert.ok(BALANCED[0].balance < 100);
  const zeros = BALANCED.filter(m => m.balance === 0);
  assert.deepEqual(zeros.map(m => m.n).sort(), ["Claude Fable 5", "Claude Haiku 4.5", "GPT-6 Astra"]);
  const maisCaro = Math.max(...SCORED.map(m => m.costReq));
  const iqMin = Math.min(...SCORED.map(m => m.iq));
  assert.ok(
    zeros.some(m => m.costReq === maisCaro),
    "zera no custo máximo"
  );
  assert.ok(
    zeros.some(m => m.iq === iqMin),
    "zera no IQ mínimo"
  );
});

test("equilíbrio exige as duas pontas: barato e fraco cai em relação ao ratio puro", () => {
  const pos = (list, name) => list.findIndex(m => m.n === name) + 1;
  assert.equal(pos(RANKED, "MiMo V2.6 Flash"), 3);
  assert.equal(pos(BALANCED, "MiMo V2.6 Flash"), 6);
  assert.equal(pos(RANKED, "GLM-5.3 Flash"), 13);
  assert.equal(pos(BALANCED, "GLM-5.3 Flash"), 11);
});

test("request por mês: publicado quando existe, estimado quando não", () => {
  const pub = reqMonth(byName("DeepSeek V4.1 Flash"), "goat");
  assert.deepEqual(pub, { n: 256000, est: false });

  const est = reqMonth(byName("GLM-5.1"), "goat"); // fora das tabelas de req
  assert.equal(est.est, true);
  assert.ok(est.n > 0);

  assert.deepEqual(reqMonth(byName("Ling 3.1 Flash 1019"), "goat"), { n: 0, est: false });
  assert.equal(reqMonth(byName("Claude Opus 5.5"), "goat"), null);
});

test("janelas de 5h e semana são 20% e 50% do teto mensal", () => {
  assert.deepEqual(WINDOW, { h5: 0.2, week: 0.5 });
  const goat = PLANS.find(p => p.key === "goat");
  const flash = reqOf(byName("DeepSeek V4.1 Flash"), goat);
  assert.equal(flash.n, 256000);
  assert.equal(Math.round(flash.n * WINDOW.h5), 51200);
  assert.equal(Math.round(flash.n * WINDOW.week), 128000);
});

/* Trincas oficiais (5 h / semana / mês) publicadas na página do plano GOAT.
   Este teste é o contrato da regra 20%/50%: as janelas derivadas pela página
   têm de reproduzir as três colunas da doc dentro de 0,5%.                  */
const OFICIAL = {
  "GPT-5.6 Sol": [118, 296, 592],
  "DeepSeek V4 Flash": [30800, 76900, 154000],
  "DeepSeek V4.1 Flash": [51300, 128000, 256000],
  "DeepSeek V4.1 Flash Fast": [11500, 28700, 57500],
  "GLM-5.2": [947, 2370, 4740],
  "GPT-5.6 Luna": [2960, 7400, 14800],
  "Tencent Hy3": [7080, 17700, 35400],
  "Qwen 3.8 27B": [4790, 12000, 24000],
  "Qwen 3.8 Max": [261, 654, 1310],
  "Qwen 3.7 Max": [232, 579, 1160],
  "Qwen 3.7 Plus": [1420, 3560, 7110],
  "Qwen 3.6 Plus": [1100, 2750, 5500],
  "MiniMax M3": [2770, 6930, 13900],
  "Kimi K2.7 Code": [1080, 2710, 5420],
  "GLM-5.3 Flash": [11800, 29500, 59000],
  "Gemini 3.8 Flash": [784, 1960, 3920],
  "LongCat 2.0": [12800, 32100, 64100],
  "Ling 3.1 Flash": [5850, 14600, 29200],
  "DeepSeek V4 Pro": [1980, 4940, 9880],
  "Claude Sonnet 5.5": [238, 595, 1190],
  "Claude Haiku 5.5": [5970, 14900, 29900],
  "Kimi K3.1 Pro": [294, 735, 1470],
  "Kimi K3": [196, 490, 980],
  "Mistral Large 4": [448, 1120, 2240],
  "GPT-6 Luna": [6060, 15200, 30300],
  "Qwen 3.8 Omni Flash": [3940, 9860, 19700],
  "Qwen 3.8 Max Prime": [131, 327, 654],
  "Qwen 3.8 Max 0902": [261, 654, 1310],
  "Tencent Hy4 Preview": [1220, 3060, 6120],
  "MiniMax M3.1 Flash": [4230, 10600, 21200],
  "Ornith 1.5 122B": [3180, 7960, 15900],
  "Qwen 3.8 Flash": [3910, 9780, 19600],
  "GLM-5.3 FlashX": [945, 2360, 4720],
  "DeepSeek V4 Flash Vision": [10300, 25600, 51300],
  "DeepSeek V4 Flash Fast": [1040, 2610, 5210],
  "GLM-5.3": [271, 677, 1350],
  "Muse Spark 1.3": [428, 1070, 2140],
  "Muse Spark 1.3 Contributor": [18200, 45500, 90900],
  "Muse Spark 1.2": [428, 1070, 2140],
  "Muse Spark 1.2 Contributor": [18200, 45500, 90900],
  "Muse Spark Open": [428, 1070, 2140],
  "Kimi K2.7 Code HighSpeed": [181, 452, 904],
  "Grok 4.5": [144, 360, 719],
  "Grok 4.6": [144, 360, 719],
  "Grok 4.7": [144, 360, 719],
  "Gemini 3.7 Flash": [784, 1960, 3920],
  "GLM-5.2 Fast": [138, 346, 691],
  Inkling: [396, 989, 1980],
  "Inkling Small": [709, 1770, 3550],
  "MiMo V2.6 Pro": [5700, 14200, 28500],
  "MiMo V2.6 Flash": [13000, 32500, 64900],
  "MiMo V2.6 Pro UltraSpeed": [285, 712, 1420],
  "Step 5 Preview": [1040, 2600, 5210],
  "Step 3.7 Flash": [1670, 4180, 8370],
  "Step 3.5 Flash": [3530, 8830, 17700],
  "Nemotron 3 Ultra": [575, 1440, 2870],
  "Nemotron 3.5 Super VL": [1770, 4420, 8850]
};

test("req/mês publicado bate com a doc, e as janelas derivadas caem em 20% e 50% dele", () => {
  for (const [nome, [h5, semana, mes]] of Object.entries(OFICIAL)) {
    const m = byName(nome);
    assert.ok(m, `modelo ausente: ${nome}`);
    assert.equal(m.req.goat, mes, `${nome}: req/mês`);
    const r = reqOf(
      m,
      PLANS.find(p => p.key === "goat")
    );
    assert.equal(r.n, mes, `${nome}: janela mensal`);
    assert.ok(Math.abs((r.n * WINDOW.h5) / mes - 0.2) < 0.005, `${nome}: 5h = ${((h5 / mes) * 100).toFixed(2)}%`);
    assert.ok(
      Math.abs((r.n * WINDOW.week) / mes - 0.5) < 0.005,
      `${nome}: semana = ${((semana / mes) * 100).toFixed(2)}%`
    );
  }
  assert.equal(Object.keys(OFICIAL).length, 57, "trincas oficiais conferidas");
});

test("janela semanal é teto rolante, não taxa: semana × 4 não dá o mês", () => {
  const goat = PLANS.find(p => p.key === "goat");
  const flash = reqOf(byName("DeepSeek V4.1 Flash"), goat);
  assert.ok(flash.n * WINDOW.week * 4 > flash.n * 1.9, "quatro semanas estouram o teto mensal — é limite, não taxa");
  const sol = reqOf(byName("GPT-5.6 Sol"), goat);
  assert.ok(sol.n * WINDOW.week * 4 > sol.n * 1.9);
  const glm53 = byName("GLM-5.3");
  assert.equal(glm53.cred, 20);
  const r = reqOf(glm53, goat);
  assert.equal(Math.round((glm53.cred * WINDOW.week) / glm53.costReq), Math.round(r.n * WINDOW.week));
});

test("Max 20× entrega o dobro do Max 10×", () => {
  const m = byName("Kimi K3");
  const max10 = PLANS.find(p => p.key === "max10");
  const max20 = PLANS.find(p => p.key === "max20");
  assert.equal(reqOf(m, max20).n, reqOf(m, max10).n * 2);
});

test("tetos de crédito: faixas e extremos", () => {
  assert.deepEqual(CRED_TIERS, [100, 70, 60, 50, 47, 40, 33, 20, 10]);
  assert.equal(CRED_MAX, 100);
  assert.deepEqual(
    MODELS.filter(m => m.cred === 100)
      .map(m => m.n)
      .sort(),
    ["DeepSeek V4.1 Flash", "GLM-5.3 Flash", "Ling 3.1 Flash"].sort()
  );
  assert.deepEqual(
    MODELS.filter(m => m.cred === 70)
      .map(m => m.n)
      .sort(),
    ["GLM-5.2", "Qwen 3.8 27B", "Tencent Hy3"].sort()
  );
  assert.equal(byName("GPT-5.6 Sol").cred, 20);
  assert.equal(byName("Claude Sonnet 5.5").cred, 10);
  assert.equal(byName("MiMo V2.6 Pro UltraSpeed").cred, 10);
});

test("recomendações: cada critério escolhe o modelo esperado", () => {
  assert.equal(PICKS.best.n, "Muse Spark 1.3 Contributor");
  assert.equal(PICKS.smartest.n, "Claude Opus 5.5");
  assert.equal(PICKS.fastest.n, "Gemini 3.8 Flash");
  assert.equal(PICKS.volume.n, "DeepSeek V4.1 Flash");
  assert.equal(PICKS.noDeal.n, "MiMo V2.6 Pro");
  assert.equal(PICKS.bigBudget.n, "DeepSeek V4.1 Flash");
  assert.equal(PICKS.premium.n, "Claude Opus 5.5");
  assert.equal(PICKS.free.n, "Ling 3.1 Flash 1019");
  assert.equal(PICKS.cheapest.n, "Muse Spark 1.3 Contributor");
});

test("formatação de dinheiro: nunca menos de 2 casas, sem zero sobrando", () => {
  assert.equal(usd(0), "$0");
  assert.equal(usd(0.1), "$0.10");
  assert.equal(usd(0.15), "$0.15");
  assert.equal(usd(0.002), "$0.002");
  assert.equal(usd(0.0036), "$0.0036");
  assert.equal(usd(0.08334), "$0.083");
  assert.equal(usd(7.0325), "$7.03");
  assert.equal(usd(15), "$15.00");

  assert.equal(usdReq(0), "$0");
  assert.equal(usdReq(0.000212), "$0.000212");
  assert.equal(usdReq(0.00918), "$0.00918");
  assert.equal(usdReq(0.0338164), "$0.0338");

  assert.equal(int(256000), "256.000");
  assert.equal(int(null), "—");
});
