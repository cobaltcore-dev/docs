---
title: Bootstrap
order: 10
outline: deep
---

# Bootstrap

This page describes how a new CobaltCore cluster is stood up from bare metal — from the initial IronCore inventory through to a running Kubernetes control plane ready to receive workloads.

## Overview

Bootstrapping a CobaltCore cluster involves three phases:

1. **Hardware inventory** — IronCore discovers and registers physical machines
2. **Cluster provisioning** — Gardener creates the Kubernetes cluster on those machines
3. **Component installation** — CobaltCore operators, OpenStack, and storage are deployed into the cluster

```mermaid
graph LR
    A[Bare Metal Nodes] -->|IronCore discovers| B[Metal Inventory]
    B -->|Gardener provisions| C[Kubernetes Cluster]
    C -->|Helm + Operators| D[CobaltCore Stack]
```

## Phase 1: Hardware inventory

IronCore must be configured with access to your BMC (IPMI/Redfish) interfaces. Once connected, it discovers servers, collects hardware capabilities (CPU, memory, NIC topology), and makes them available as Kubernetes resources.

See [Platform — IronCore](/platform/ironcore) for configuration details.

## Phase 2: Cluster provisioning

Gardener creates a Kubernetes cluster using the machines made available by IronCore. You define a `Shoot` resource describing the cluster topology (node count, machine type, Kubernetes version), and Gardener reconciles it.

See [Platform — Gardener](/platform/gardener) for Shoot configuration and common operations.

## Phase 3: Component installation

Once the cluster is running, CobaltCore components are installed in order:

1. Rook and Ceph (storage must be ready before OpenStack services that need volumes)
2. OVN (networking must be ready before Nova and Neutron)
3. Hypervisor Operator
4. OpenStack (Nova, Neutron, Cinder, Keystone, Glance via Helm)
5. Observability stack (Prysm, Prometheus, Perses)
6. Management layer (Greenhouse, Aurora, Cortex)

The [Full Deployment guide](/getting-started/full-deployment) covers each step with the corresponding configuration references.
