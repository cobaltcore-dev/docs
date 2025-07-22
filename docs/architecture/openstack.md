---
title: OpenStack
---

# OpenStack
OpenStack is a collection of services that provide compute, storage, and networking capabilities to the CobaltCore environment.
It is designed to be modular and extensible, allowing for the integration of various components to meet specific requirements. 
In CobaltCore, OpenStack is deployed using Helm charts, which simplifies the installation and management of OpenStack services.

### OpenStack Architecture in CobaltCore

The architecture of OpenStack in CobaltCore consists of several key components:

This is a simplified model, leaving out [cells](https://docs.openstack.org/nova/latest/admin/cells.html).

## Compute

```mermaid
C4Deployment
    Deployment_Node(cp, "Control Plane", "i.e. qa-de-1"){
        Deployment_Node(nova, "Nova Deployment", "chart"){
            Container(novaapi, "API", "deployment", "")
            ContainerDb(novadb, "DBs", "deployment", "")
            ContainerQueue(novamq, "RabbitMQ", "deployment", "")
            Container(novacond, "Conductor", "deployment", "")
        }
    }
    Deployment_Node(cc, "Compute Cluster(s)", "i.e. cc-b0-qa-de-1"){
        Deployment_Node(node, "Node", "i.e. shoot-xyz-xz"){
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

## Networking

This section describes the networking components of OpenStack in CobaltCore, focusing on the Neutron service and its integration with OVN (Open Virtual Network).

- Further reading
  - [OVN Architecture](https://www.ovn.org/en/architecture/)
  - Redhat Documentation on [Open Virtual Network (OVN)](https://docs.redhat.com/en/documentation/red_hat_openstack_platform/13/html/networking_with_open_virtual_network/open_virtual_network_ovn)

```mermaid
C4Deployment
    Deployment_Node(cp, "Control Plane", "i.e. qa-de-1"){
        Deployment_Node(neutron, "Neutron Deployment", "chart"){
            Container(neutronapi, "Neutron API", "deployment", "")
            ContainerDb(neutrondb, "DB", "deployment", "")
            Container(neutronagents, "Agents (ACI...)", "deployment", "")
            Container(ovnnb, "OVN-NB", "statefulset", "")
            ContainerQueue(neutronmq, "RabbitMQ", "deployment", "")
            Container(ovnsb, "OVN-SB", "statefulset", "")
            Container(ovnnorthd, "OVN-NorthD", "statefulset", "")
        }
    }
    Deployment_Node(cc, "Compute Cluster(s)", "i.e. cc-b0-qa-de-1"){
        Deployment_Node(node, "Node", "i.e. shoot-xyz-xz"){
            Deployment_Node(kubelet, "Kubernetes managed", ""){
                Container(ovncontroller, "OVN Controller", "daemonset")
            }
            Container_Boundary(systemd, "systemd managed", "Delivered in Image"){
                Container_Ext(vm, "VM", "unit")
                Container_Ext(vmnic, "Interface", "Interface")
                Container_Ext(ovs, "OVS", "unit")
            }
        }
    }
    BiRel(neutronapi, neutronmq, "AMQP")
    BiRel(neutronmq, neutronagents, "AMQP")
    Rel(neutronapi, neutrondb, "", "MYSQL")
    Rel(neutronapi, ovnnb, "Configures", "OVS-DB")
    Rel(ovnnorthd, ovnnb, "Reads", "OVS-DB")
    Rel(ovnnorthd, ovnsb, "Translates", "OVS-DB")
    Rel(ovnsb, ovncontroller, "Reads", "OVS-DB")
    Rel(ovncontroller, ovs, "Translates", "OVS-DB")
    Rel(vm, vmnic, "Uses")
    Rel(ovncontroller, vmnic, "Creates")
    Rel(ovs, vmnic, "Manages")
    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
```

## Storage


```mermaid
C4Deployment
    Deployment_Node(cp, "Control Plane", "i.e. qa-de-1"){
        Deployment_Node(nova, "Nova Deployment", "chart"){
            Container(novaapi, "API", "deployment", "")
            ContainerQueue(novamq, "RabbitMQ", "deployment", "")
            Container(novacond, "Conductor", "deployment", "")
        }
        Deployment_Node(cinder, "Cinder", "chart"){
            Container(cindervolume, "Volume Services", "deployment", "")
            ContainerQueue(cindermq, "RabbitMQ", "deployment", "")
            ContainerDb(cinderdb, "DB", "deployment", "")
            Container(cinderapi, "API", "deployment", "")
        }
    }
    Deployment_Node(cc, "Compute Cluster(s)", "i.e. cc-b0-qa-de-1"){
        Deployment_Node(node, "Node", "i.e. shoot-xyz-xz"){
            Deployment_Node(kubelet, "Kubernetes managed", ""){
                Container(computeagent, "Nova Compute Agent", "daemonset")
            }
            Container_Boundary(systemd, "SystemD managed", "Delivered in Image"){
                Container_Ext(libvirtd, "libvirtd", "unit")
                Container_Ext(vm, "VM", "unit")
                Container_Ext(mount, "Share", "mount")
            }
        }
    }
    Deployment_Node(ext, "Infrastructure"){
        System_Ext(netapp, "Filer")
    }
    Rel(novaapi, novamq, "", "AMQP")
    BiRel(novamq, computeagent, "", "AMQP")
    BiRel(novamq, novacond, "", "AMQP")
    Rel(computeagent, libvirtd, "Instructs", "UNIX")
    Rel(libvirtd, vm, "Manages")
    Rel(cinderapi, cindermq, "", "AMQP")
    BiRel(cindermq, cindervolume, "", "AMQP")
    Rel(cinderapi, cinderdb, "", "MYSQL")
    Rel(cindervolume, cinderdb, "", "MYSQL")
    Rel(cindervolume, netapp, "Manages", "REST")
    Rel(cindervolume, novaapi, "Calls", "REST")
    Rel(computeagent, mount, "Mounts")
    Rel(computeagent, cinderapi, "Calls")
    Rel(mount, netapp, "Accesses", "NFS")
    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
```