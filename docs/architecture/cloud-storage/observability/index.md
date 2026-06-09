---
title: Overview
---

# Observability Overview

CobaltCore monitors the cloud storage stack through a combination of Prometheus-based metrics collection and Perses dashboards. Together they provide real-time visibility into Ceph cluster health, OSD performance, RGW throughput, and storage capacity trends.

## Stack

| Component | Role |
|-----------|------|
| [Prometheus](./prometheus.md) | Scrapes and stores time-series metrics from Ceph, Rook, and RGW exporters |
| [Perses](./perses.md) | Dashboard platform for visualizing storage metrics and defining alerts |

## Key Metrics

The following signal categories are covered by the observability stack:

- **Cluster health** — overall Ceph health status, OSD up/in counts, monitor quorum state
- **Capacity** — raw and usable capacity, per-pool usage, growth rate projections
- **Performance** — OSD read/write latency, IOPS, throughput per interface (RBD, CephFS, RGW)
- **RGW** — request rates, error rates, bandwidth per bucket and user
- **Replication** — Chorus replication lag, sync success/failure rates
- **Availability** — Arbiter monitor reachability, MDS active/standby state

## Alerting

Alerts are defined as Prometheus rules and surfaced through the CobaltCore alerting pipeline. Critical thresholds include OSD near-full (85%), cluster degraded state, monitor quorum loss, and RGW error rate spikes.

## See Also

- [Prometheus](./prometheus.md)
- [Perses](./perses.md)
- [Prysm](../prysm.md) — CLI-based observability for Ceph and RGW
