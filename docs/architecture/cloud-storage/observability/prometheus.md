---
title: Prometheus
---

# Prometheus

Prometheus collects and stores time-series metrics from the CobaltCore cloud storage stack. It scrapes exporters provided by Ceph, Rook, and the RADOS Gateway, making storage metrics available for alerting and dashboard queries.

## Exporters

| Exporter | Source | Metrics |
|----------|--------|---------|
| `ceph-exporter` | Ceph daemons | OSD stats, pool usage, cluster health, latency histograms |
| `rook-ceph-mgr` | Rook Ceph manager | Operator status, daemon lifecycle events |
| `radosgw-exporter` | RGW | Request rates, error rates, per-user and per-bucket bandwidth |

## Retention and Storage

Metrics are retained according to the cluster-wide Prometheus retention policy. Long-term storage is handled by the remote-write pipeline configured in the CobaltCore monitoring stack.

## Alert Rules

Storage-specific alert rules are maintained alongside the other CobaltCore alerting rules. Key rules include:

- `CephHealthWarning` / `CephHealthError` — cluster health degradation
- `CephOSDNearFull` — OSD usage exceeding 85%
- `CephMonQuorumLost` — loss of monitor quorum
- `RGWHighErrorRate` — elevated 5xx rate on the gateway

::: info
Detailed rule definitions and Prometheus configuration are in progress.
:::

## See Also

- [Perses](./perses.md) — dashboard platform consuming these metrics
- [Observability Overview](./index.md)
