---
title: Management
order: 1
---

# Management

The management layer provides the operational control plane for CobaltCore - the tools operators use to monitor, manage, and optimize the cloud.

## Components

| Component | Role |
|---|---|
| [Aurora](./aurora) | Cloud management frontend - the UI for managing CobaltCore resources |
| [Greenhouse](./greenhouse) | Monitoring and management umbrella - integrates observability tooling across teams |
| [Cortex](./cortex) | Intelligent placement and scheduling engine for compute, storage, and network workloads |

## How the layer fits

The management layer sits above the OpenStack API layer. It does not replace OpenStack APIs - it provides higher-level views and operational automation on top of them. Aurora surfaces OpenStack resources in a user-friendly UI. Greenhouse provides a unified monitoring experience. Cortex integrates with Nova placement to make smarter scheduling decisions.
