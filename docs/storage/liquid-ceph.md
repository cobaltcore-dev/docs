---
title: Liquid-Ceph
order: 60
---

# Liquid-Ceph

Liquid-Ceph integrates Ceph RADOS Gateway (RGW) with Limes for quota and usage
metering. It reports object-storage capacity and consumption through the Liquid
service-provider API.

## What it does

Liquid-Ceph maps RGW placement targets to Limes resources and availability
zones. Limes can then collect capacity and usage data and manage project quotas
for those resources.

## Integration

Liquid-Ceph implements the Liquid service-provider interface for RGW. It uses
Keystone for authentication and reads Ceph and RGW information to expose quota,
capacity, and usage metrics to Limes.

::: info
The Liquid-Ceph repository currently requires organization access. Public
deployment and configuration documentation is still being expanded.
:::

## See also

- [Storage - Ceph](./ceph)
- [Storage - Rook](./rook)
