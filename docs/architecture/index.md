---
outline: deep
title: Architecture
---

# Architecture

CobaltCore is built on top of OpenStack and IronCore, leveraging their capabilities to provide a robust cloud-native environment for non-cloud-native workloads. The architecture consists of several key components that work together to deliver a seamless experience.

- [**Kubernetes**](./cluster): The container orchestration platform that manages the deployment, scaling, and operation of containerized applications. It runs the [**Cluster Components**](./cluster.md) and provides the foundation for the CobaltCore environment.
- **IronCore**: Bare metal provisioning and management tool that automates the discovery, provisioning, and evacuation of servers in the CobaltCore environment.
- [**OpenStack**](./openstack): The various OpenStack services that provide compute, storage, and networking capabilities to the CobaltCore environment.
- **Greenhouse**: The monitoring and management tool that provides insights into the health and performance of the CobaltCore environment.
- [**HA Service**](./cluster#ha-service): The high availability service that ensures critical workloads remain operational even in the event of failures.
- [**Cortex**](./cortex): Smart initial placement and scheduling service for compute, storage, and network in cloud-native cloud environments.
