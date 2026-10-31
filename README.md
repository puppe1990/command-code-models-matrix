# Command Code — Models & Plans Matrix

A single-page comparison of every model and plan on [Command Code](https://commandcode.ai): price per 1M tokens, the real cost of an agent request, per-model credit ceilings, usage windows and value indexes.

**Live:** https://command-code-models-matrix.sites.gestaobem.com  
**Repo:** https://github.com/puppe1990/command-code-models-matrix

The page is available in **Portuguese and English** (toggle in the header), ships a dark theme by default with a light mode, and has no runtime dependencies beyond the Tailwind CDN and htmx.

## What the page answers

- Which model gives the most Intelligence per dollar, with and without a deal
- What **one typical agent request** costs across all 95 models (catalog 97 minus headless Jev)
- How much of the GOAT monthly allowance each model consumes, and how many requests that buys
- What the free models are actually worth, compared against paid flashes in the same Intelligence band
- Where the $100 negotiated ceilings are, and why most models still sit at $20

## How the numbers are computed

| Metric              | Formula                                                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cost per request    | `800 input + 50,000 cache read + 160 output` (the agent profile documented by Command Code)                                                                                    |
| Cost per 1M (blend) | the same profile, normalised to 1M tokens                                                                                                                                      |
| Value index         | `Intelligence ÷ cost per 1M`                                                                                                                                                   |
| Balance (0–100)     | geometric mean of intelligence (linear, 15.4→57.6) and cheapness (log), both normalised — demands both ends; the top score is ~88, not 100, because the IQ max is now Opus 5.5 |
| 5h / weekly windows | 20% and 50% of the model's monthly ceiling (proportions confirmed by the official numbers)                                                                                     |

Intelligence is the **unified catalog scale** (31 Oct 2026). Contributor variants and Ling 3.1 Flash 1019 inherit the base model's score. Models listed as "not yet scored" stay out of value and balance.

## Project structure

```
index.html          page shell: static markup + data-i18n attributes (PT is the no-JS fallback)
src/
  data.js           the 95-model dataset (facts only)
  core.js           metrics, rankings, picks — pure, no DOM
  i18n/             pt.js · en.js dictionaries + t()/applyTranslations
  partials.js       (model, lang) → detail HTML fragment
  ui.js             rendering and interactions
  app.js            boot: theme, language, htmx wiring
build.mjs           generates /partials/<lang>/<slug>.html
tests/              node:test suite
partials/           generated — not versioned
```

## The detail panel (htmx)

Clicking a model name in the table or in a recommendation issues an
`hx-get="/partials/<lang>/<slug>.html"` and swaps the fragment into the detail panel.
The fragments are static files generated at build time from the same dataset that
feeds the table, so the panel and the matrix can never disagree. Two language
folders exist, so switching language also switches which fragment is fetched.

## Development (TDD)

```bash
npm install       # eslint, prettier, husky, faker
npm test          # dataset, metrics, faker, i18n, partials, build, coverage
npm run lint      # ESLint
npm run format    # Prettier --write
npm run build     # writes partials/ (95 models × 2 languages)
npm run dev       # build + static server on :8000
```

The pre-commit hook (husky + lint-staged) formats staged files, runs ESLint and then the full test suite, including property tests generated with `@faker-js/faker`. GitHub Actions runs `format:check`, `lint`, `test` and `build` on every push and pull request.

The suite is the guard rail for the analysis itself:

- **dataset** — counts and spot values against the official table (95 models, 69 on GOAT, 4 deals, 4 free)
- **metrics** — cost per request, blend, balance bounds, ceiling bands ($10–$100), window proportions, Max 20× doubling
- **faker** — synthetic models asserting the 800/50k/160 profile, free-model zeros, 20%/50% windows and 0–100 balance
- **i18n** — key parity between languages, identical HTML tags and `{placeholders}`, interpolation, fallback
- **partials** — unique slugs, language switching, peak/deal pricing, no untranslated key leaking into HTML
- **coverage** — every dictionary key is used somewhere, and every `data-i18n` in the HTML exists in the dictionary

## Data sources

[commandcode.ai/docs](https://commandcode.ai/docs) — Pricing & Limits, the Go/GOAT/Pro/Max plan pages, the model catalogue and each model's own page. Reference date: **Oct 31, 2026**.

Prices and deals change often; the Studio usage page always reflects what is actually charged per request.

## Deploy

Static drop on Cleat (`index.html` + `src/` + generated `partials/`):

```bash
npm run build
```

Live: https://command-code-models-matrix.sites.gestaobem.com
