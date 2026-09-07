# Record-mix micro-benchmark (Claude Code project JSONL)

Reproduces: message lines carry `type` **mid-object** (after `parentUuid`, `isSidechain`, ...),
while metadata lines carry it first. A type-first parser recognizes only the metadata lines
and silently misses every `user`/`assistant` line.

## Reproduce

```
node parse-type-first.mjs session-mix.jsonl
# → recognized 2/4 lines; both "user"/"assistant" lines missed
```

## Requests this evidences

1. A **documented, versioned record-type enum** for project JSONL.
2. Consistent `type` placement (or an explicit placement-agnostic parsing note in docs).

Pinned: Claude Code observed 2026-09, Windows 11 build 26200.
