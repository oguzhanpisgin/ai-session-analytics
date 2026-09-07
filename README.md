# ai-session-analytics

Field report and reproducible specimens from **715 AI coding sessions over 7 days** across
**3 production repos** (an e-commerce theme product, a healthcare-sector .NET app, an internal
governance tool) orchestrated across **3 AI vendors**: OpenAI Codex (CLI + Desktop),
Anthropic Claude Code, Z.ai GLM (ZCode).

We built a fail-closed analytics layer over the vendors' local session stores: versioned
format contracts, parse-coverage gates, a human-adjudicated golden set, role-aware multi-valued
outcome scoring, and per-number confidence tiers. Everything in this repository is
**aggregate or fully tokenized structural data** — no prompts, no code, no customer content.

**Environment pins:** Windows 11 (build 26200), Codex CLI 0.151.x → 0.153.4, Claude Code
(observed 2026-09), ZCode + GLM-5.3, window 2026-08-31 → 2026-09-07.

## Per-vendor findings and requests

### OpenAI Codex
1. **Silent rollout vocabulary change** between CLI versions (`event_msg/user_message` →
   `response_item/message`, no `schema_version` anywhere). A third-party parser pinned to the
   old vocabulary read **364 sessions as 0 turns, with no error**.
   → **Request:** a per-file or per-line `schema_version` marker, plus a one-time deprecation
   event when the shape changes. See `benchmarks/codex-silent-zero/`.
2. **Role-aware scoring gap:** 130 sessions were verification tasks where a substantiated
   BLOCK verdict is the *successful* outcome. Naive "no error at end" scoring reported 61%;
   role-aware scoring reports ~94%. → **Request:** structured `task_role` and `verdict` fields
   in rollouts.
3. **Security (reported separately via the coordinated disclosure channel):** a 556-char,
   `sk-`-prefixed string was found inside a persisted reasoning record (matched no live
   credential; described as an unexplained credential-shaped string, not a confirmed leak).

### Anthropic Claude Code
1. **12+ record types in project JSONL** (user, assistant plus metadata: `atis-latch`,
   `ai-title`, `last-prompt`, `queue-operation`, `custom-title`, `mode`, `frame-link`,
   `bridge-session`, `pr-link`, `artifact-comment-monitor`, `artifact-autoreact-ledger`,
   `agent-setting`, `attachment`), with `type` placement varying (type-first vs mid-object)
   and **no documented schema or version marker**. → **Request:** a documented, versioned
   record-type enum. See `benchmarks/claude-record-mix/` and `specimens/claude/`.
2. **Long design sessions** (up to 796 turns; median 33) need reliable task-episode
   splitting. `compact_boundary` exists — we ask for analytics-oriented episode metadata in
   the persisted JSONL (or documented extraction).

### Z.ai GLM (ZCode)
1. **The SQLite session store is a strength** — per-tool-call status/error/exit_code rows gave
   us accurate analytics with zero text parsing. → **Request:** a `schema_version` table row
   so third parties can detect store evolution.
2. **Manager-plane sessions produce no machine-checkable evidence** (they coordinate, write
   receipts, run audits), so artifact-presence scoring is structurally blind for them.
   → **Request:** a structured session-summary facility (deliverables touched, receipts
   written) that manager-style sessions can emit at turn end.

## Aggregate tables

See `notebooks/session-stats-7d.md` and `notebooks/category-outcome-7d.csv`
(role × outcome and category × outcome contingency tables with denominators).

## Methodology (available on request)

Fail-closed analytics: parse ledger (parsed/unknown-shape/empty/error), coverage + zero-yield
tripwires, versioned format contracts with schema fingerprinting, population manifest with
reconciliation, role-aware multi-valued outcome (completed / blocked-by-decision / aborted /
interrupted / unknown), human-adjudicated golden set, A/B/C/D confidence tiers per number.
All failures block publication of numbers — a wrong report is worse than no report.

## License

MIT (code/specimens). Aggregate statistics: CC-BY-4.0.
