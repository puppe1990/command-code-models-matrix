/* ============================================================
   Núcleo do painel: constantes, métricas e rankings.
   Tudo aqui é puro (sem DOM), para poder ser testado em Node.
   ============================================================ */
import { MODELS } from "./data.js";

export { MODELS };

/* Perfil de uma requisição típica de agente, documentado pelo Command Code:
   ~800 tokens de input novo, ~50.000 de cache read e ~160 de output.     */
export const PROFILE = { input: 800, cache: 50000, output: 160 };
export const TOKENS_PER_REQ = PROFILE.input + PROFILE.cache + PROFILE.output; // 50.960

/* As janelas são frações do teto mensal do próprio modelo. A doc publica os
   três números e a proporção se confirma em todos (ex.: $20 = 20% de $100). */
export const WINDOW = { h5: 0.2, week: 0.5 };

/* Intelligence é a escala unificada do catálogo (31/out/2026). Variantes
   Contributor e o Ling 3.1 Flash 1019 herdam o IQ do modelo-base no dataset. */
export const PREMIUM_VENDORS = ["Anthropic", "OpenAI", "Google", "Sakana", "Meta", "xAI"];
export const PLAN_RANK = { go: 0, goat: 1, pro: 2, max: 3, max10: 3, max20: 3 };

export const PLANS = [
  {
    key: "go",
    name: "Go",
    price: 1,
    credits: 10,
    reqKey: null,
    models: "Open-source + alguns premium",
    limits: "$2 / 5h · $5 / semanal",
    note: "Entrada global. Sem acesso à API."
  },
  {
    key: "goat",
    name: "GOAT",
    price: 10,
    credits: 100,
    reqKey: "goat",
    models: "open + Haiku 5.5, Sonnet 5.5, GPT-6 Luna, Grok",
    limits: "$20 / 5h · $50 / semanal",
    note: "10× de multiplicador — teto por modelo até $100."
  },
  {
    key: "pro",
    name: "Pro",
    price: 20,
    credits: 110,
    reqKey: "pro",
    models: "GOAT + Claude/GPT/Gemini 4 Argon",
    limits: "$22 / 5h · $55 / semanal",
    note: "Premium com teto até $110 nos flashes negociados."
  },
  {
    key: "max10",
    name: "Max 10×",
    price: 100,
    credits: 150,
    reqKey: "max",
    models: "Todos (Opus, Fable, Fugu, Wonder, Astra)",
    limits: "$45 / 5h · $90 / semanal",
    note: "$150 standard + $100 premium."
  },
  {
    key: "max20",
    name: "Max 20×",
    price: 200,
    credits: 300,
    reqKey: "max",
    models: "Todos (Opus, Fable, Fugu, Wonder, Astra)",
    limits: "$90 / 5h · $180 / semanal",
    note: "$300 standard + $200 premium."
  },
  {
    key: "provider",
    name: "Provider",
    price: 15,
    credits: null,
    reqKey: null,
    models: "Todos via API (pay-as-you-go)",
    limits: "sem limite (pré-pago)",
    note: "API OpenAI/Anthropic-compatível, ao custo do modelo."
  }
];

/* ============================ FORMATAÇÃO ============================ */
// dinheiro: nunca menos de 2 casas, nunca zero à direita sobrando
const trim = (s, min) => {
  const [i, d] = s.split(".");
  if (d.length <= min) return s;
  let t = d.replace(/0+$/, "");
  if (t.length < min) t = d.slice(0, min);
  return i + "." + t;
};
export const usd = v =>
  v === 0
    ? "$0"
    : v >= 1
      ? "$" + v.toFixed(2)
      : v >= 0.01
        ? "$" + trim(v.toFixed(3), 2)
        : v >= 0.001
          ? "$" + trim(v.toFixed(4), 3)
          : "$" + trim(v.toFixed(5), 4);
export const usdReq = v =>
  v === 0
    ? "$0"
    : v < 0.001
      ? "$" + trim(v.toFixed(6), 4)
      : v < 0.01
        ? "$" + trim(v.toFixed(5), 4)
        : "$" + trim(v.toFixed(4), 3);
export const int = n => (n == null ? "—" : Math.round(n).toLocaleString("pt-BR"));
export const num = n => (n == null ? "—" : String(n));

/* ============================ MÉTRICAS ============================ */
export function costReqOf(m) {
  if (m.isFree || (m.tags && m.tags.includes("free"))) return 0;
  return (PROFILE.input * m.inp + PROFILE.cache * m.cr + PROFILE.output * m.out) / 1e6;
}

export function blendOf(costReq) {
  return costReq === 0 ? 0 : (costReq / TOKENS_PER_REQ) * 1e6;
}

export function windowsOf(monthly) {
  return { h5: monthly * WINDOW.h5, week: monthly * WINDOW.week };
}

