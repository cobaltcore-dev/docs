---
title: Changelog
---

# Change Log

| Date          | Change                        | git hash  |
| :---          | :---                          |           |
| 2025-11-26    | Add ceph.md, an overview page that explains the function and purpose of Ceph                   | a01c4435  |
| 2026-03-03    | Add a page that explains how to use Rook, a tool for deploying Ceph                 | 499a3a76  |
| 2026-03-04    | Add documentation for Prysm, a CLI tool for real-time monitoring of RGW, Ceph storage clusters, and various hardware components.       | deeb3ea8  |
| 2026-03-12    | Add documentation for Arbiter, a tool that deploys external arbiters in Rook-provisioned clusters in an effort to avoid split-brain scenarios (scenarios in which each site thinks that it's the primary) | 26891975  |
| 2026-03-13    | Add documentation for Chorus, data replication software that supports S3 and OpenStack Swift APIs and enables zero-downtime migration between storage systems| 36ed4417  |
| 2026-03-23    | Add Architectural information to ceph.md, including sections on data storage and organization, eliminating centralization, the cluster map, high availability, authentication, security, smart daemons, hyperscale, dynamic cluster management, and client interfaces (RGB, RGW, CephFS).  | 4021e59d  |
| 2026-03-26    | Add RBD information to the architecture page, including an explanation of blocks, an explanation of the fundamentals of Ceph block devices, differences in the caching behavior of kernel modules and of applications that rely on the librd library, the value of having a unified storage cluster, thin provisioning, resizable Ceph block devices, data striping across multiple OSDs, integration with RADOS, snapshotting capabilities, and the configurable nature of Ceph's replication factor.  | f977c63a  |
| 2026-03-31    | Add a summary of RGW to the Architecture page, including an explanation of RGW as a RESTful gateway to store objects and metadata in a Ceph cluster, an explanation of the operation of RGW (as a FastCGI or standalone HTTP service sitting atop the Ceph Storage Cluster), an explanation of RGW's dual API compatibility (with both Amazon S3 and OpenStack Swift), an explanation of the operations supported by the S3-compatible API, an explanation of the operations supported by the Swift-compatible API, an explanation of how RGW can allow multiple independent users to share the same Ceph cluster while maintaining isolation, an explanation of the bucket-based model RGW uses to organize data for S3 compatibility, an explanation of RGW's use of RADOS pools to organize different types of data internally, explanations of advanced features such as object versioning and server-side encryption and cross-origin resource sharing, explanations of RGW's support of horizontal scaling and caching of frequently-accessed objects (to reduce latency), explanations of multi-site replication, asynchronous execution of time-consuming tasks such as garbage collection and data synchronization, explanation of byte-range requests (for large-file retrieval), and explanation of monitoring  | 628dfd0c  |
| 2026-03-31    | Add a summary of CephFS to the Architecture page, explaining data and metadata management, ceph-mds, POSIX-compliance, methods of accessing CephFS (kernel client, FUSE, libcephfs), snapshots, quotas, support for multiple filesystems, access control (ACLs), and path-based access restrictions | fd962649  |
| 2026-04-28    | Change log created            | 953b13ff  |


![Bundesministerium für Wirtschaft und Energie (BMWE)-EU funding logo](https://apeirora.eu/assets/img/BMWK-EU.png "apeirora_logo")
