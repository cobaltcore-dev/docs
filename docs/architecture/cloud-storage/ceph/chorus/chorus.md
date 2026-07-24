---
title: Chorus
---

# Chorus 

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
