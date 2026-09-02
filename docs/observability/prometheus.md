---
title: Prometheus
order: 20
outline: deep
---

# Prometheus

Prometheus collects and stores time-series metrics from all CobaltCore components. It is the central metrics store that feeds alerting rules and Perses dashboards.

## Exporters

| Exporter | Source | What it covers |
|---|---|---|
| `ceph-exporter` | Ceph daemons | OSD stats, pool usage, cluster health, latency histograms |
| `rook-ceph-mgr` | Rook manager | Operator status, daemon lifecycle events |
| `radosgw-exporter` | RGW | Request rates, error rates, per-user and per-bucket bandwidth |
| `kvm-ha-agent` | Hypervisor nodes | Hypervisor uptime, VM instance counts, libvirt events |
| OpenStack exporters | Nova, Neutron, Cinder | API latency, queue depths, service health |

## Retention and storage

Metrics are retained according to the cluster-wide retention policy. Long-term storage uses Prometheus remote-write to an external TSDB (configured separately per deployment).

## Alert rules

Key alerting rules across the CobaltCore stack:

| Rule | Condition |
|---|---|
| `CephHealthWarning` / `CephHealthError` | Cluster health degradation |
| `CephOSDNearFull` | OSD usage exceeds 85% |
| `CephMonQuorumLost` | Monitor quorum lost |
| `RGWHighErrorRate` | Elevated 5xx rate on the RGW |
| `HypervisorUnreachable` | HA agent stops reporting for > threshold |

::: info
Full alert rule definitions and scrape configuration are being documented. See the CobaltCore observability charts for current configuration.
:::

## See also

- [Observability — Perses](./perses) — dashboards consuming these metrics
- [Observability — Prysm](./prysm) — additional storage-specific metrics
