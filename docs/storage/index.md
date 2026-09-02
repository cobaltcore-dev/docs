---
title: Storage
order: 1
outline: deep
---

# Storage

CobaltCore's storage layer is built on [Ceph](./ceph), a distributed storage system that delivers block, file, and object storage from a single unified cluster. The surrounding components handle Kubernetes-native lifecycle management, high-availability quorum in stretched clusters, object replication, and dynamic storage allocation.

## Architecture

The storage stack is organized into three layers:

**Foundation** - Ceph provides the core distributed storage engine. All other components either operate it, extend it, or observe it.

**Operations** - [Rook](./rook) manages the full Ceph cluster lifecycle as a Kubernetes operator. [Arbiter](./arbiter) extends quorum into stretched topologies by deploying external monitors at a tiebreaker site.

**Data Services** - [Chorus](./chorus) provides zero-downtime S3/Swift object replication and migration. [Liquid-Ceph](./liquid-ceph) enables dynamic, on-demand storage allocation.

## Components

| Component | Layer | Role |
|---|---|---|
| [Ceph](./ceph) | Foundation | Distributed storage engine - block (RBD), file (CephFS), object (RGW) |
| [Rook](./rook) | Operations | Kubernetes operator for Ceph lifecycle management |
| [Arbiter](./arbiter) | Operations | External Ceph monitors for quorum in stretched clusters |
| [Chorus](./chorus) | Data Services | Zero-downtime object storage replication and migration |
| [Liquid-Ceph](./liquid-ceph) | Data Services | Dynamic storage allocation across the Ceph cluster |

## Storage interfaces

| Interface | Use case |
|---|---|
| **RBD** (RADOS Block Device) | VM disks, database volumes - thin-provisioned, snapshotted block storage |
| **CephFS** | Shared POSIX filesystem for workloads that need file access across multiple VMs |
| **RGW** (RADOS Gateway) | S3 and Swift-compatible object storage for application data |

## Data flow

```
Applications / VMs
        │
┌───────┴────────────────────┐
│  RBD  │  CephFS  │  RGW    │  ← Ceph interfaces
└───────┴────────────────────┘
        │
    RADOS (distributed object store)
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
```

## High availability

Ceph achieves HA through monitor quorum (3 or 5 monitors), OSD replication or erasure coding, and MDS standby daemons. In stretched deployments spanning two sites, [Arbiter](./arbiter) deploys a third monitor at a tiebreaker site to maintain quorum if one site goes offline.

## See also

- [Observability](/observability/) - Prometheus metrics, Perses dashboards, and Prysm for the storage stack
- [Ceph upstream architecture docs](https://docs.ceph.com/en/latest/architecture/)
- [Rook documentation](https://rook.io/docs/rook/latest-release/Getting-Started/intro/)
