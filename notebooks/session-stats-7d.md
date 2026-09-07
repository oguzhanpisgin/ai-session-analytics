# Aggregate session statistics — 7 days (2026-08-31 → 2026-09-07)

Population: 715 sessions (Codex 365, Claude Code 128, ZCode/GLM 222) across 3 production
repos. All parse-coverage gates green (100%). Numbers are aggregate counts only; no session
content is published.

## Role × outcome (n and completed share; "blocked-by-decision" = a verification session
whose substantiated BLOCK verdict IS the successful task outcome)

### Codex (n=364)
| role | n | completed | blocked-by-decision | interrupted | unknown |
|---|---|---|---|---|---|
| verifier | 165 | 134 | 21 | 9 | 1 |
| worker | 44 | 36 | 0 | 3 | 5 |
| manager | 35 | 33 | 0 | 1 | 1 |
| advisor | 8 | 8 | 0 | 0 | 0 |
| unclassified | 112 | 75 | 0 | 5 | 32 |

### Claude Code (n=127)
| role | n | completed | interrupted | unknown |
|---|---|---|---|---|
| worker | 16 | 13 | 1 | 2 |
| advisor | 32 | 30 | 0 | 2 |
| verifier | 20 | 16 | 1 | 3 |
| manager | 12 | 6 | 0 | 6 |
| unclassified | 47 | 30 | 0 | 17 |

### ZCode/GLM (n=222; manager-plane sessions are structurally evidence-neutral — see report §Z2)
| role | n | completed | interrupted | unknown |
|---|---|---|---|---|
| worker | 28 | 3 | 1 | 24 |
| manager | 43 | 7 | 4 | 32 |
| verifier | 16 | 2 | 0 | 14 |
| advisor | 10 | 0 | 2 | 8 |
| unclassified | 122 | 18 | 11 | 93 |
| cron | 3 | 0 | 0 | 3 |

## Verification-role scoring gap (Codex, n=130 verification sessions)
- Naive "no error at end" scoring: **61% success**
- Role-aware scoring (substantiated BLOCK = success): **~94%**
- Delta ≈ 33 percentage points, caused entirely by BLOCK-verdict misclassification.

## Scoring validity
- Golden set: 13 human-adjudicated labels (owner-delegated, second-pass verified).
- Outcome-axis label agreement: 12/13 (92%); false-success 0; missed-failure 1.
- Category-axis agreement 46% → category counts are published as heuristic (C-tier).
