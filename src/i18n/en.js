/* EN dictionary — target language. Keys end in .html when the value
   contains markup (<strong>, <em>, <a>) and must be injected as innerHTML. */
export const en = {
  /* ---------- header ---------- */
  "header.title": "Models & Plans Matrix",
  "header.subtitle": "Command Code · prices, cost per token, cost per request, limits and benchmark",
  "header.source": 'Source: <span class="text-slate-300">commandcode.ai/docs</span> — Pricing & Limits + GOAT plan',
  "header.ref": 'Reference: <span class="text-slate-300">Oct 31, 2026</span> · prices in USD / 1M tokens',
  "header.theme.toLight": "Light",
  "header.theme.toDark": "Dark",
  "header.theme.ariaLight": "Enable light theme",
  "header.theme.ariaDark": "Enable dark theme",
  "header.lang.aria": "Switch to Portuguese",
  "header.lang.label": "PT",

  /* ---------- 1. plans ---------- */
  "plans.h2": "1. Command Code plans",
  "plans.lead": "How much you pay vs. how much you get in credits — and the effective multiplier.",
  "plans.noMarkup": "model credits are charged at API price, with no markup",
  "plans.note.html":
    'Rolling usage windows limit only the <strong class="text-slate-400">included credits</strong>; extra credits (top-up) are not limited, they accumulate and never expire. The <strong class="text-slate-400">Go ($1)</strong> plan serves open-source models and some premium ones (GPT-6 Luna, Grok 4.5, Muse Spark Contributor, Qwen Max &amp; Plus).',
  "plans.perMonth": "/month",
  "plans.credits": "{value} in credits",
  "plans.payAsYouGo": "you pay only for usage",
  "plans.payAsYouGoBadge": "pay-as-you-go",
  "plans.creditBadge": "{value}× credit",
  "plans.modelsLabel": "Models:",
  "plans.windowsLabel": "Windows:",
  "plans.filterBtn": "Filter by this plan",
  "plan.go.models": "Open-source + some premium",
  "plan.go.limits": "$2 / 5h · $5 / weekly",
  "plan.go.note": "Global entry. No API access.",
  "plan.goat.models": "open + Haiku 5.5, Sonnet 5.5, GPT-6 Luna, Grok",
  "plan.goat.limits": "$20 / 5h · $50 / weekly",
  "plan.goat.note": "10× multiplier — per-model ceiling up to $100.",
  "plan.pro.models": "GOAT + Claude/GPT/Gemini 4 Argon",
  "plan.pro.limits": "$22 / 5h · $55 / weekly",
  "plan.pro.note": "Premium with ceilings up to $110 on negotiated flashes.",
  "plan.max10.models": "All (Opus, Fable, Fugu, Wonder, Astra)",
  "plan.max10.limits": "$45 / 5h · $90 / weekly",
  "plan.max10.note": "$150 standard + $100 premium.",
  "plan.max20.models": "All (Opus, Fable, Fugu, Wonder, Astra)",
  "plan.max20.limits": "$90 / 5h · $180 / weekly",
  "plan.max20.note": "$300 standard + $200 premium.",
  "plan.provider.models": "All via API (pay-as-you-go)",
  "plan.provider.limits": "no limit (prepaid)",
  "plan.provider.note": "OpenAI/Anthropic-compatible API, at the model's cost.",

  /* ---------- 2. highlights ---------- */
  "kpi.h2": "2. Matrix highlights",
  "kpi.lead": "The extremes of each axis — useful to know where the bets are before looking at the table.",
  "kpi.balance.label": "Smart and cheap",
  "kpi.balance.body.html":
    'balance <span class="mono text-sky-300">{balance}</span>/100 · IQ {iq} at {cost}/req<br>ceiling ${cred} (GOAT) · {req} req/month',
  "kpi.smartest.label": "Highest Intelligence (catalog)",
  "kpi.smartest.body.html":
    'IQ <span class="text-slate-200 font-bold">{iq}</span> · {cost}/req · {out} out<br>{plan}+ plan — outside GOAT',
  "kpi.volume.label": "Highest volume on GOAT",
  "kpi.volume.body.html":
    '<span class="text-slate-200 font-bold">{req}</span> requests/month · ceiling ${cred}<br>{cost}/req · IQ {iq} · {cache} cache',
  "kpi.cheapest.label": "Lowest cost per request",
  "kpi.cheapest.body.html":
    '<span class="text-slate-200 font-bold">{cost}</span> per agentic request<br>IQ {iq} · ceiling ${cred} (GOAT)',
  "kpi.cache.label": "Cheapest cache read",
  "kpi.cache.body.html":
    '<span class="text-slate-200 font-bold">{cache}</span> per 1M in cache read{tie}<br>best without a deal: {nonDeal} ({nonDealName})',
  "kpi.cache.tie": " (tied with {name})",
  "kpi.cache.second": " · 2nd: {cache} ({name})",
  "kpi.tier.label": "Credit ceiling on GOAT",
  "kpi.tier.value": "{max} max · $20 default",
  "kpi.tier.body.html": "{n} of the {total} paid GOAT models sit at the $20 default<br>{nMax} reach ${max}: {names}",
  "kpi.noDeal.label": "Best at full price (no deal)",
  "kpi.noDeal.body.html":
    "balance {balance}/100 with no reliance on a discount · IQ {iq}<br>{inp} in / {out} out / {cache} cache · ceiling ${cred}",
  "kpi.free.label": "Free (zero cost)",
  "kpi.free.body.html": "IQ {iq} inherited from {base} · {ctx} context<br>free promo · 100 req/day · zero credits",

  /* ---------- 3. how GOAT charges ---------- */
  "tiers.h2": "3. How GOAT charges: ceiling per model and windows",
  "tiers.lead.html":
    'The most common mistake when reading the plan is treating the $100 as a single lump. It isn\'t: GOAT gives a <strong class="text-slate-300">monthly ceiling per model</strong>, and that ceiling ranges from $10 to $100. The choice of model changes how much you can code in the month.',
  "tiers.payReceive": "You pay → you get",
  "tiers.payBody.html":
    "Except the $100 is <em>a sum of per-model ceilings</em>, not a free balance. Spending the ceiling on DeepSeek V4.1 Flash doesn't leave the same $100 available on Claude Sonnet 5.5.",
  "tiers.windows": "3 usage windows",
  "tiers.w5h": "5 hours",
  "tiers.wWeek": "week",
  "tiers.wMonth": "month",
  "tiers.windowsBody.html":
    '<strong class="text-slate-300">$20 in any 5 h</strong> · <strong class="text-slate-300">$50 in 7 days</strong> · <strong class="text-slate-300">the model\'s ceiling in the month</strong>. The 5 h window is the one that locks first on a heavy agent day.',
  "tiers.negociated": "New models vs. negotiated ones",
  "tiers.negociatedBody.html":
    'Where Command Code negotiated capacity, the ceiling goes up (up to $100 on V4.1 Flash, GLM-5.3 Flash and Ling 3.1 Flash). Where it didn\'t, the new model falls into the default of <strong class="text-slate-300">2× the amount paid</strong>: a $20 ceiling on the $10 plan. Premium on GOAT: Sonnet 5.5 at $10, Haiku 5.5 at $20.',
  "tiers.speedBody.html":
    'Speed variants (<em>GLM-5.2 Fast</em>, <em>Kimi K2.7 Code HighSpeed</em>) <strong class="text-slate-300">do not inherit</strong> the base model\'s ceiling — they stay at $20.',
  "tiers.ceilingEq.html":
    'Ceiling = points; real autonomy is <span class="mono text-slate-400">ceiling ÷ cost per request</span>.',
  "tiers.tableTitle": "Distribution of ceilings on GOAT",
  "tiers.summary.html":
    '<strong class="text-slate-200">{paid}</strong> paid models · <strong class="text-slate-200">{bands}</strong> ceiling bands · from ${min} to ${max}',
  "tiers.tierMeta": "{n} model{s} · {share}%",
  "tiers.freeTierMeta": "4 models · no ceiling",
  "tiers.freeNote": "100 req/day per account (Laguna S 2.1 is free while capacity lasts)",
  "tiers.note":
    "Ceiling published per model on the GOAT plan page. The four free models (Ling 3.1 Flash 1019, Beam 1.0, Glyph Cluster and Laguna S 2.1) sit outside any ceiling.",
  "tiers.reqPerMonth": " · {req} req/month",

  /* ---------- 4. recommendations ---------- */
  "picks.h2": "4. Recommendations by goal",
  "picks.lead":
    "The answer changes with the question. Each card is the winner of a different criterion, computed on top of the same matrix data — it isn't opinion, it's the top of each axis.",
  "picks.reqMonth": "req/month",
  "picks.perReq": "$/req",
  "picks.iq": "IQ",
  "picks.openDetail": "View model detail",
  "pick.best.label": "I want the best overall",
  "pick.best.why.html":
    'Best balance in the matrix (IQ {iq} at {cost}/req). It isn\'t the smartest in the table — Opus 5.5 wins on score — but it pairs frontier-class capability with a small-model price. <strong class="text-slate-300">Risk:</strong> this is the Contributor price (deal) — if the deal falls through, it goes back to {listIn} in / {listOut} out.',
  "pick.smartest.label": "I want the smartest",
  "pick.smartest.why.html":
    'IQ {iq}, the highest published, tied with {tieName}: same capability, {cost}/req against {tieCost}/req. With the same ${cred} ceiling, that gives <strong class="text-slate-300">{req}</strong> requests/month against {tieReq}.',
  "pick.smartest.alone": "IQ {iq}, the highest published, at {cost} per request.",
  "pick.volume.label": "I want to run the whole month",
  "pick.volume.why.html":
    "The highest volume on GOAT: a negotiated ${cred} ceiling with a {cost} request. IQ {iq} on the unified catalog — enough for refactor, tests and day-to-day repository work. It's the model to leave in /model and forget about.",
  "pick.fastest.label": "I want the fastest response",
  "pick.fastest.why.html":
    '<span class="text-slate-200 font-bold">{tps} tok/s</span> — the fastest in the table, with IQ {iq}. Speed changes how the agent feels: less waiting between tool calls makes the whole loop seem shorter. It costs {cost}/req with a ${cred} ceiling.',
  "pick.noDeal.label": "I don't want to depend on a deal",
  "pick.noDeal.why.html":
    "Full price, no temporary discount: {inp} in / {out} out / {cache} cache. Balance {balance}/100 is the best among the no-deal models — Pro-level IQ with flash cache, ${cred} ceiling on GOAT.",
  "pick.bigBudget.label": "I want the biggest ceiling possible",
  "pick.bigBudget.why.html":
    "Among the {n} models with the full ${max} ceiling ({names}), it has the best balance. A high ceiling only helps if the cost per request is low — here it's {cost}.",
  "pick.premium.label": "I need what only exists outside GOAT",
  "pick.premium.why.html":
    "The most capable among those requiring Pro/Max: IQ {iq} at {cost} per request. In that tier what you buy is a capacity ceiling and access to a closed lab, not efficiency — worth it when the GOAT model doesn't close the task.",
  "pick.free.label": "I want free",
  "pick.free.why.html":
    "Timed promo of {base} (IQ {iq} inherited), {ctx} context, 100 req/day, until 16:00 UTC on 3 Nov 2026. Beam, Glyph Cluster and Laguna S 2.1 stay free with no score.",

  /* ---------- 5. ranking ---------- */
  "ranking.h2": "5. Ranking — best value",
  "ranking.lead.html":
    'Index = <span class="mono text-sky-300">Intelligence</span> ÷ <span class="mono text-sky-300">cost per 1M tokens</span> (agentic request profile: 800 new input + 50,000 cache read + 160 output). The <strong class="text-emerald-400">⭐ Smart and cheap</strong> option uses the balance metric, which requires both ends.',
  "ranking.note.html":
    "free models stay out of both metrics (zero cost = infinite benefit)<br>balance = geometric mean of IQ and cheapness, normalized to 0–100",
  "ranking.reqWeek": "req/wk",
  "ranking.balanceShort": "balance",
  "ranking.iqShort": "IQ",
  "ranking.perReq": "$/req",

  /* ---------- 6. matrix ---------- */
  "matrix.h2": "6. Full matrix",
  "filters.search": "Search",
  "filters.searchPlaceholder": "name, vendor or id…",
  "filters.category": "Category",
  "filters.vendor": "Vendor",
  "filters.vendorAll": "All vendors",
  "filters.plan": "Plan (availability + req)",
  "filters.minIq": "Minimum Intelligence",
  "filters.sort": "Sort by",
  "filters.onlyPlan": "show only models included in the selected plan",
  "filters.csv": "Export CSV",
  "cat.all": "All 95 models",
  "cat.goat": "Included in GOAT",
  "cat.proplus": "Pro / Max only (premium)",
  "cat.deals": "With an active deal",
  "cat.free": "Free (zero cost)",
  "cat.open": "Open-source",
  "cat.vision": "With vision",
  "cat.reasoning": "With configurable reasoning",
  "planOption.go": "Go — $1/month",
  "planOption.goat": "GOAT — $10/month",
  "planOption.pro": "Pro — $20/month",
  "planOption.max10": "Max 10× — $100/month",
  "planOption.max20": "Max 20× — $200/month",
  "iq.any": "Any (includes unscored)",
  "iq.30": "≥ 30 — competent",
  "iq.40": "≥ 40 — strong",
  "iq.45": "≥ 45 — top",
  "iq.50": "≥ 50 — elite",
  "sort.balance": "⭐ Smart and cheap (balance)",
  "sort.value": "IQ per dollar (pure ratio)",
  "sort.iq": "Intelligence (highest)",
  "sort.tps": "Speed tok/s (highest)",
  "sort.cred": "Credit ceiling on GOAT (highest)",
  "sort.req": "Requests/month on the plan (highest)",
  "sort.reqh": "Requests in the 5 h window (highest)",
  "sort.cpr": "Cost per request (lowest)",
  "sort.blend": "Cost per 1M tokens (lowest)",
  "sort.out": "Output price (lowest)",
  "sort.cache": "Cache read price (lowest)",
  "sort.name": "Name (A→Z)",
  "table.model": "Model",
  "table.vendor": "Vendor",
  "table.ctx": "Ctx",
  "table.ctxTitle": "Context window",
  "table.cred": "Ceiling $",
  "table.credTitle": "Monthly credit ceiling for this model on the GOAT plan",
  "table.in": "In $",
  "table.inTitle": "USD per 1M input tokens",
  "table.out": "Out $",
  "table.outTitle": "USD per 1M output tokens",
  "table.cache": "Cache $",
  "table.cacheTitle": "USD per 1M cache read tokens",
  "table.perReq": "$/req",
  "table.perReqTitle": "USD cost of ONE typical agent request (800 in + 50k cache read + 160 out)",
  "table.per1m": "$ / 1M",
  "table.blend": "blend",
  "table.blendTitle": "Effective cost per 1M tokens on the agentic request profile",
  "table.iq": "Intell.",
  "table.iqTitle": "Composite Intelligence index published by Command Code",
  "table.iqPerUsd": "IQ/US$",
  "table.iqPerUsdTitle": "Intelligence points per US$ 1 for every 1M tokens",
  "table.balance": "Balance",
  "table.balanceTitle":
    "Smart AND cheap: geometric mean of intelligence and cheapness, normalized. It penalizes a model that's cheap but weak.",
  "table.tps": "tok/s",
  "table.minPlan": "Min plan",
  "table.req": "Req/month",
  "table.reqPlan": "Req/month ({plan})",
  "table.peak": "peak {in}",
  "table.write": "write {value}",
  "table.noScore": "no score",
  "table.free": "free",
  "table.freeQuota": "free †",
  "table.freeQuotaTitle":
    "Ling 3.1 Flash 1019, Beam 1.0 and Glyph Cluster: 100 req/day; Laguna S 2.1: free while capacity lasts",
  "table.topPick": "★ best balance in the filter",
  "table.reqWindowsTitle":
    "Plan windows are rolling 5-hour and 7-day caps, proportional to this model's monthly ceiling — they are not per-period rates (weekly × 4 does not give the month)",
  "table.reqWindows": "5h {h5} · wk {week}",
  "table.empty": "No model found with the current filters.",
  "table.openDetail": "Open detail for {name}",
  "legend.free.html":
    '† free requests: <strong class="text-slate-400">Ling 3.1 Flash 1019</strong>, <strong class="text-slate-400">Beam 1.0</strong> and <strong class="text-slate-400">Glyph Cluster</strong> limited to 100 requests/day per account; <strong class="text-slate-400">Laguna S 2.1</strong> free while capacity lasts. The Ling 1019 promo runs until 16:00 UTC on 3 Nov 2026. Models in <span class="text-rose-400">red</span> are not included in the selected plan. <span class="mono">≈</span> marks an estimated value (not published): in req/month, ceiling ÷ cost per request. <s>Struck-through</s> values are the full price before the deal.',
  "legend.estimate.html":
    'Intelligence is the <strong class="text-slate-400">unified catalog scale</strong> (31 Oct 2026) — the plan table no longer publishes a parallel index. <strong class="text-slate-400">Contributor</strong> variants and <strong class="text-slate-400">Ling 3.1 Flash 1019</strong> inherit the base model\'s score. Models listed as "not yet scored" stay out of value and balance. Jev (headless) is not in this matrix.',
  "count.models":
    '<strong class="text-slate-200">{n}</strong> model(s) listed · plan <strong class="text-sky-300">{plan}</strong> · {credits}{floor}',
  "count.credits": "${value} in credits/month",
  "count.payg": "pay-as-you-go",
  "count.floor": " · IQ floor ≥ {iq}",
  "count.best": ' · best balance: <strong class="text-emerald-400">{name}</strong> ({pts} pts)',

  /* ---------- 7. free ---------- */
  "free.h2": "7. What the free ones are worth",
  "free.lead":
    "Four zero-cost models, outside any credit ceiling. Ling 3.1 Flash 1019 is a timed promo of Ling 3.1 Flash (IQ 41.1) — the only free one with a score, inherited from the base. Below, it against the paid flashes in the same band.",
  "free.tableTitle": "Ling 3.1 Flash 1019 · neighbors by Intelligence",
  "free.tableSub": "the only free one with a score (inherited from the base)",
  "free.colModel": "Model",
  "free.colIq": "IQ",
  "free.colIqTitle": "Official catalog Intelligence — same scale on every row of this table",
  "free.colPerReq": "$/req",
  "free.col3k": "3,000 req",
  "free.col3kTitle": "Cost of 3,000 requests — the free one's monthly ceiling (100/day)",
  "free.badge": "free",
  "free.noCeiling": "no ceiling: 100 req/day",
  "free.ceiling": "ceiling ${value}",
  "free.note.html":
    'Ling 1019 inherits IQ {lingIq} from paid Ling 3.1 Flash — the same 3,000 req would cost {paidCost} on the full model ($100 ceiling on GOAT). In the band, <strong class="text-slate-300">GLM-5.3 Flash</strong> scores {glmIq} at {glmCost} (${glmCred} ceiling) and <strong class="text-slate-300">MiniMax M3.1 Flash</strong> scores {m31Iq} at {m31Cost}. The cheap premium on GOAT is <strong class="text-slate-300">Haiku 5.5</strong> (IQ {haikuIq}) at {haikuCost} for the same 3,000 req.',
  "free.value.title": "What the free one is worth",
  "free.value.body.html":
    '<p><strong class="text-emerald-300">100 requests/day per account</strong> on the three with a quota (Ling 1019, Beam, Glyph) — ~3,000 a month each, without consuming credit. Laguna S 2.1 is free while capacity lasts.</p><p>Replacing 3,000 Ling 1019 req with the cheapest paid neighbor in the band would cost <strong class="text-slate-200">{cheap}</strong>; with the most expensive, <strong class="text-slate-200">{dear}</strong>.</p><p>The real value isn\'t price, it\'s availability: once the 5 h window, the weekly one or the model\'s ceiling is passed, the paid models stop and <strong class="text-slate-300">only the free ones keep going</strong>. The Ling 1019 promo ends on 3 Nov 2026, 16:00 UTC.</p>',
  "free.noscore.title": "The three with no score",
  "free.noscore.body.html":
    '<p><strong class="text-slate-300">Beam 1.0</strong>, <strong class="text-slate-300">Glyph Cluster</strong> and <strong class="text-slate-300">Laguna S 2.1</strong> have no published Intelligence. Without a benchmark, any ranking would be invention.</p><p>In practice: use the three as emergency volume (100 req/day on Beam and Glyph; Laguna free while capacity lasts) and not as a substitute for your main model — among the free ones, only Ling 1019 has a score to position itself, and it is a promo.</p>',

  /* ---------- methodology ---------- */
  "method.h2": "Methodology",
  "method.blend.html":
    '<strong class="text-slate-200">Cost per 1M (agentic blend)</strong> — typical profile documented by Command Code: ~800 tokens of new input, ~50,000 tokens of cache read and ~160 tokens of output per request. Since the harness runs at ~98% cache hit, the real cost is dominated by the <em>cache read</em> price, not by input.',
  "method.perReq.html":
    '<strong class="text-slate-200">$/req</strong> — the same profile, in dollars: <span class="mono">(800·in + 50,000·cache + 160·out) ÷ 1,000,000</span>. It\'s the unit that matters: ceilings and windows aren\'t in tokens, they\'re in dollars.',
  "method.cred.html":
    '<strong class="text-slate-200">Ceiling $</strong> — monthly credit for that specific model on GOAT, published on the plan page. It ranges from $10 (Sonnet 5.5 and MiMo UltraSpeed) to $100 (DeepSeek V4.1 Flash, GLM-5.3 Flash, Ling 3.1 Flash). The house default is still $20.',
  "method.window.html":
    "<strong class=\"text-slate-200\">5 h / week windows</strong> — 20% and 50% of the model's monthly ceiling (the doc publishes all three numbers and the proportion holds: $20 = 20% of $100, $50 = 50%). They are <em>rolling caps, not rates</em>: the weekly cap exists to stop the whole month being consumed in a few days, so multiplying the weekly figure by 4 does not produce the monthly one (on DeepSeek V4.1 Flash: 128,000 × 4 = 512,000 against a monthly ceiling of 256,000). That's why a model with a $20 ceiling has a 5 h window of <em>$4</em>, not $20.",
  "method.value.html":
    '<strong class="text-slate-200">Value</strong> — index = Intelligence ÷ cost/1M (blend). It measures "how much capability you buy per dollar" in real agent use.',
  "method.balance.html":
    '<strong class="text-slate-200">Balance (⭐ smart and cheap)</strong> — requires <em>high intelligence AND low price</em> at the same time. It normalizes IQ (linear scale, 15.4→57.6) and cheapness (log scale) and combines them via the <strong class="text-slate-200">geometric mean</strong>, yielding 0–100. Contributor leads (~88) but does not reach 100: the IQ max is now Opus 5.5. By the pure ratio, MiMo V2.6 Flash rises to 3rd just for being cheap; by balance it drops to 6th. It zeroes out at the IQ floor (Haiku 4.5) and at max cost (Fable 5 / GPT-6 Astra).',
  "method.floor.html":
    '<strong class="text-slate-200">Intelligence floor</strong> — a filter that requires IQ ≥ X, so the ranking isn\'t dominated by cheap but weak models. Combine it with "sort by requests/month" to find <em>volume with capability</em>.',
  "method.iq.html":
    '<strong class="text-slate-200">Intelligence</strong> — composite index from the official catalog, on a single scale. "not yet scored" = the model enters neither the value nor the balance rankings. Contributor variants and Ling 3.1 Flash 1019 inherit the base score — Contributor 1.3 is IQ 48.1 (not 53.0 from the old plan table).',
  "method.deepseek.html":
    '<strong class="text-slate-200">DeepSeek</strong> — the price shown is the <em>off-peak</em> one (17 h/day). Peak = 01:00–04:00 and 06:00–10:00 UTC, Mon–Fri, about 2× the value shown. Weekends are 100% off-peak.',
  "method.estimates.html":
    '<strong class="text-slate-200">Estimates (≈)</strong> — older models and those outside the req tables have no official number; for them req/month is calculated as ceiling ÷ $/req. The other req/month figures come straight from the official doc.',

  /* ---------- quick read ---------- */
  "read.h2": "Quick read of the matrix",
  "read.scales.html":
    '<strong class="text-slate-300">The Intelligence scale unified.</strong> Catalog and plans publish the same number. Consequence: <strong class="text-slate-300">Muse Spark 1.3</strong> is IQ 48.1 (not 53.0), <strong class="text-slate-300">GLM-5.3 Flash</strong> is 41.8 (not 46.2) and the absolute top is <strong class="text-slate-300">Claude Opus 5.5</strong> (57.6), Max only. Sonnet 5.5 (56.0) is the smartest on GOAT.',
  "read.flash.html":
    "The negotiated <em>flash</em> trio (DeepSeek V4.1 Flash, GLM-5.3 Flash, Ling 3.1 Flash) takes the $100 ceiling on GOAT. V4.1 Flash delivers 256k req/month — the highest volume in the matrix. Flash cache read stays in the $0.003–$0.03 range, against $0.20–$1.00 for Opus/Fable/Astra.",
  "read.cache.html":
    'Cache read is the field that weighs the most: 98% of the tokens of a typical request. The cheapest remain the <strong class="text-slate-300">Contributor</strong> variants of Muse Spark, at $0.002 per 1M — MiMo V2.6 Flash ($0.0028) and Pro ($0.0036) come next. By the pure ratio MiMo V2.6 Flash rises to 3rd; by balance (⭐) it drops to 6th, behind the Pro of the same family. It\'s the difference between "cheap" and "cheap and smart".',
  "read.contributors.html":
    'The <strong class="text-slate-300">Contributor</strong> variants of Muse Spark (1.2 and 1.3) remain the price-performance outlier: IQ 39.6 / 48.1 of the full model, input at $0.10 and cache at $0.002 — about 1/12 of the price, $20 ceiling, ~91k req/month. 1.3 leads the balance; 1.2 sits 3rd, behind MiMo V2.6 Pro (no deal).',
  "read.volume.html":
    "<strong class=\"text-slate-300\">Maximum intelligence isn't cheap in volume</strong>: Sonnet 5.5 (IQ 56.0) on GOAT has a $10 ceiling — 1,190 req/month. Contributor 1.3, on the usual $20, yields 90,900. Opus 5.5 (57.6) doesn't even enter GOAT.",
  "read.ceiling70.html":
    "A $100 ceiling now exists, and it came with a low price: V4.1 Flash, GLM-5.3 Flash and Ling 3.1 Flash. The $70 band stayed with GLM-5.2, Tencent Hy3 and Qwen 3.8 27B. GPT-5.6 Sol dropped to the $20 default — it is no longer a full ceiling.",
  "read.costVolume.html":
    '<strong class="text-slate-300">Lowest cost per request ≠ highest volume.</strong> Contributor is the cheapest ($0.000212/req) with a $20 ceiling and yields 90,900 req/month; DeepSeek V4.1 Flash costs more per request and still yields 256,000, because its ceiling is $100. Ceiling and price go together.',
  "read.free.html":
    "The 4 free models — Ling 3.1 Flash 1019, Beam 1.0, Glyph Cluster and Laguna S 2.1 — cost zero credits. Ling 1019, Beam and Glyph have 100 req/day; Laguna is free while capacity lasts. Only Ling 1019 has IQ (41.1, inherited), and the promo ends on 3 Nov 2026. LongCat 2.0 left the free tier: it now costs $0.30/$1.20 with a $50 ceiling.",
  "read.k3.html":
    'On GOAT, the real cheap premium is <strong class="text-slate-300">Haiku 5.5</strong>: IQ 43.4, $0.10/$0.50/$0.01, $20 ceiling, 29,900 req/month — in the GLM-5.3 Flash band, with an Anthropic badge. Kimi K3 ($3.00/$15.00) stays expensive per point. The bottom of the list is closed high-ceiling models (Fable, Astra, Sol): in that tier you pay for capacity, not efficiency.',
  "read.goat.html":
    "On GOAT, DeepSeek V4.1 Flash delivers 256,000 requests/month; Claude Sonnet 5.5, 1,190; GPT-5.6 Sol, 592. Same plan, same subscription: two to three orders of magnitude of difference.",

  /* ---------- footer ---------- */
  "footer.data":
    "Price, context, minimum plan, Intelligence, credit ceiling and request-estimate data extracted from Command Code's official documentation (Go/GOAT/Pro/Max plan pages, Available Models and Pricing & Limits) on Oct 31, 2026.",
  "footer.links": "Official pages:",
  "footer.catalog": "Model catalog",
  "footer.note": "Prices and deals change; the Studio usage page always reflects the real amount charged per request.",

  /* ---------- detail panel (htmx) ---------- */
  "detail.h2": "Model detail",
  "detail.placeholder":
    "Pick a model in the matrix (click the name) or in a recommendation to see the full profile here.",
  "detail.loading": "Loading…",
  "detail.close": "Close",
  "detail.costReq": "Cost per request",
  "detail.blend": "Cost per 1M (blend)",
  "detail.intelligence": "Intelligence",
  "detail.iqPerUsd": "IQ per dollar",
  "detail.balance": "Balance",
  "detail.ceiling": "Credit ceiling on GOAT",
  "detail.ceilingNone": "not on GOAT",
  "detail.windows": "Windows on GOAT",
  "detail.window5h": "5 hours",
  "detail.windowWeek": "week",
  "detail.windowMonth": "month",
  "detail.requests": "requests",
  "detail.freeQuota": "100 req/day per account (outside any ceiling)",
  "detail.prices": "Prices per 1M tokens",
  "detail.peak": "at peak: {in} in / {out} out",
  "detail.source": "View in the official documentation",

  /* ---------- general ---------- */
  "ui.approx": "≈ ",
  "ui.na": "—"
};
