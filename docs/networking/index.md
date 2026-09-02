---
title: Networking
order: 1
---

# Networking

CobaltCore uses OVN (Open Virtual Network) as the virtual networking layer for VMs. OVN is managed by Neutron's OVN backend and provides virtual networks, routers, and security groups at scale without per-node agent complexity.

## Components

| Component | Role |
|---|---|
| [OVN](/networking/ovn) | Virtual networking for VMs - provides L2/L3 switching and routing |

## How it fits in the stack

Neutron (in the OpenStack layer) owns the logical network model - networks, subnets, ports, routers, security groups. OVN translates those logical resources into forwarding rules on each hypervisor node via the OVN Controller daemonset. VMs get virtual interfaces managed by OVS.

See [OpenStack - Neutron](/openstack/neutron) for the Neutron API layer, and [Networking - OVN](/networking/ovn) for the OVN data plane details.
