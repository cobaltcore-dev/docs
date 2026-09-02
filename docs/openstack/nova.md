---
title: Nova (Compute)
order: 10
outline: deep
---

# Nova (Compute)

Nova is the OpenStack compute service. It handles VM lifecycle - scheduling, spawning, live migration, and evacuation - across the hypervisor nodes.

## Architecture

```mermaid
C4Deployment
    Deployment_Node(cp, "Control Plane"){
        Deployment_Node(nova, "Nova Deployment", "Helm chart"){
            Container(novaapi, "API", "deployment", "")
            ContainerDb(novadb, "DBs", "deployment", "")
            ContainerQueue(novamq, "RabbitMQ", "deployment", "")
            Container(novacond, "Conductor", "deployment", "")
        }
    }
    Deployment_Node(cc, "Compute Cluster(s)"){
        Deployment_Node(node, "Hypervisor Node"){
            Deployment_Node(kubelet, "Kubernetes managed", ""){
                Container(computeagent, "Nova Compute Agent", "daemonset")
            }
            Container_Boundary(systemd, "systemd managed", "Delivered in Image"){
                Container_Ext(libvirtd, "libvirtd", "unit")
                Container_Ext(vm, "VM", "unit")
            }
        }
    }
    Rel(novaapi, novamq, "", "AMQP")
    BiRel(novamq, computeagent, "", "AMQP")
    BiRel(novamq, novacond, "", "AMQP")
    Rel(computeagent, libvirtd, "Instructs", "UNIX")
    Rel(novaapi, novadb, "", "MYSQL")
    Rel(novacond, novadb, "", "MYSQL")
    Rel(libvirtd, vm, "Manages")
    UpdateLayoutConfig($c4ShapeInRow="2", $c4BoundaryInRow="1")
```

## Components

| Component | Role |
|---|---|
| **Nova API** | REST API for VM operations; accepts requests from users and Cinder |
| **Nova Conductor** | Mediates database access from compute agents; handles complex workflows like live migration |
| **Nova Compute Agent** | Runs on each hypervisor node as a daemonset; instructs libvirtd to create/delete/migrate VMs |
| **RabbitMQ** | Async messaging between API, Conductor, and Compute Agents |

## Integration with CobaltCore compute

Nova Compute Agents run as Kubernetes daemonsets on hypervisor nodes managed by the [Hypervisor Operator](/compute/hypervisor). When the Hypervisor Operator registers a new node, it also registers the node's compute capacity with Nova.

The [HA Service](/compute/ha-service) calls Nova's host evacuation API when a hypervisor fails.

[Cortex](/management/cortex) integrates with Nova's placement API to make intelligent scheduling decisions based on cluster state.

## See also

- [Compute - Hypervisor](/compute/hypervisor)
- [Compute - HA Service](/compute/ha-service)
- [OpenStack Nova docs](https://docs.openstack.org/nova/latest/)
