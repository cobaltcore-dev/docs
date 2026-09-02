---
title: Compute
order: 1
---

# Compute

The compute layer runs virtual machines on bare metal nodes using KVM and libvirt. Kubernetes operators manage node lifecycle, health monitoring, and failover.

## Components

| Component | Role |
|---|---|
| [Hypervisor](/compute/hypervisor) | KVM hypervisor managed by the Hypervisor Operator; runs VMs via libvirt |
| [HA Service](/compute/ha-service) | Monitors hypervisor health and triggers evacuation when nodes fail |
| [GPU / SR-IOV](/compute/gpu) | Passthrough GPU and SR-IOV NIC support for latency-sensitive workloads |

## How it fits in the stack

The compute layer sits between the platform (IronCore-managed bare metal, Gardener-managed Kubernetes) and OpenStack (Nova scheduler, which places VMs on hypervisors). The Hypervisor Operator connects these: it registers new nodes discovered by IronCore into Nova, and drives the evacuation flow when a node needs to be drained.
