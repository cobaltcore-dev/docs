---
title: Getting Started
order: 1
---

# Getting Started

CobaltCore can be deployed in different configurations depending on your goals.

## Deployment tracks

### Minimal environment

Start here if you want to explore CobaltCore, develop against it, or understand how the pieces fit together with the smallest possible footprint.

→ [Deploy a minimal environment](/getting-started/minimal)

**What you get:** a single-node control plane, one hypervisor node, block storage, and the OpenStack APIs. No HA, no stretched storage, no full observability stack.

**Prerequisites:** basic Kubernetes knowledge, access to at least two bare metal or virtual machines.

---

### Full production deployment

Start here if you are deploying CobaltCore to run real workloads at scale.

→ [Deploy a full production environment](/getting-started/full-deployment)

**What you get:** HA control plane, multiple hypervisor nodes, Ceph stretched cluster with Arbiter, full observability stack (Prysm, Prometheus, Perses), and the management frontend (Aurora, Greenhouse).

**Prerequisites:** familiarity with Kubernetes operators and Helm, access to bare metal infrastructure managed by IronCore.
