<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Business Site Template — Agent Instructions

## Repository purpose

This repository is a GitHub template for creating independent websites and web applications for local businesses.

Each client receives a separate repository created with **Use this template**. The shared base must remain reusable, configurable, static-first, and capable of evolving without implementing hypothetical features in advance.

Do not introduce multi-tenancy, client branches, preset repositories, authentication, databases, CMSs, backends, payment systems, or infrastructure that is not required by an approved specification.

## Normative documents and precedence

For project decisions, follow this order:

1. `docs/ARCHITECTURE.md`;
2. `docs/CODING_GUIDELINES.md`;
3. the approved specification for the task;
4. established conventions in the affected module.

Framework and language behavior must follow the documentation installed for the current Next.js version and the official React and TypeScript documentation. If a project instruction conflicts with an actual platform constraint, report the conflict rather than inventing behavior.

Every specification must comply with the architecture and coding guideline. Do not modify either normative document merely to make an implementation fit.

Before implementing a feature:

1. read this file;
2. read the relevant sections of `docs/ARCHITECTURE.md`;
3. read the relevant sections of `docs/CODING_GUIDELINES.md`;
4. read the approved specification completely;
5. inspect the existing implementation and affected modules;
6. consult the relevant local Next.js documentation.

Read `docs/ARCHITECTURE.md` completely when the task changes boundaries, dependencies, rendering strategy, deployment, integrations, public contracts, or project structure.

## Specification requirement

Do not implement a new feature without an approved specification.

Exceptions are limited to explicitly requested:

- small bug fixes;
- documentation changes;
- dependency-free maintenance;
- narrowly scoped configuration corrections.

An informal idea is not authorization to create new architecture, dependencies, integrations, abstractions, or product behavior.

## Required workflow

### Before editing

- Inspect `package.json`, the affected files, and nearby conventions.
- Identify the smallest set of files required by the task.
- Confirm what is explicitly outside the specification scope.
- Check whether the change affects static export or hosting compatibility.
- Search for existing components, contracts, helpers, tokens, and patterns before creating new ones.
- Verify Next.js APIs against the documentation installed for the current version.

### During implementation

- Implement only the approved scope.
- Keep changes small, cohesive, and reviewable.
- Preserve architectural dependency direction.
- Do not refactor unrelated code opportunistically.
- Do not add preventive abstractions or extension points.
- Do not add dependencies without demonstrated necessity.
- Do not update package versions outside the task scope.
- Do not silence TypeScript, ESLint, build, or test failures.
- Do not replace configuration with hardcoded client data.
- Document only non-obvious decisions and constraints.

### After implementation

- Review the complete diff.
- Remove temporary logs, debugging code, dead code, and unused imports.
- Run all applicable project validation commands.
- Confirm that no unrelated files changed.
- Report validations honestly, including commands that could not be executed.

## Project commands

Use the package manager represented by the committed lockfile. This repository currently uses `npm`.

Always inspect `package.json` before assuming a script exists.

Current baseline commands:

- development: `npm run dev`;
- lint: `npm run lint`;
- production build: `npm run build`.

Run type checking, unit tests, component tests, integration tests, and end-to-end tests when corresponding scripts are introduced by an approved specification.

Do not create another lockfile. Do not modify `package-lock.json` unless the task deliberately changes dependencies.

For documentation-only changes, lint and build may be skipped when no executable or configuration file changed. State this explicitly in the final report.

## Architectural guardrails

- Use Server Components by default.
- Add `"use client"` only at the smallest boundary requiring browser state, effects, events, client context, or browser APIs.
- Keep TypeScript strict. Do not use unjustified `any`, `@ts-ignore`, double assertions, or repeated non-null assertions.
- Use CSS Modules for component and section styles.
- Use CSS Custom Properties for shared semantic visual tokens.
- Do not add Tailwind or recreate a global utility framework in CSS.
- Keep client-specific configuration and content in the `site` layer.
- Shared components and sections must not import concrete client data.
- Presets define presentation and composition, not client content or brand identity.
- Themes define visual identity, not page composition.
- Use ordered declarative section definitions instead of collections of independent boolean flags.
- Keep the application static-first and reassess deployment before adding runtime-dependent APIs.
- Do not add global state management, providers, contexts, adapters, registries, or plugin systems preemptively.
- Do not access third-party SDKs or external APIs directly from shared visual components.
- Do not expose secrets through source code, public assets, or client-side environment variables.

## Scope control

Files outside the approved scope must not be changed merely to improve style, naming, formatting, or architecture.

A nearby defect may be corrected only when:

- it blocks the requested implementation;
- the correction is small and low-risk;
- the correction is reported separately in the final response.

Otherwise, report it without changing it.

Do not remove behavior, tests, documentation, or validation rules to make checks pass.

## Ambiguities and decisions

When ambiguity affects architecture, public contracts, dependencies, security, privacy, deployment, data ownership, or product behavior, do not choose arbitrarily. Stop the affected portion and report the decision required.

For local, reversible implementation details:

- choose the simplest solution compatible with existing patterns;
- avoid adding a new abstraction;
- document the decision in the final report when relevant.

If the specification conflicts with the architecture or coding guideline, report the conflict instead of implementing the conflicting instruction.

## Validation requirements

For executable or configuration changes, run every applicable command defined by the repository, including at minimum:

- lint;
- production build;
- type checking when configured;
- automated tests when configured.

Documentation-only changes may skip executable validations as defined in the project commands section.

Do not claim a command passed unless it was executed successfully.

When a validation fails:

1. determine whether the failure was introduced by the task;
2. fix failures introduced by the task;
3. identify pre-existing or environment-related failures clearly;
4. do not hide warnings or errors with suppressions.

## Protected files and content

- Preserve the managed Next.js block at the top of this file exactly as generated.
- Do not manually edit `next-env.d.ts`.
- Do not alter `docs/ARCHITECTURE.md` or `docs/CODING_GUIDELINES.md` without explicit approval.
- Do not commit credentials, secrets, real environment files, or provider tokens.
- Do not replace approved CSS Modules with another styling technology.
- Do not update the framework or major dependencies incidentally.

## Final report

At the end of an implementation, report:

- what was changed;
- files created, modified, or deleted;
- relevant implementation decisions;
- dependencies added or changed;
- commands executed and each result;
- tests not executed and the reason;
- ambiguities, limitations, or deviations from the specification;
- remaining risks or follow-up work directly related to the task.

Be precise. Do not claim completion for work that was not implemented or validated.