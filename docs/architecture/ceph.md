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

## RADOS Gateway (RGW) in Summary 

### Introduction

RADOS Gateway, commonly referred to as RGW or radosgw, is Ceph's object storage
interface that provides applications with a RESTful gateway to store objects
and metadata in a Ceph cluster. As one of Ceph's three primary storage
interfaces alongside CephFS (file storage) and RBD (block storage), RGW
transforms Ceph's underlying RADOS object store into a scalable, S3 and
Swift-compatible object storage service. This enables organizations to build
cloud storage solutions that are compatible with industry-standard APIs while
leveraging Ceph's distributed architecture for reliability, scalability, and
performance.

### Architecture and Design

RGW operates as a FastCGI or standalone HTTP service that sits atop the Ceph
Storage Cluster. Unlike direct RADOS access, RGW provides a higher-level
abstraction specifically designed for object storage workloads. The gateway
maintains its own data formats, user database, authentication mechanisms, and
access control systems independent of the underlying Ceph cluster's
authentication.

When a client stores data through RGW, the gateway receives HTTP requests,
authenticates the user, authorizes the operation, and then translates the
request into RADOS operations. Objects stored via RGW are ultimately persisted
as RADOS objects in the Ceph cluster, but RGW manages the mapping between
S3/Swift objects and the underlying RADOS objects. This abstraction layer allows
a single S3 or Swift object to potentially map to multiple RADOS objects,
particularly for large files that are striped across the cluster.

### API Compatibility

One of RGW's most significant features is its dual API compatibility. RGW
provides RESTful interfaces compatible with both Amazon S3 and OpenStack Swift,
enabling applications designed for these platforms to work with Ceph without
modification. This compatibility extends beyond basic object operations to
include advanced features like multipart uploads, versioning, lifecycle
management, and bucket policies.

The S3-compatible API supports a comprehensive set of operations including
bucket creation and deletion, object PUT/GET/DELETE operations, ACL management,
and metadata handling. The Swift-compatible API provides similar functionality
using Swift's terminology and conventions, with containers instead of buckets
and account/container/object hierarchy. Importantly, RGW implements a unified
namespace, meaning data written through the S3 API can be read through the Swift
API and vice versa, providing exceptional flexibility for multi-application
environments.

### Multi-Tenancy and User Management

RGW implements sophisticated multi-tenancy capabilities that allow multiple
independent users and organizations to share the same Ceph cluster while
maintaining complete isolation. The system supports multiple authentication
mechanisms including built-in user management, LDAP integration, and integration
with external authentication systems like Keystone for OpenStack environments.

Users in RGW are organized into a hierarchical structure. Each user belongs to a
tenant (which can be implicit or explicit), and users can have multiple access
keys for different applications or purposes. RGW manages user credentials,
quotas, and usage statistics independently, enabling service providers to offer
object storage as a multi-tenant service with per-user billing and resource
limits.

### Data Organization

RGW organizes data using a bucket-based model for S3 compatibility (containers
in Swift terminology). Buckets are logical containers that hold objects, with
each bucket having its own policies, ACLs, and configuration. Objects within
buckets are identified by unique keys and can include arbitrary metadata
alongside the actual data payload.

Internally, RGW uses multiple RADOS pools to organize different types of data.
Separate pools typically store bucket indexes, data objects, and metadata,
allowing administrators to apply different replication or erasure coding
strategies to different data types. For example, bucket indexes might use
replication for fast access while large data objects use erasure coding for
storage efficiency.

### Advanced Features

RGW supports numerous advanced object storage features that make it suitable for
production deployments. Object versioning allows multiple versions of the same
object to coexist, enabling recovery from accidental overwrites or deletions.
Lifecycle management policies automate the transition of objects between storage
classes or deletion after specified periods, reducing storage costs and
administrative overhead.

Server-side encryption provides data protection at rest, with support for
multiple encryption modes including customer-provided keys. Cross-origin
resource sharing (CORS) configuration enables web applications to access RGW
directly from browsers. Bucket notifications allow applications to receive
real-time events when objects are created, deleted, or modified, enabling
event-driven architectures.

### Scalability and Performance

RGW's architecture enables horizontal scaling to meet growing storage and
throughput demands. Multiple RGW instances can be deployed behind load
balancers to distribute client requests across many gateways. Each RGW instance
operates independently, communicating directly with the underlying Ceph
cluster, avoiding any single point of contention.

For improved performance, RGW implements various optimization strategies. It
can cache frequently accessed objects and metadata to reduce latency for
popular content. Asynchronous operations handle time-consuming tasks like
garbage collection and data synchronization without blocking client requests.
The gateway also supports byte-range requests, enabling efficient partial
object retrieval for large files and supporting features like HTTP video
streaming.

### Multi-Site Capabilities

RGW includes robust multi-site replication capabilities for disaster recovery,
geographic distribution, and compliance requirements. The multi-site
architecture supports active-active configurations where multiple RGW clusters
can accept writes simultaneously, with changes automatically synchronized
across sites. This enables organizations to build globally distributed object
storage systems with local read/write access and automatic data replication.

Metadata and data can be replicated independently with different strategies,
allowing for flexible topology designs. Zone groups organize multiple zones
(independent RGW deployments) into replication domains, while periods define
consistent configuration states across all zones. This sophisticated
replication framework supports complex scenarios like hub-and-spoke topologies,
full-mesh replication, and tiered storage architectures.

### Monitoring and Operations

RGW provides comprehensive monitoring capabilities through usage statistics,
performance metrics, and administrative APIs. Administrators can track
bandwidth consumption, request rates, and storage utilization on a per-user or
per-bucket basis. Integration with standard monitoring tools allows RGW metrics
to be collected and visualized alongside other infrastructure components.

The admin API enables programmatic management of users, buckets, and quotas,
facilitating automation and integration with billing systems or custom
management tools. Command-line tools provide capabilities for troubleshooting,
data inspection, and emergency operations.

### Conclusion

RADOS Gateway represents a mature, feature-rich object storage solution that
brings cloud-compatible APIs to Ceph's distributed storage platform. By
providing S3 and Swift compatibility, RGW enables organizations to build
private cloud storage solutions or offer object storage as a service while
maintaining control over their infrastructure. Its scalability, multi-tenancy
support, and advanced features make it suitable for use cases ranging from
backup and archive to content distribution and application data storage. As
part of the unified Ceph storage platform, RGW benefits from the same
reliability, performance, and operational characteristics that make Ceph a
leading choice for software-defined storage solutions.

## See Also
The architecture of the Ceph cluster is explained in [the Architecture
chapter of the upstream Ceph
documentation](https://docs.ceph.com/en/latest/architecture/)
