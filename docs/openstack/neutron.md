---
title: Neutron (Networking)
order: 20
outline: deep
---

# Neutron (Networking)

Neutron is the OpenStack networking service. In CobaltCore, Neutron uses OVN (Open Virtual Network) as its backend, providing virtual networks, ports, routers, and security groups for VMs.

## Architecture

```mermaid
C4Deployment
    Deployment_Node(cp, "Control Plane"){
        Deployment_Node(neutron, "Neutron Deployment", "Helm chart"){
            Container(neutronapi, "Neutron API", "deployment", "")
            ContainerDb(neutrondb, "DB", "deployment", "")
            Container(ovnnb, "OVN-NB", "statefulset", "")
            ContainerQueue(neutronmq, "RabbitMQ", "deployment", "")
            Container(ovnsb, "OVN-SB", "statefulset", "")
            Container(ovnnorthd, "OVN-NorthD", "statefulset", "")
        }
    }
    Deployment_Node(cc, "Compute Cluster(s)"){
        Deployment_Node(node, "Hypervisor Node"){
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

## OVN data plane

OVN replaces Neutron's traditional agent-per-node model:

| Component | Role |
|---|---|
| **OVN-NB (Northbound DB)** | High-level logical network state written by Neutron API |
| **OVN-NorthD** | Translates logical network state into low-level flow rules in OVN-SB |
| **OVN-SB (Southbound DB)** | Physical network state and flow rules consumed by OVN Controllers |
| **OVN Controller** | Runs on each compute node; translates SB flows into OVS rules |
| **OVS** | Open vSwitch — the kernel datapath that forwards VM traffic |

See [Networking — OVN](/networking/ovn) for the full OVN architecture and CobaltCore-specific configuration.

## See also

- [Networking — OVN](/networking/ovn)
- [OpenStack Neutron docs](https://docs.openstack.org/neutron/latest/)
- [OVN architecture overview](https://www.ovn.org/en/architecture/)
