---
title: Rook
---

# Rook

Rook is an open-source cloud-native storage orchestrator that automates the
deployment, configuration, and management of [Ceph](./ceph.md) storage clusters
within Kubernetes environments. Built as a Kubernetes operator, Rook extends
Kubernetes with custom resource definitions (CRDs) that allow administrators to
define and manage Ceph clusters using native Kubernetes APIs and tools.  

Rook eliminates much of the operational complexity traditionally associated
with running Ceph by leveraging Kubernetes primitives for scheduling,
self-healing, and scaling. When deployed, Rook runs as a set of pods within the
Kubernetes cluster, managing the lifecycle of Ceph daemons (monitors, managers,
OSDs, MDS, and RGW) as containerized workloads. It automatically handles tasks
such as OSD provisioning from available storage devices, the management of the
monitor quorum. 

The system provides declarative configuration through YAML manifests, enabling
infrastructure-as-code practices for storage management. Administrators can
define storage classes that map to Ceph pools, allowing applications to
dynamically provision persistent volumes for block storage (RBD), shared file
systems (CephFS), or object storage (RGW) through standard Kubernetes
mechanisms.  

Rook continuously monitors cluster health and automatically responds to
failures by restarting failed daemons, replacing unhealthy OSDs, and
maintaining desired state as defined in the cluster specifications. It
integrates with [Kubernetes](./cluster.md) monitoring and logging systems,
providing visibility into storage operations alongside application workloads.

## See Also 
1. [The rook.io page](https://rook.io/)
1. [The Rook Documentation](https://rook.io/docs/rook/latest-release/Getting-Started/intro/)
1. [The Rook project repository](https://github.com/rook/rook)
