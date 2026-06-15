---
title: Cloud Storage
---

# Cloud Storage

CobaltCore's cloud storage layer is built on [Ceph](./ceph.md), a distributed storage system that delivers object, block, and file storage in a single unified platform. The surrounding components handle lifecycle automation, data replication, high-availability quorum, observability, and liquid storage allocation — each with a focused responsibility.

## Architecture

The storage stack is organized into three layers:

**Foundation** — Ceph provides the core distributed storage engine. All other components either operate it, extend it, or observe it.

**Operations** — [Rook](./rook.md) runs as a Kubernetes operator and manages the full lifecycle of Ceph daemons (monitors, managers, OSDs, MDS, RGW) as containerized workloads. [Arbiter](./arbiter.md) extends quorum into stretched cluster topologies by deploying external Ceph monitors that Rook does not manage directly.

**Data Services** — [Chorus](./chorus.md) provides zero-downtime data replication and migration between object storage systems (S3 and Swift). [Liquid-Ceph](./liquid-ceph.md) enables dynamic, on-demand storage allocation across the cluster.

## Components

| Component | Layer | Role |
|-----------|-------|------|
| [Ceph](./ceph.md) | Foundation | Distributed storage engine — block (RBD), file (CephFS), object (RGW) |
| [Rook](./rook.md) | Operations | Kubernetes operator for Ceph lifecycle management |
| [Arbiter](./arbiter.md) | Operations | External Ceph monitors for quorum in stretched clusters |
| [Chorus](./chorus.md) | Data Services | Zero-downtime object storage replication and migration |
| [Liquid-Ceph](./liquid-ceph.md) | Data Services | Dynamic storage allocation across the Ceph cluster |
| [Observability & Audit](./observability/) | Observability | Metrics, dashboards, alerting, and audit — Prometheus, Perses, Prysm |

## Storage Interfaces

Ceph exposes three storage interfaces that CobaltCore services consume:

- **RBD (RADOS Block Device)** — thin-provisioned, resizable block volumes used by virtual machines and databases. Striped across OSDs for parallel I/O and backed by RADOS snapshots and replication.
- **CephFS** — POSIX-compliant distributed filesystem. Metadata is managed by a dedicated MDS cluster; data is striped across OSDs. Supports snapshots, quotas, and multiple active MDS daemons for horizontal metadata scaling.
- **RGW (RADOS Gateway)** — S3 and Swift-compatible object storage gateway. Supports multi-tenancy, versioning, lifecycle policies, server-side encryption, and multi-site active-active replication.

## Data Flow

```text
Applications / VMs
        │
┌───────┴────────────────────┐
│  RBD  │  CephFS  │  RGW   │  ← Ceph interfaces
└───────┴────────────────────┘
        │
    RADOS (Reliable Autonomic Distributed Object Store)
        │
   OSDs across cluster nodes
        │
   ┌────┴─────┐
   │  Rook    │  ← manages daemon lifecycle via Kubernetes CRDs
   └──────────┘
        │
   ┌────┴──────┐   ┌─────────┐   ┌────────────┐
   │  Arbiter  │   │  Chorus │   │ Liquid-Ceph│
   └───────────┘   └─────────┘   └────────────┘
   (quorum)        (replication)  (allocation)
        │
   ┌────┴──────────────────────────┐
   │  Observability & Audit        │
   │  Prometheus · Perses · Prysm  │
   └───────────────────────────────┘
```

## High Availability

Ceph achieves HA through monitor quorum (typically 3 or 5 monitors), OSD replication or erasure coding, and MDS standby daemons. In stretched deployments that span two sites, [Arbiter](./arbiter.md) deploys a third monitor at a tiebreaker site so that quorum is maintained even if one full site goes offline.

## See Also

- [Observability & Audit](./observability/) — Prometheus metrics, Perses dashboards, and Prysm CLI for the storage stack
- [Ceph upstream architecture docs](https://docs.ceph.com/en/latest/architecture/)
- [Rook documentation](https://rook.io/docs/rook/latest-release/Getting-Started/intro/)
