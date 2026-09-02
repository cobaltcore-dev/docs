---
title: Glance (Image)
order: 50
---

# Glance (Image)

Glance is the OpenStack image service. It stores and distributes VM images that Nova uses when creating virtual machines.

## Role in CobaltCore

When a user requests a new VM, Nova asks Glance for the image. Glance retrieves it from its backend store and streams it to the compute node (or serves it via a URL that the hypervisor can fetch directly).

## Key concepts

| Concept | Description |
|---|---|
| **Image** | A VM disk image in a format Nova can boot (qcow2, raw, ISO) |
| **Image store** | The backend where image data is persisted (Ceph RBD or Swift) |
| **Image metadata** | Properties attached to an image (minimum RAM, disk size, OS type, architecture) |

## Backend

In CobaltCore, Glance typically uses **Ceph RBD** as its image store. Images uploaded to Glance are stored as RBD objects, and Nova can use copy-on-write cloning to provision VM disks from Glance images without copying data.

## Deployment

Glance is deployed via Helm as part of the OpenStack chart set.

::: info
Detailed configuration documentation (image import workflows, image signing, multi-store configuration) is being added. See the [OpenStack Glance docs](https://docs.openstack.org/glance/latest/) in the meantime.
:::
