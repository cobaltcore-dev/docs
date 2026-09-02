---
title: Chorus
order: 50
outline: deep
---

# Chorus

::: tip Source Code
[github.com/cobaltcore-dev/chorus](https://github.com/cobaltcore-dev/chorus)
:::

Chorus provides zero-downtime data replication and migration between S3 and Swift object storage systems. It runs as a transparent proxy in front of a Ceph RGW cluster, enabling live migration from one object store to another without application downtime.

## What Chorus does

- **Replication** - mirrors objects from a source object store to a destination, at the user or bucket level
- **Migration** - moves data between object stores without downtime; traffic is proxied so reads and writes work during migration
- **Multi-backend support** - works with any S3 or Swift-compatible storage, not only Ceph

## Architecture

Chorus has two components:

| Component | Role |
|---|---|
| **Chorus Proxy** | Intercepts S3/Swift requests, proxies them to the active backend, and enqueues replication tasks |
| **Chorus Worker** | Processes replication tasks in the background; copies objects to the destination backend |

Replication policies are configured per user or per bucket. Webhooks are supported for event-driven replication triggers.

## Use cases in CobaltCore

- **Storage migration** - move RGW data to a new Ceph cluster (e.g., during hardware refresh) without application changes
- **Multi-site replication** - replicate buckets across two sites for disaster recovery
- **Parallel writes** - write to both a primary and secondary store during a transition period

## See also

- [Chorus full documentation](https://github.com/cobaltcore-dev/chorus)
- [Storage - Ceph](./ceph)
