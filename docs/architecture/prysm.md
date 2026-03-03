---
title: Prysm 
---

# Prysm 

Prysm is a comprehensive observability CLI tool developed by CobaltCore for
monitoring [Ceph](./ceph.md) storage clusters and RADOS Gateway (RGW)
deployments. Prysm provides a multi-layered architecture designed to deliver
real-time monitoring, data collection, and analysis across Ceph environments.

Prysm employs a four-tier architecture consisting of Consumers, NATS
messaging, Remote Producers, and Nearby Producers. This design enables flexible
data collection from diverse sources within Ceph infrastructure. Remote
Producers gather metrics via APIs from outside the monitored environment,
collecting data such as RGW bucket notifications, quota usage, and RadosGW
usage statistics. Nearby Producers operate within the same network as Ceph
clusters, providing direct access to logs, metrics, and hardware sensors for
lower latency and higher fidelity monitoring of disk health, kernel metrics,
and resource usage.

NATS serves as the messaging backbone, routing data between producers and
consumers with low latency and reliable delivery. Consumers process this data
to generate alerts, perform analytics, display real-time dashboards, and ensure
compliance through log analysis.

Prysm supports multiple output formats including console, NATS, and Prometheus,
making it adaptable to existing monitoring infrastructure. It can function
standalone for specific tasks such as providing Prometheus metrics endpoints or
checking disk health through SMART attributes.

Prysm addresses the operational complexity of managing large-scale Ceph
deployments by providing unified observability across storage clusters, gateway
services, and underlying hardware components.

## See Also
[The Prysm Repository](https://github.com/cobaltcore-dev/prysm)
