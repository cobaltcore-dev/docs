---
title: Cinder (Block Storage)
order: 30
outline: deep
---

# Cinder (Block Storage)

Cinder is the OpenStack block storage service. It manages volume lifecycle — creation, attachment, snapshots, and deletion — and connects VMs to persistent storage backends.

## Architecture

```mermaid
C4Deployment
    Deployment_Node(cp, "Control Plane"){
        Deployment_Node(nova, "Nova Deployment", "Helm chart"){
            Container(novaapi, "Nova API", "deployment", "")
            ContainerQueue(novamq, "RabbitMQ", "deployment", "")
            Container(novacond, "Conductor", "deployment", "")
        }
        Deployment_Node(cinder, "Cinder", "Helm chart"){
            Container(cindervolume, "Volume Services", "deployment", "")
            ContainerQueue(cindermq, "RabbitMQ", "deployment", "")
            ContainerDb(cinderdb, "DB", "deployment", "")
            Container(cinderapi, "Cinder API", "deployment", "")
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
                Container_Ext(mount, "Share", "mount")
            }
        }
    }
    Deployment_Node(ext, "Infrastructure"){
        System_Ext(netapp, "Filer (NetApp)")
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

## Storage backend

In CobaltCore's reference configuration, Cinder uses a **NetApp filer** as the storage backend. Volumes are delivered as NFS mounts to compute nodes. The Cinder Volume Service manages volume lifecycle via the NetApp REST API.

For environments without a NetApp filer, Ceph RBD is a supported alternative backend — volumes are attached directly to VMs using the `librbd` driver.

## See also

- [Storage — Ceph](/storage/ceph) (for RBD backend)
- [OpenStack Cinder docs](https://docs.openstack.org/cinder/latest/)
