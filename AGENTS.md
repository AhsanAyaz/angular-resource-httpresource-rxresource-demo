# resource() vs httpResource() vs rxResource() - work-along demo

This is the companion app for the "resource() vs httpResource() vs rxResource()" Angular v22
video. It is built up live, one step at a time, so viewers can follow along.

## Running steps (Claude Code, Gemini CLI, Antigravity)
When the presenter says **"run step N"** (N is 1..3), or `/run-step N`:
1. Read `.video-steps/RUNNER.md` (the execution rules).
2. Read `.video-steps/step-N.md` (the step spec).
3. Apply each `FILE:` block verbatim, write `STEP-N-EXPLAINED.md` from the spec's
   Explanation block, and print a short recap.

Everything needed ships in this repo (no global install): the Claude side has both a skill
(`.claude/skills/run-step`) and an agent (`.claude/agents/step-runner.md`); the Gemini/Antigravity
side has `.gemini/commands/run-step.toml`. All of them defer to `.video-steps/RUNNER.md`.

The step specs are pre-baked and are the single source of truth. Do not improvise the code,
do not run git, and do not rebuild (the dev server hot-reloads). Keep each EXPLAINED file at
12 lines or fewer. No em-dashes anywhere.

Steps are cumulative and run in order from the `start` branch. After step 3 the app equals
the finished `main` branch.

## Stack
Angular v22 (zoneless), the `resource()` family (`resource` and `rxResource` from
`@angular/core` / `@angular/core/rxjs-interop`, `httpResource` from `@angular/common/http`),
Tailwind + daisyUI. Standalone components, native control flow (`@if` / `@for`),
`signal` / `computed`, `inject()`. Every resource exposes the same signal surface:
`value()`, `isLoading()`, `error()`, `reload()`. Do not add NgModules.
