---
title: Cloud Storage
---

# Cloud Storage

CobaltCore's cloud storage layer is built on [Ceph](./ceph.md), an open-source, distributed storage system that delivers object, block, and file storage in a single unified platform. The surrounding components manage its lifecycle, replication, observability, and high-availability configuration.

| Component | Role |
|-----------|------|
| [Ceph](./ceph.md) | Distributed storage engine |
| [Rook](./rook.md) | Kubernetes operator that automates Ceph deployment and management |
| [Chorus](./chorus.md) | Data replication across object storage systems |
| [Arbiter](./arbiter.md) | External arbiter monitors for Ceph quorum in stretched clusters |
| [Prysm](./prysm.md) | Observability CLI for Ceph clusters and RGW deployments |
