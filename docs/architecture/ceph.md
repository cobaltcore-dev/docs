---
title: Ceph 
---

# Ceph 
Ceph is a clustered and distributed storage manager.

Ceph uniquely delivers object, block, and file storage in one unified system.
Ceph is highly reliable, easy to manage, and free. Ceph delivers extraordinary
scalability–thousands of clients accessing petabytes to exabytes of data. A
Ceph Node leverages commodity hardware and intelligent daemons, and a Ceph
Storage Cluster accommodates large numbers of nodes, which communicate with
each other to replicate and redistribute data dynamically.

## Architecture

## Ceph Block Device Summary (RBD)

### Overview of RBD

A block is a sequence of bytes, often 512 bytes in size. Block-based storage
interfaces represent a mature and common method for storing data on various
media types including hard disk drives (HDDs), solid-state drives (SSDs),
compact discs (CDs), floppy disks, and magnetic tape. The widespread adoption
of block device interfaces makes them an ideal fit for mass data storage
applications, including their integration with Ceph storage systems.

### Core Features

Ceph block devices are designed with three fundamental characteristics:
thin-provisioning, resizability, and data striping across multiple Object
Storage Daemons (OSDs). These devices leverage the full capabilities of RADOS
(Reliable Autonomic Distributed Object Store), including snapshotting,
replication, and strong consistency guarantees. Ceph block storage clients
establish communication with Ceph clusters through two primary methods: kernel
modules or the librbd library.

An important distinction exists between these two communication methods
regarding caching behavior. Kernel modules have the capability to utilize Linux
page caching for performance optimization. For applications that rely on the
librbd library, Ceph provides its own RBD (RADOS Block Device) caching
mechanism to enhance performance.

### Performance and Scalability

Ceph's block devices are engineered to deliver high performance combined with
vast scalability capabilities. This performance extends to various deployment
scenarios, including direct integration with kernel modules and virtualization
environments. The architecture supports Key-Value Machines (KVMs) such as QEMU,
enabling efficient virtualized storage operations.

Cloud-based computing platforms have embraced Ceph block devices as a storage
backend solution. Major cloud computing systems including OpenStack, OpenNebula,
and CloudStack integrate with Ceph block devices through their reliance on
libvirt and QEMU technologies. This integration allows these cloud platforms to
leverage Ceph's distributed storage capabilities for their virtual machine
storage requirements.

### Unified Storage Cluster

One of Ceph's significant architectural advantages is its ability to support
multiple storage interfaces simultaneously within a single cluster. The same
Ceph cluster can concurrently operate the Ceph RADOS Gateway for object
storage, the Ceph File System (CephFS) for file-based storage, and Ceph block
devices for block-based storage. This unified approach eliminates the need for
separate storage infrastructure for different storage paradigms, simplifying
management and reducing operational overhead.

This multi-interface capability allows organizations to deploy a single storage
solution that addresses diverse storage requirements, from traditional block
storage for databases and virtual machines to object storage for unstructured
data and file storage for shared filesystems. The convergence of these storage
types within one cluster provides operational efficiency and cost-effectiveness
while maintaining the performance and reliability characteristics required for
enterprise deployments.

### Technical Implementation

The thin-provisioning feature of Ceph block devices means that storage space is
allocated only as data is written, rather than pre-allocating the entire volume
capacity upfront. This approach optimizes storage utilization by avoiding waste
from unused pre-allocated space and allows for oversubscription strategies
where the sum of provisioned capacity can exceed physical capacity, based on
actual usage patterns.

The resizable nature of Ceph block devices provides operational flexibility,
allowing administrators to expand or contract volume sizes based on changing
application requirements without disrupting service availability. This dynamic
sizing capability supports evolving storage needs without requiring complex
migration procedures or extended downtime windows.

Data striping across multiple OSDs distributes data blocks across the cluster's
storage nodes. This distribution achieves two critical objectives: it increases
aggregate throughput by allowing parallel I/O operations across multiple
devices, and it ensures data availability through the replication mechanisms
built into RADOS. The striping process breaks data into smaller chunks that are
distributed according to the cluster's CRUSH (Controlled Scalable Decentralized
Placement of Replicated Data) algorithm, which determines optimal placement
based on cluster topology and configured policies.

### RADOS Integration

The integration with RADOS provides Ceph block devices with enterprise-grade
features. Snapshotting capability enables point-in-time copies of block devices,
supporting backup operations, testing scenarios, and recovery procedures.
Snapshots are space-efficient, storing only changed data rather than full
copies, and can be created instantaneously without impacting ongoing operations.

Replication ensures data durability by maintaining multiple copies of data
across different cluster nodes. The replication factor is configurable,
allowing organizations to balance storage efficiency against data protection
requirements. Strong consistency guarantees ensure that all replicas reflect the
same data state, preventing split-brain scenarios and ensuring data integrity
even during failure conditions.

The communication architecture between block storage clients and Ceph clusters
through kernel modules or librbd provides flexibility in deployment scenarios.
Kernel module integration enables direct access from operating systems, while
librbd allows applications to interact with Ceph block devices programmatically,
supporting a wide range of use cases from bare-metal servers to containerized
applications.

### Conclusion

Ceph block devices represent a sophisticated implementation of block storage
that combines the traditional simplicity of block-based interfaces with modern
distributed storage capabilities. The thin-provisioned, resizable architecture
with data striping across multiple OSDs provides a foundation for scalable,
high-performance storage. Integration with RADOS brings enterprise features
including snapshotting, replication, and strong consistency, while support for
both kernel modules and librbd ensures broad compatibility across deployment
scenarios. The ability to run block devices alongside object and file storage
within a unified cluster positions Ceph as a comprehensive storage solution
capable of addressing diverse organizational storage requirements through a
single infrastructure platform. This convergence of capabilities, combined with
proven integration with major virtualization and cloud platforms, establishes
Ceph block devices as a viable solution for modern data center storage needs.

## See Also
The architecture of the Ceph cluster is explained in [the Architecture
chapter of the upstream Ceph
documentation](https://docs.ceph.com/en/latest/architecture/)
