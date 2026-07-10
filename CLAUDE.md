# CLAUDE.md

This repo is a "resource() vs httpResource() vs rxResource()" work-along demo. See `AGENTS.md`
for the full guide.

When the user says "run step N" or "run the next step", use the `run-step` skill: read
`.video-steps/RUNNER.md` and `.video-steps/step-N.md`, apply the step verbatim, and write a
short `STEP-N-EXPLAINED.md`. Do not hand-write the step code, do not run git, do not rebuild.

Stack: Angular v22 zoneless, the `resource()` family (`resource`, `httpResource`, `rxResource`),
Tailwind + daisyUI. No em-dashes in any authored text.
