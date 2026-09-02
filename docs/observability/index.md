---
title: Observability
order: 1
outline: deep
---

# Observability

CobaltCore's observability stack provides real-time visibility into every layer - compute, storage, networking, and OpenStack services. It combines Prometheus for metrics, Perses for dashboards, and Prysm for storage-specific monitoring and audit.

## Components

| Component | Role |
|---|---|
| [Prysm](./prysm) | Observability CLI for Ceph and RGW - real-time monitoring, SMART disk health, log audit |
| [Prometheus](./prometheus) | Scrapes and stores time-series metrics from all CobaltCore components |
| [Perses](./perses) | Dashboard platform for visualizing metrics from Prometheus |

## Key metrics coverage

| Domain | What is monitored |
|---|---|
| **Compute** | Hypervisor uptime, VM counts, migration status, HA agent telemetry |
| **Storage** | Ceph health, OSD status, pool usage, RGW throughput, Arbiter monitor reachability |
| **OpenStack** | Nova API latency, Neutron agent status, Cinder volume operations |
| **Networking** | OVN controller status, OVS flow counts |

## Alerting

Alerts are defined as Prometheus rules. Critical thresholds monitored across the stack:

| Alert | Condition |
|---|---|
| `CephHealthWarning` / `CephHealthError` | Cluster health degradation |
| `CephOSDNearFull` | OSD usage exceeds 85% |
| `CephMonQuorumLost` | Monitor quorum lost |
| `RGWHighErrorRate` | Elevated 5xx rate on the RGW |
| `HypervisorUnreachable` | HA agent stops reporting |

## See also

- [Observability - Prysm](./prysm)
- [Observability - Prometheus](./prometheus)
- [Observability - Perses](./perses)
