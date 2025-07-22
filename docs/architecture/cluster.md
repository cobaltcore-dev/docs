---
title: Kubernetes Cluster
---

# Kubernetes Cluster 

The CobaltCore cluster is a Kubernetes-based environment designed to manage hypervisor nodes and their associated workloads. 
It provides a robust framework for deploying, scaling, and maintaining virtual machines across multiple hypervisor nodes.

The cluster is provisioned using [IronCore](https://ironcore.dev/), which automates the discovery, provisioning, and evacuation of hypervisor nodes.

Components of the cluster, which are not required to be run on every hypervisor node, are deployed as Kubernetes Deployments.

## Hypervisor Operator

::: tip Source Code
[github.com/cobaltcore-dev/openstack-hypervisor-operator](https://github.com/cobaltcore-dev/openstack-hypervisor-operator)
:::

The Kubernetes operator that manages the lifecycle of hypervisor nodes.
It ensures a newly discovered node is properly configured and integrated into the cluster.
After the initial onboarding, the operator runs a final check to ensure the node is ready for use.
The operator also handles the evacuation of nodes in case of failures or maintenance.

## HA Service

::: tip Source Code
[github.com/cobaltcore-dev/kvm-ha-service](https://github.com/cobaltcore-dev/kvm-ha-service)
:::

The **KVM High Availability Service** is a central component that monitors the health and status of hypervisor nodes and their virtual machines.
It collects telemetry data from the KVM HA Agent, processes it, and provides insights into the state of the hypervisors and their workloads.
It is responsible for ensuring that critical workloads remain operational even in the event of failures.

```mermaid
graph LR;
    subgraph application [Application]
    source(Sources tasks);
    monitoring(Monitoring tasks);
    hypervisors(Hypervisors task);
    config("Configuration (YAML)")
    end
    
    monitoring --> |evacuate| nova;

    endpoints("http(s) endpoints") ---|pull metrics| source;
    senders("http(s) senders") ---|push telemetry| source;

    subgraph database [Database]
    sqlite
    end

    source ---> |add telemetry| database;
    monitoring <--> |check telemetry| database;

    hypervisors ---> database;

    hypervisors ---|refresh hypervisors| nova;

    subgraph hypervisor [Hypervisors]
    Hypervisor1(Hypervisor 1);
    HypervisorN(Hypervisor n);
    end

    subgraph openstack [Openstack]
    nova --- Hypervisor1;
    nova --- HypervisorN;
    end
```
