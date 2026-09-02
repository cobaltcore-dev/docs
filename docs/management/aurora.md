---
title: Aurora
order: 10
---

# Aurora

Aurora is the cloud management frontend for CobaltCore. It provides operators and users with a web interface for managing virtual machines, networks, storage volumes, and other OpenStack resources without using the OpenStack CLI or raw API calls.

## What it provides

- **VM management** — create, start, stop, migrate, and delete virtual machines
- **Network management** — manage networks, subnets, routers, and security groups
- **Storage management** — create and attach volumes, manage snapshots
- **Resource overview** — visibility into hypervisor utilization, capacity, and health across the cluster
- **Cortex integration** — placement recommendations surfaced in the UI

## Role in the stack

Aurora sits above the OpenStack API layer. It communicates with Keystone for authentication, Nova for compute operations, Neutron for networking, and Cinder for storage. It does not bypass these APIs — it is a UI client on top of them.

::: info
Detailed deployment and configuration documentation is being expanded. See the Aurora GitHub repository for current development state.
:::
