---
title: Chorus
order: 30
outline: deep
---

# Chorus

::: info
The Chorus source and detailed operational documentation currently require
CobaltCore organization access.
:::

Chorus is data replication software designed for Object Storage systems,
supporting S3 and OpenStack Swift APIs. It enables zero-downtime migration
between storage systems, maintains synchronized backups for disaster recovery,
and verifies migration integrity through consistency checks.

Chorus operates through two main components: Chorus Proxy, an S3 proxy that
captures changes, and Chorus Worker, which processes replication tasks and
webhook events. Users configure storage credentials, designating one endpoint
as "main" while others become "followers." Requests route through Chorus's S3
API to the main storage and asynchronously replicate to follower endpoints.

The system supports user-level and bucket-level replication policies, allowing
users to pause and resume replication via web admin UI or CLI. Chorus handles
initial replication of existing data in the background and can accept change
events via webhooks when proxy deployment isn't feasible, supporting S3 bucket
notifications and Swift access-log events.

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

- [Storage - Ceph](./ceph.md)
