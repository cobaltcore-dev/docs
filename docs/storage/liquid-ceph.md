---
title: Liquid-Ceph
order: 60
---

# Liquid-Ceph

::: tip Source Code
[github.com/cobaltcore-dev/liquid-ceph](https://github.com/cobaltcore-dev/liquid-ceph)
:::

Liquid-Ceph enables dynamic, on-demand storage allocation across the Ceph cluster. It integrates with the [Liquid](https://github.com/sapcc/liquid) framework to expose Ceph storage capacity as a schedulable resource in the CobaltCore cloud.

## What it does

Rather than statically pre-allocating Ceph pools and storage quotas, Liquid-Ceph allows capacity to be requested and released dynamically — storage is allocated when needed and returned to the shared pool when no longer required. This improves cluster utilization and simplifies capacity planning.

## Integration

Liquid-Ceph implements the Liquid service provider interface, exposing Ceph RBD and RGW capacity to the Liquid scheduler. Nova and Cinder can use this to make storage placement decisions based on real-time availability.

::: info
Detailed deployment and configuration documentation is being expanded. See the [Liquid-Ceph GitHub repository](https://github.com/cobaltcore-dev/liquid-ceph) for current development state.
:::

## See also

- [Storage — Ceph](./ceph)
- [Storage — Rook](./rook)
