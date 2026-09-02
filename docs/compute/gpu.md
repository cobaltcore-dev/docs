---
title: GPU & SR-IOV
order: 30
---

# GPU & SR-IOV

CobaltCore supports passthrough of GPUs and SR-IOV network interfaces to virtual machines for workloads that require direct hardware access - machine learning inference, HPC, and latency-sensitive networking.

::: info Documentation in progress
This section is being expanded. The information below describes the intended architecture and current capabilities.
:::

## GPU passthrough

GPU passthrough uses VFIO (Virtual Function I/O) to assign a physical GPU directly to a VM, bypassing the hypervisor's virtualization layer. The VM sees the GPU as if it were physically attached.

**Requirements:**
- CPU and motherboard with IOMMU support (Intel VT-d or AMD-Vi) enabled in BIOS
- VFIO kernel modules loaded on the GardenLinux hypervisor
- GPU bound to the `vfio-pci` driver rather than the native driver

**OpenStack integration:** Nova exposes GPU resources as traits (`CUSTOM_GPU_*`) through the placement API. Cortex placement policies can target GPU-capable hypervisors for VM scheduling.

## SR-IOV networking

SR-IOV (Single Root I/O Virtualization) allows a single physical NIC to present multiple virtual functions (VFs) to VMs, each with near-native throughput and latency.

**Requirements:**
- SR-IOV capable NIC with SR-IOV enabled in BIOS
- `sriov-device-plugin` deployed on hypervisor nodes
- Neutron SR-IOV agent configured

**OpenStack integration:** Neutron manages SR-IOV ports. VMs with SR-IOV ports bypass OVN and receive a VF directly.

## See also

- [Compute - Hypervisor](/compute/hypervisor)
- [Networking - OVN](/networking/ovn)
