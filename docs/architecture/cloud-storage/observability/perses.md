---
title: Perses
order: 20
---

# Perses

Perses is the dashboard platform used in CobaltCore to visualize cloud storage metrics collected by [Prometheus](./prometheus.md). It provides pre-built dashboards for Ceph cluster health, OSD performance, RGW traffic, and capacity planning.

## Dashboards

| Dashboard | Purpose |
|-----------|---------|
| Ceph Cluster Overview | Health status, OSD counts, monitor quorum, capacity summary |
| OSD Performance | Per-OSD read/write latency, IOPS, throughput |
| Pool Usage | Capacity and object counts per Ceph pool |
| RGW Traffic | Request rate, error rate, bandwidth per bucket and user |
| Replication Status | Chorus sync lag and success/failure rates |

## Dashboard-as-Code

Dashboards are managed as code using the Perses CUE SDK and deployed via CI. This ensures dashboards are version-controlled alongside the rest of the CobaltCore configuration.

::: info
Dashboard definitions and deployment configuration are in progress.
:::

## See Also

- [Prometheus](./prometheus.md) — metrics source for all dashboards
- [Observability Overview](./index.md)
