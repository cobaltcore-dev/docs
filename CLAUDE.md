# CobaltCore Docs

## Sidebar pattern

Every section's sidebar in `docs/.vitepress/config.mts` is built so its top entry is a named group whose header matches the section name. The group filters out `index.md` from the generated items and prepends it manually as a pinned "Overview" entry at the top.

This is produced by the universal `sectionSidebar(path, title, extra?)` helper (which itself uses `sectionItems()` to generate and filter items). The `sidebar` object spreads one `sectionSidebar(...)` call per section.

When adding a new section, add a `...sectionSidebar('<path>', '<Title>')` line to the `sidebar` object — nothing else is needed. Pass vitepress-sidebar overrides (e.g. `excludePattern`) as the third `extra` argument.

Two sections are special cases that build their groups inline rather than via `sectionSidebar`:

- `operationsSidebar()` — the Operations Manual nests Platform, Observability, and Sustainability under one shared header across four routes.
- `documentationSidebar()` — the Documentation nav links to About and shares one "Documentation" header across all seven documentation routes (About, Getting Started, Bare Metal, Compute, Storage, Network, OpenStack), each nested as a collapsible group with its own Overview + child pages. The Storage group preserves the `excludePattern: ['observability/**']` override.