export function balanceOf(iq, blend, { iqMin, iqMax, bMin, bMax }) {
  if (iq == null || !(blend > 0)) return null;
  const nIq = (iq - iqMin) / (iqMax - iqMin);
  const nCheap = (Math.log(bMax) - Math.log(blend)) / (Math.log(bMax) - Math.log(bMin));
  return Math.sqrt(nIq * nCheap) * 100;
}

MODELS.forEach(m => {
  m.isOpen = !PREMIUM_VENDORS.includes(m.v);
  m.planRank = PLAN_RANK[m.min];
  m.isFree = m.tags.includes("free");
  m.isDeal = m.tags.includes("deal");
  m.onGoat = m.planRank <= PLAN_RANK.goat;

  if (m.isFree) {
    m.costReq = 0;
    m.blend = 0;
    m.value = null;
  } else {
    m.costReq = costReqOf(m);
    m.blend = blendOf(m.costReq);
    m.value = m.iq != null && m.blend > 0 ? m.iq / m.blend : null;
  }
  m.iqEst = m.iq;
});

/* req/mês por plano: número oficial quando existe, senão teto ÷ custo por requisição */
export function reqMonth(m, planKey) {
  if (m.isFree) return { n: 0, est: false };
  const pub = m.req[planKey];
  if (pub != null) return { n: pub, est: false };
  if (planKey === "goat" && m.cred > 0 && m.costReq > 0) return { n: m.cred / m.costReq, est: true };
  return null;
}

export function reqOf(m, plan) {
  if (!plan.reqKey) return null;
  const r = reqMonth(m, plan.reqKey);
  if (!r) return null;
  return { n: plan.key === "max20" ? r.n * 2 : r.n, est: r.est };
}

/* ============================ RANKINGS ============================ */
export const NO_FREE = MODELS.filter(m => !m.isFree);
export const SCORED = MODELS.filter(m => m.iq != null && m.blend > 0);
export const RANKED = MODELS.filter(m => m.value != null).sort((a, b) => b.value - a.value);

/* "Inteligente e barato": exige as DUAS pontas.
   Inteligência entra em escala linear e barateza em escala log (preço varia em
   ordens de magnitude); a combinação é a média geométrica. Barato porém fraco
   é penalizado — ao contrário do ratio puro IQ/US$, que favorece o mais barato. */
(function computeBalance() {
  const iqs = SCORED.map(m => m.iq),
    blends = SCORED.map(m => m.blend);
  const range = {
    iqMin: Math.min(...iqs),
    iqMax: Math.max(...iqs),
    bMin: Math.min(...blends),
    bMax: Math.max(...blends)
  };
  SCORED.forEach(m => {
    m.balance = balanceOf(m.iq, m.blend, range);
  });
  MODELS.forEach(m => {
    if (m.balance == null) m.balance = null;
  });
})();

export const BALANCED = SCORED.slice().sort((a, b) => b.balance - a.balance);
export const BALANCE_TOP = BALANCED[0];

MODELS.filter(m => m.isFree).forEach((m, i) => {
  m.rankLabel = "FREE" + (i + 1);
});
RANKED.forEach((m, i) => {
  m.rankLabel = i + 1 + "º";
});

/* ============================ TETOS ============================ */
export const CRED_MAX = Math.max(...MODELS.map(m => m.cred || 0));
export const CRED_TIERS = [...new Set(NO_FREE.filter(m => m.onGoat).map(m => m.cred))].sort((a, b) => b - a);
export const PAID_GOAT = NO_FREE.filter(m => m.onGoat);

/* ============================ SELEÇÃO ============================ */
export const byBalance = (a, b) => (b.balance ?? -1) - (a.balance ?? -1);
export const byIq = (a, b) => (b.iq ?? -1) - (a.iq ?? -1);
export const byTps = (a, b) => (b.tps ?? -1) - (a.tps ?? -1);
export const byCpr = (a, b) => a.costReq - b.costReq || (b.iq ?? -1) - (a.iq ?? -1);
export const byVolume = (a, b) => (reqMonth(b, "goat")?.n || 0) - (reqMonth(a, "goat")?.n || 0);

export const PICKS = {
  best: BALANCED[0],
  smartest: SCORED.slice().sort(byIq)[0],
  fastest: MODELS.slice().sort(byTps)[0],
  cheapest: NO_FREE.slice().sort(byCpr)[0],
  volume: MODELS.filter(m => m.onGoat)
    .slice()
    .sort(byVolume)[0],
  noDeal: BALANCED.filter(m => !m.isDeal)[0],
  bigBudget: MODELS.filter(m => m.cred === CRED_MAX).sort(byBalance)[0],
  premium: MODELS.filter(m => m.planRank > PLAN_RANK.goat && m.iq != null).sort(byIq)[0],
  free: MODELS.filter(m => m.isFree && m.iq != null).sort(byIq)[0]
};

export const byId = id => MODELS.find(m => m.id === id);
