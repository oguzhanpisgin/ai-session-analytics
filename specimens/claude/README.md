# Claude Code project-JSONL specimen

Fully tokenized structural specimen of the record types observed in `~/.claude/projects/<encoded-path>/<uuid>.jsonl`
(Claude Code, Windows, observed 2026-09). Values are type tokens; key sets and `type` placement
are real.

Key observations:
- **12+ metadata record types** besides `user`/`assistant` (ai-title, atis-latch, last-prompt,
  queue-operation, custom-title, mode, frame-link, bridge-session, pr-link,
  artifact-comment-monitor, artifact-autoreact-ledger, agent-setting, attachment).
- **`type` placement varies**: message lines carry `type` mid-object (after `parentUuid`, ...),
  metadata lines carry it first. Regex-based `^{"type":` parsing silently misses all message
  lines — demonstrated in `benchmarks/claude-record-mix/`.
- **No schema/version marker** anywhere in the file.
- `message.content` is polymorphic: string, or array of `text` | `tool_use` | `tool_result`
  (tool_result carries `is_error`).

Full observed type inventory (counts from a 7-day, 126-session sample):
last-prompt 643, queue-operation 636, atis-latch 627, custom-title 459, ai-title 307,
frame-link 169, mode 157, bridge-session 106, pr-link 79, artifact-comment-monitor 30,
artifact-autoreact-ledger 16, agent-setting 1.
