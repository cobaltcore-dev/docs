---
title: What is CobaltCore?
order: 1
---

# What is CobaltCore?

CobaltCore is an open source, opinionated OpenStack distribution built on Kubernetes. It brings cloud-native operations to traditional, non-containerized workloads — giving operators the automation, resilience, and observability of a modern platform without requiring their applications to change.

At its core, CobaltCore assembles proven open source technologies — Kubernetes, OpenStack, Ceph, OVN — into a coherent, production-ready distribution with a clear operational model. Instead of assembling and integrating these components yourself, you get a tested stack with sensible defaults, lifecycle management, and a consistent control plane.

## Who it's for

CobaltCore is for teams that:

- Run KVM-based virtual machines at scale and need automated provisioning, evacuation, and failover
- Want OpenStack's cloud APIs (Nova, Neutron, Cinder) managed declaratively through Kubernetes operators
- Need distributed Ceph storage with high availability across failure domains
- Are adopting Kubernetes as a foundation but still need to support traditional VM workloads

## Key capabilities

| Capability | How CobaltCore delivers it |
|---|---|
| Server discovery and provisioning | IronCore manages bare metal lifecycle; GardenLinux is deployed as the hypervisor OS |
| KVM hypervisor management | Kubernetes operators control hypervisor configuration, upgrades, and health |
| High availability for VMs | HA service monitors hypervisor health and triggers live migration or evacuation automatically |
| OpenStack cloud APIs | Nova, Neutron, Cinder, Keystone, and Glance deployed and managed via Helm |
| Distributed storage | Ceph managed by Rook, with Arbiter for stretched-cluster quorum |
| Observability | Prysm, Prometheus, and Perses provide metrics, alerting, and dashboards |
| Management UI | Aurora provides a cloud management frontend; Greenhouse is the monitoring umbrella |

## How to navigate these docs

- **[Getting Started](/getting-started/)** — start here if you want to deploy CobaltCore
- **[Architecture](/overview/architecture)** — understand how the layers fit together
- **[Why CobaltCore](/overview/why)** — the reasoning behind the design decisions
- Layer sections (**Platform**, **Compute**, **OpenStack**, **Storage**, **Networking**, **Observability**, **Management**) — deep-dive reference for each part of the stack
