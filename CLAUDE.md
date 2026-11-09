# CobaltCore Docs

## Sidebar pattern

Every section uses a dedicated sidebar function in `docs/.vitepress/config.mts` instead of the generic `generateSidebar` call. The function filters out `index.md` from the generated items and prepends it manually as a pinned "Overview" entry at the top.

Sections using this pattern: Storage, Observability, Network, OpenStack, Overview.

When adding a new section, add a dedicated `<name>Sidebar()` function following the same shape, remove the section from the raw `generateSidebar` array, and spread the new function into the `sidebar` object.
