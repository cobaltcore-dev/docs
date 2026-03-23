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

### The Ceph Storage Cluster

At its core, Ceph provides an infinitely scalable storage cluster based on
RADOS (Reliable Autonomic Distributed Object Store), a distributed storage
service that uses the intelligence in each node to secure data and provide it
to clients. A Ceph Storage Cluster consists of four daemon types: Ceph
Monitors, which maintain the master copy of the cluster map; Ceph OSD Daemons,
which check their own state and that of other OSDs; Ceph Managers, serving as
endpoints for monitoring and orchestration; and Ceph Metadata Servers (MDS),
which manage file metadata when CephFS provides file services.

Storage cluster clients and Ceph OSD Daemons use the CRUSH (Controlled
Scalable Decentralized Placement of Replicated Data) algorithm to compute data
location information, avoiding bottlenecks from central lookup tables. This
algorithmic approach enables Ceph's high-level features, including a native
interface to the storage cluster via librados and numerous service interfaces
built atop it.

### Data Storage and Organization

The Ceph Storage Cluster receives data from clients through various
interfaces—Ceph Block Device, Ceph Object Storage, CephFS, or custom
implementations using librados—and stores it as RADOS objects. Each object
resides on an Object Storage Device (OSD), with Ceph OSD Daemons controlling
read, write, and replication operations. The default BlueStore backend stores
objects in a monolithic, database-like fashion within a flat namespace, meaning
objects lack hierarchical directory structures. Each object has an identifier,
binary data, and name/value pair metadata, with clients determining object data
semantics.

### Eliminating Centralization

Traditional architectures rely on centralized components—gateways, brokers, or
APIs—that act as single points of entry, creating failure points and
performance limits. Ceph eliminates these centralized components, enabling
clients to interact directly with Ceph OSDs. OSDs create object replicas on
other nodes to ensure data safety and high availability, while monitor clusters
ensure high availability. The CRUSH algorithm replaces centralized lookup
tables, providing better data management by distributing work across all OSD
daemons and communicating clients, using intelligent data replication to ensure
resiliency suitable for hyper-scale storage.

### Cluster Map and High Availability

For proper functioning, Ceph clients and OSDs require current cluster topology
information stored in the Cluster Map, actually a collection of five maps: the
Monitor Map (containing cluster fsid, monitor positions, names, addresses, and
ports), the OSD Map (containing cluster fsid, pool lists, replica sizes, PG
numbers, and OSD statuses), the PG Map (containing PG versions, timestamps, and
placement group details), the CRUSH Map (containing storage devices, failure
domain hierarchy, and traversal rules), and the MDS Map (containing MDS map
epoch, metadata storage pool, and metadata server information). Each map
maintains operational state change history, with Ceph Monitors maintaining
master copies including cluster members, states, changes, and overall health.

Ceph uses monitor clusters for reliability and fault tolerance. To establish
consensus about cluster state, Ceph employs the Paxos algorithm, requiring a
majority of monitors to agree (one in single-monitor clusters, two in
three-monitor clusters, three in five-monitor clusters, and so forth). This
prevents issues when monitors fall behind due to latency or faults.

### Authentication and Security

The cephx authentication system authenticates users and daemons while
protecting against man-in-the-middle attacks, though it doesn't address
transport encryption or encryption at rest. Using shared secret keys, cephx
enables mutual authentication without revealing keys. Like Kerberos, each
monitor can authenticate users and distribute keys, eliminating single points
of failure. The system issues session keys encrypted with users' permanent
secret keys, which clients use to request services. Monitors provide tickets
authenticating clients against OSDs handling data, with monitors and OSDs
sharing secrets enabling ticket use across any cluster OSD or metadata server.
Tickets expire to prevent attackers from using obtained credentials, protecting
against message forgery and alteration as long as secret keys remain secure
before expiration.

### Smart Daemons and Hyperscale

Ceph's architecture makes OSD Daemons and clients cluster-aware, unlike
centralized storage clusters requiring double dispatches that bottleneck at
petabyte-to-exabyte scale. Each Ceph OSD Daemon knows other OSDs in the
cluster, enabling direct interaction with other OSDs and monitors. This
awareness allows clients to interact directly with OSDs, and because monitors
and OSD daemons interact directly, OSDs leverage aggregate cluster CPU and RAM
resources.

This distributed intelligence provides several benefits: OSDs service clients
directly, improving performance by avoiding centralized interface connection
limits; OSDs report membership and status (up or down), with neighboring OSDs
detecting and reporting failures; data scrubbing maintains consistency by
comparing object metadata across replicas, with deeper scrubbing comparing data
bit-for-bit against checksums to find bad drive sectors; and replication
involves client-OSD collaboration, with clients using CRUSH to determine object
locations, mapping objects to pools and placement groups, then writing to
primary OSDs that replicate to secondary OSDs.

### Dynamic Cluster Management

Pools are logical partitions for storing objects, with clients retrieving
cluster maps from monitors and writing RADOS objects to pools. CRUSH
dynamically maps placement groups (PGs) to OSDs, with clients storing objects
by having CRUSH map each RADOS object to a PG. This abstraction layer between
OSDs and clients enables adaptive cluster growth, shrinkage, and data
redistribution when topology changes. The indirection allows dynamic
rebalancing when new OSDs come online.

Clients compute object locations rather than querying, requiring only object ID
and pool name. Ceph hashes object IDs, calculates hash modulo PG numbers,
retrieves pool IDs from pool names, and prepends pool IDs to PG IDs. This
computation proves faster than query sessions, with CRUSH enabling clients to
compute expected object locations and contact primary OSDs for storage or
retrieval.

### Client Interfaces

Ceph provides three client types: Ceph Block Device (RBD) offers resizable,
thin-provisioned, snapshottable block devices striped across clusters for high
performance; Ceph Object Storage (RGW) provides RESTful APIs compatible with
Amazon S3 and OpenStack Swift; and CephFS provides POSIX-compliant filesystems
mountable as kernel objects or FUSE. Modern applications access storage through
librados, which provides direct parallel cluster access supporting pool
operations, snapshots, copy-on-write cloning, object read/write operations,
extended attributes, key/value pairs, and object classes.

The architecture demonstrates how Ceph's distributed, intelligent design
eliminates traditional storage limitations, enabling massive scalability while
maintaining reliability and performance through algorithmic data placement,
autonomous daemon operations, and direct client-storage interactions.

## See Also
The architecture of the Ceph cluster is explained in [the Architecture
chapter of the upstream Ceph
documentation](https://docs.ceph.com/en/latest/architecture/)
