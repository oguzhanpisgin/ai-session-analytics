# Codex rollout specimens

One NDJSON line per observed top-level/payload record type. Every content-bearing value is
replaced with a type token (`"<str:N>"` = string of length N, `<int>`, `<bool>`). Key order,
nesting, and discriminators are preserved exactly as emitted by Codex CLI 0.151.x → 0.153.4
on Windows.

Observed top-level types: `session_meta`, `response_item`, `event_msg`, `turn_context`,
`item_completed`, `token_count`, `token_usage_record`, `path`, `unknown`, `world_state`,
`inter_agent_communication_metadata`, `compacted`.
Observed `response_item.payload.type`: `message`, `reasoning`, `function_call`,
`function_call_output`, `custom_tool_call`, `custom_tool_call_output`, `agent_message`,
`tool_search_call`, `tool_search_output`, `web_search_call`.

**No `schema_version` field exists at any level.** The `message` content part types changed
(`event_msg/user_message` → `response_item/message` with `input_text`/`output_text`) between
CLI generations without a marker — this is the silent-zero failure mode demonstrated in
`benchmarks/codex-silent-zero/`.
