---
title: Architecture
order: 2
outline: deep
---

# Architecture

```
┌──────────────────────────────────────────────────────────┐
│  Management       Aurora · Greenhouse · Cortex           │
├──────────────────────────────────────────────────────────┤
│  OpenStack        Nova · Neutron · Cinder · Keystone     │
│                   Glance                                  │
├──────────────────────────────────────────────────────────┤
│  Compute          KVM Hypervisor · HA Service · GPU      │
│  Storage          Ceph · Rook · Arbiter · Chorus         │
│  Networking       OVN                                    │
├──────────────────────────────────────────────────────────┤
│  Observability    Prysm · Prometheus · Perses            │
├──────────────────────────────────────────────────────────┤
│  Platform         Kubernetes · Gardener · IronCore       │
│                   GardenLinux                            │
└──────────────────────────────────────────────────────────┘
```

## Platform

## Compute, Storage, Networking

- **[Compute](/compute/)**
- **[Storage](/storage/)**
- **[Networking](/network/)**

## Observability

## OpenStack

## Management

## Data flow: provisioning a VM
