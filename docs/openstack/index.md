---
title: OpenStack
order: 1
outline: deep
---

# OpenStack

OpenStack is the cloud services layer in CobaltCore. It provides the compute, networking, block storage, identity, and image APIs that users and automation tools interact with. CobaltCore deploys OpenStack via Helm charts, with each service configured to integrate with the underlying compute, storage, and networking layers.

## Services

| Service | API | Role |
|---|---|---|
| [Nova](/openstack/nova) | Compute | VM lifecycle, scheduling, live migration |
| [Neutron](/openstack/neutron) | Networking | Virtual networks, ports, security groups via OVN |
| [Cinder](/openstack/cinder) | Block Storage | Volume management backed by NetApp/NFS or Ceph RBD |
| [Keystone](/openstack/keystone) | Identity | Authentication and service catalog |
| [Glance](/openstack/glance) | Image | VM image storage and distribution |

## Deployment model

All services are deployed as Kubernetes workloads via Helm into a dedicated namespace. Each service runs with its own MariaDB database and connects to a shared RabbitMQ cluster for async messaging.

```
Control Plane Cluster
├── openstack namespace
│   ├── nova (API, Conductor, Scheduler)
│   ├── neutron (API, OVN-NB, OVN-SB, OVN-NorthD)
│   ├── cinder (API, Volume Services)
│   ├── keystone
│   └── glance
│
Compute Clusters
└── Per node (daemonsets)
    ├── nova-compute-agent
    ├── ovn-controller
    └── (hypervisor agents - see Compute layer)
```

## CobaltCore-specific choices

**Why OVN for networking?** Neutron's OVN backend replaces the per-node Open vSwitch agents with a centralized control plane (OVN-NB/SB databases) and distributed forwarding. This reduces per-node complexity and scales better at large node counts. See [Networking - OVN](/networking/ovn).

**Why NetApp/NFS for Cinder?** In CobaltCore's reference configuration, Cinder uses a NetApp filer for block volumes delivered as NFS mounts. This enables thin provisioning and hardware-level snapshots. Ceph RBD is an alternative backend for environments without a NetApp filer.

**Cells architecture:** Nova's multi-cell architecture is available but simplified in CobaltCore's default configuration. See the [Nova cells documentation](https://docs.openstack.org/nova/latest/admin/cells.html) for production cell design.
