---
title: Platform
order: 1
---

# Platform

The platform layer is the foundation that everything else in CobaltCore runs on. It covers bare metal lifecycle, cluster orchestration, and the operating system on hypervisor nodes.

## Components

| Component | Role |
|---|---|
| [IronCore](/platform/ironcore) | Bare metal discovery, provisioning, and lifecycle management |
| [Gardener](/platform/gardener) | Kubernetes cluster lifecycle (create, upgrade, delete) |
| [GardenLinux](/platform/gardenlinux) | Hardened Linux OS for hypervisor nodes |
| [Bootstrap](/platform/bootstrap) | How a new CobaltCore cluster is stood up end-to-end |

## How the layers relate

IronCore discovers physical machines and makes them available as managed resources. Gardener uses those resources to provision Kubernetes clusters. GardenLinux is the OS deployed on the hypervisor nodes that Gardener provisions. Everything above — Kubernetes operators, OpenStack services, Ceph — runs on top of this foundation.
