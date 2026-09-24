---
title: Perses
order: 30
outline: deep
---

# Perses

Perses is the dashboard platform used in CobaltCore to visualize metrics collected by [Prometheus](./prometheus).

## Dashboard coverage

The following entries describe the storage observability areas covered by the
dashboards; they are not intended to assert the names of currently deployed
dashboard resources.

| Coverage area | What it shows |
|---|---|
| **Ceph Cluster Overview** | Health status, OSD up/in counts, monitor quorum, capacity summary |
| **OSD Performance** | Per-OSD read/write latency, IOPS, throughput |
| **Pool Usage** | Capacity and object counts per Ceph pool |
| **RGW Traffic** | Request rate, error rate, bandwidth per bucket and user |
| **Replication Status** | Chorus sync lag and success/failure rates |

## Dashboard-as-code

Perses supports managing dashboards as code with the [Perses CUE SDK](https://perses.dev/docs/user-guides/dashboard-as-code/). Whether a deployment uses CUE
definitions and CI-based publication is deployment-specific; this page does not
claim that the existing dashboards were created that way.

::: info
Dashboard source definitions and deployment configuration are not included in
this documentation.
:::

## See also

- [Observability - Prometheus](./prometheus) - metrics source for all dashboards
- [Perses project](https://perses.dev)
