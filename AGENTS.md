AGENTS Guidelines for Code Agents

Overview
- This document describes standard build, lint, test, and code-style expectations for this repository.
- Use bun as the primary runtime/tooling driver unless the task requires a different toolchain.
- When in doubt, favor minimal, deterministic changes that respect existing project conventions.

1. Quick Build/Lint/Test Commands
- Install dependencies: `bun install`
- Typecheck/Build (no explicit build step in this repo yet; use TS transpile if needed):
  - Recommended: add a local build script if needed, e.g. `bun run build` which runs tsc or esbuild.
- Linting: if a linter is introduced (eslint/tslint), run via `bun run lint`. Otherwise rely on TypeScript compiler checks.
- Run tests: `bun run test`
- Run a single test (when tests exist):
  - If using Bun's test runner: `bun test -- -t "TestName"`
- Start dev server: `bun run dev`
- Quick check (typecheck only, no tests): `bun run -l` (if a linter flag exists) or `bun run ts-node -V` (as available)

Note: The current package.json provides:
- "test": "echo \"Error: no test specified\" && exit 1"
- "dev": "bun run src/infrastructure/http/server.ts"
- You may add or adapt scripts as you introduce tests, lint, or a build step.

2. Code Style Guidelines
- General:
  - Use ASCII characters by default; avoid non‑ASCII in code and strings unless clearly justified.
  - Follow the repository's existing conventions for indentation, often 2 spaces or 4 spaces; align with project files.
  - Write small, focused functions; prefer pure functions where possible.

- Imports:
  - Group imports: standard library / node built-ins, third-party, local.
  - Use absolute imports where feasible; prefer barrel exports if available.
  - Avoid circular dependencies; prefer dependency injection to decouple modules.
  - Do not import unused symbols; enable TS compiler to catch unused imports.

- Formatting:
  - Use consistent line length and wrap rules; if a formatter is configured (prettier/eslint), rely on it and commit the results.
  - Always include trailing newline at end of file.
  - Use semicolons unless the project is configured to omit them and it remains consistent.

- Types and Interfaces:
  - Prefer explicit types for function parameters and return types in public APIs.
  - Use type aliases for unions when it improves readability (e.g., `type ID = string;`).
  - Distinguish between `unknown` and `any`; avoid `any` in business logic.
  - Use discriminated unions for complex state machines.

- Naming Conventions:
  - Functions: camelCase; Types and Interfaces: PascalCase; Constants: UPPER_SNAKE_CASE.
  - Prefix boolean getters with `is`/`has`/`can`.
  - Use descriptive names; avoid abbreviations unless widely understood.

- Error Handling:
  - Treat errors as first-class citizens; throw/search for meaningful messages.
  - Wrap IO calls with try/catch; propagate errors with context.
  - Do not swallow errors; preserve stack traces where possible.
  - Define and use custom error classes when domain-specific errors exist.

- Async/Promises:
  - Always handle promise rejections; avoid unhandled rejections.
  - Use `async/await` with proper try/catch blocks.
  - When composing promises, prefer `await` for readability; use `Promise.all` when parallelism is safe.

- Testing:
  - Write tests for new features; test both success and failure paths.
  - Describe tests clearly; use test names that reflect behavior, not implementation.
  - Use fixtures and mocks sparingly; define reusable test utils.

- Documentation in code:
  - Add JSDoc/TSDoc for public APIs; include parameter/return type descriptions.
  - Document side effects and invariants where relevant.

- Project Structure and Conventions:
  - Respect existing directories; avoid moving files without necessity.
  - Use consistent file naming conventions that match the export names.
  - When adding new modules, provide index.ts barrels if appropriate.

3. Cursor and Copilot Rules (if present)
- Cursor rules: See repository-specific rules under .cursor/rules/ or .cursorrules if they exist. As of this write, no cursor rules were detected in this workspace.
- Copilot rules: If a .github/copilot-instructions.md exists, follow its guidance. None detected in this repository.

4. Practical Examples
- Quick start for new agents:
  - Inspect package.json for scripts and runtime (node/bun).
  - Add or adjust npm/bun scripts for lint/test/build as needed.
- Running a single test with Bun (example):
  - `bun test -- -t "reads user profile"`
- Formatting and lint: rely on project tooling; if absent, use Prettier/ESLint configs once added.

5. Enforcement and Evolution
- Treat AGENTS.md as a living document; update when tooling or conventions change.
- When adding new guidelines, include a brief rationale and a short example.

6. Operational Guidelines for Agents
- Prefer idempotent changes; avoid side effects on repeated runs.
- If a change cannot be safely tested in isolation, flag and propose a minimal repro before proceeding.
- When in doubt, implement a small, well-scoped patch and verify with local checks before broader changes.
- Always document non-obvious decisions in code comments or accompanying notes.

7. Secrets, Credentials, and Safety
- Never commit secrets or credentials. Skip any file with sensitive content; scrub or mock values in tests.
- Use environment variables or local vaults for credentials in runtime tasks.
- Validate inputs early; avoid leaking sensitive information through logs.

8. Testing and Validation Strategy
- Prefer running unit tests first, then integration tests if present.
- Ensure reproducible tests by using fixtures and deterministic environments.
- Report test results clearly in PRs or task summaries with key pass/fail signals.

9. Version Control and PR Hygiene
- Write concise, purpose-driven commit messages that explain why, not just what.
- Do not squash or rewrite history unless explicitly requested.
- Include minimal tests or testable changes in each PR where feasible.

Notes
- Cursor rules and Copilot rules: reference .cursor/rules/ or .github/copilot-instructions.md if present in the repo; none detected here.
