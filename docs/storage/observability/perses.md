---
title: Perses
order: 30
outline: deep
---

# Perses

Perses is the dashboard platform used in CobaltCore to visualize metrics collected by [Prometheus](./prometheus). Dashboards are managed as code using the Perses CUE SDK and deployed via CI, ensuring they are version-controlled alongside the rest of the CobaltCore configuration.

## Dashboards

| Dashboard | What it shows |
|---|---|
| **Ceph Cluster Overview** | Health status, OSD up/in counts, monitor quorum, capacity summary |
| **OSD Performance** | Per-OSD read/write latency, IOPS, throughput |
| **Pool Usage** | Capacity and object counts per Ceph pool |
| **RGW Traffic** | Request rate, error rate, bandwidth per bucket and user |
| **Replication Status** | Chorus sync lag and success/failure rates |

## Dashboard-as-code

Dashboards are defined using the [Perses CUE SDK](https://perses.dev/docs/user-guides/dashboard-as-code/) and committed alongside CobaltCore configuration. CI deploys updated dashboards on merge.

::: info
Dashboard source definitions and CI deployment configuration are being added to this documentation.
:::

## See also

- [Observability - Prometheus](./prometheus) - metrics source for all dashboards
- [Perses project](https://perses.dev)
