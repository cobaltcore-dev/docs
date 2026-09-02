---
title: GardenLinux
order: 40
---

# GardenLinux

[GardenLinux](https://gardenlinux.io) is the Linux distribution used as the operating system on CobaltCore hypervisor nodes. It is a Debian-based, cloud-optimized OS designed specifically for running Kubernetes and virtualization workloads in production.

## Why GardenLinux?

- **Minimal attack surface** - stripped to only what is needed; no package manager or shell in production images
- **Immutable by default** - OS is read-only; changes are applied by replacing the image, not modifying the running system
- **Kernel tuned for KVM** - includes the patches and configuration needed for high-performance libvirt and KVM workloads
- **Automated updates** - Gardener manages GardenLinux upgrades on hypervisor nodes with zero-downtime rolling updates

## Role in CobaltCore

GardenLinux is the OS layer that the KVM hypervisor agents run on. The Hypervisor Operator interacts with GardenLinux through systemd unit management and the node agent - no SSH or manual shell access is needed for routine operations.

The hypervisor stack runs on top of GardenLinux:

```
VMs
└── libvirt / KVM
    └── Containerized agents (Nova, Neutron, HA, Node)
        └── GardenLinux
            └── Bare metal node (managed by IronCore)
```

## Further reading

- [GardenLinux documentation](https://gardenlinux.io/docs)
- [GardenLinux GitHub](https://github.com/gardenlinux/gardenlinux)
