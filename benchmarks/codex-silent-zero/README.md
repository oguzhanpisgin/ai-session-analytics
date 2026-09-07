# Silent-zero micro-benchmark (Codex rollout vocabulary change)

Reproduces the failure mode: a third-party analytics parser pinned to the pre-0.151 event
vocabulary reads **every session written by the newer CLI as 0 turns, silently** — no error,
no marker, no deprecation event.

## Reproduce

```
node parse-rollout.mjs rollout-old-vocab.ndjson   # → turns=1  (expected)
node parse-rollout.mjs rollout-new-vocab.ndjson   # → turns=0  (FAILS silently)
```

## Expected vs actual

| File | CLI that wrote it | Real user turns | v1 parser reads |
|---|---|---|---|
| rollout-old-vocab.ndjson | ≤ 0.151 (`event_msg/user_message`) | 1 | 1 ✓ |
| rollout-new-vocab.ndjson | ≥ 0.151 (`response_item/message`) | 1 | **0 ✗ silent** |

## Interpretation

- The **vendor defect**: no `schema_version` marker at any level, and no deprecation event
  when the shape changed — third-party tools cannot detect the transition.
- The **parser defect** (ours, fixed): a robust reader must handle both shapes and fail loudly
  when it recognizes zero records. Both sides are needed; the marker is the vendor-side fix.

Pinned versions: Codex CLI 0.151.x (old shape) → 0.153.4 (new shape), Windows 11 build 26200.
