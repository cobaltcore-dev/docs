---
title: Why CobaltCore?
order: 3
---

# Why CobaltCore?

## The problem: traditional workloads in a cloud-native world

Most cloud infrastructure projects today focus on containerized workloads. But a large portion of real-world applications — databases, legacy enterprise software, latency-sensitive services — run as virtual machines and are not practical to containerize.

The standard options have real tradeoffs:

- **Public cloud** — operational simplicity but loss of control, unpredictable cost at scale, data sovereignty concerns
- **Vanilla OpenStack** — full control but operationally complex, hard to automate, no native Kubernetes integration
- **DIY Kubernetes + VMs** — possible with KubeVirt and similar projects, but lacks the mature cloud API layer (Nova, Neutron, Cinder) that operations teams and their automation tools already depend on

CobaltCore is built for teams that need the cloud API familiarity of OpenStack, the operational automation of Kubernetes, and the control of running their own infrastructure.

## Why Kubernetes as the foundation?

Kubernetes provides a declarative, self-healing control plane. Running OpenStack components as Kubernetes workloads means:

- Operators can express desired state for hypervisors, storage clusters, and network configurations as Kubernetes resources
- Standard Kubernetes tooling (Helm, operators, RBAC, GitOps) applies to infrastructure management
- The cluster lifecycle itself (creation, upgrades, scaling) is managed by Gardener, which is also Kubernetes-native

## Why OpenStack?

OpenStack provides mature, well-understood cloud APIs that operator tooling, internal platforms, and users already know. Nova, Neutron, and Cinder are stable interfaces with broad ecosystem support — tooling, SDKs, and automation built against these APIs does not need to change.

CobaltCore does not replace OpenStack. It makes OpenStack easier to run by managing it through Kubernetes operators and Helm, and by integrating it tightly with the storage and networking layers.

## Why Ceph?

Ceph is the only open source storage system that provides block, object, and file storage from a single unified cluster. For a cloud distribution, this matters: Nova uses RBD for VM disks, applications use RGW for object storage, and shared workloads use CephFS — all from one storage pool with consistent replication, access control, and observability.

Rook extends this by making Ceph a first-class Kubernetes workload, enabling declarative cluster management and automated remediation.

## Why OVN for networking?

OVN (Open Virtual Network) replaces the legacy Open vSwitch agent-per-node model with a centralized control plane and distributed forwarding. This means:

- Network state is managed consistently from a single source of truth (OVN Northbound DB)
- Fewer moving parts on each compute node
- Better scalability at large node counts

Neutron's OVN integration is now the recommended path for production OpenStack deployments.

## Design principles

1. **Prefer operators over runbooks.** Routine operations (node evacuation, storage rebalancing, certificate rotation) should be automated by operators, not manual procedures.
2. **Declarative over imperative.** Infrastructure state is expressed as Kubernetes resources, not scripts.
3. **Integrate, don't replace.** OpenStack, Ceph, and OVN are mature projects with large communities. CobaltCore integrates them rather than reimplementing their functionality.
4. **Open and composable.** Each layer can be understood and operated independently. You are not locked into a proprietary control plane.
