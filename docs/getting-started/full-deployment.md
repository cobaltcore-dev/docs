---
title: Full Production Deployment
order: 3
outline: deep
---

# Full Production Deployment

This guide covers deploying CobaltCore for production workloads: a highly available control plane, multiple hypervisor nodes, a Ceph stretched cluster, full observability, and the management frontend.

Follow the [Minimal Environment](/getting-started/minimal) guide first to understand the individual components. This guide focuses on the additional steps and considerations for production.

## Target architecture

```
┌────────────────────────────────────────────────────────────────────┐
│  Management Plane    Aurora · Greenhouse · Cortex                  │
├────────────────────────────────────────────────────────────────────┤
│  OpenStack           Nova · Neutron · Cinder · Keystone · Glance   │
│                      (HA, multi-replica, RabbitMQ cluster)         │
├────────────────────────────────────────────────────────────────────┤
│  Observability       Prysm · Prometheus · Perses                   │
├───────────────────────────────┬────────────────────────────────────┤
│  Data Center A                │  Data Center B                     │
│  Hypervisor nodes (N)         │  Hypervisor nodes (M)              │
│  Ceph OSDs                    │  Ceph OSDs                         │
├───────────────────────────────┴────────────────────────────────────┤
│  Platform                                                          │
│  Gardener-managed Kubernetes · IronCore bare metal · GardenLinux   │
└────────────────────────────────────────────────────────────────────┘
                           Arbiter (tiebreaker)
```

## Prerequisites

- IronCore configured and managing your bare metal nodes - see [Platform - IronCore](/platform/ironcore)
- Gardener cluster provisioned - see [Platform - Gardener](/platform/gardener)
- GardenLinux deployed on hypervisor nodes - see [Platform - GardenLinux](/platform/gardenlinux)
- At least 3 control plane nodes for HA Kubernetes
- At least 2 data centers (or failure domains) for stretched Ceph

## Checklist

### Platform layer

- [ ] IronCore discovers and registers all bare metal nodes
- [ ] Gardener Shoot cluster created with HA control plane (3 nodes)
- [ ] GardenLinux deployed on all hypervisor nodes
- [ ] Network connectivity verified between all nodes and failure domains

### Compute layer

- [ ] Hypervisor Operator installed and all hypervisors registered
- [ ] HA Service configured - see [Compute - HA Service](/compute/ha-service)
- [ ] Live migration tested between hypervisor nodes
- [ ] (Optional) GPU/SR-IOV configured - see [Compute - GPU](/compute/gpu)

### Storage layer

- [ ] Rook operator installed - see [Storage - Rook](/storage/rook)
- [ ] Ceph cluster deployed with 3+ MONs and replicated OSDs - see [Storage - Ceph](/storage/ceph)
- [ ] Arbiter configured for stretched cluster - see [Storage - Arbiter](/storage/arbiter)
- [ ] Storage classes created (RBD, CephFS, RGW)
- [ ] Ceph health verified: `ceph status` shows `HEALTH_OK`

### Networking layer

- [ ] OVN control plane deployed - see [Networking - OVN](/networking/ovn)
- [ ] OVN Controller daemonset running on all hypervisor nodes
- [ ] Neutron API connected to OVN Northbound DB

### OpenStack layer

- [ ] All services deployed with HA configuration (multi-replica, clustered RabbitMQ/MariaDB)
- [ ] Keystone identity configured - see [OpenStack - Keystone](/openstack/keystone)
- [ ] Glance image service configured - see [OpenStack - Glance](/openstack/glance)
- [ ] Nova compute service verified (create test VM) - see [OpenStack - Nova](/openstack/nova)
- [ ] Neutron networking verified (create test network and port) - see [OpenStack - Neutron](/openstack/neutron)
- [ ] Cinder block storage verified (create test volume) - see [OpenStack - Cinder](/openstack/cinder)

### Observability layer

- [ ] Prysm deployed and collecting events - see [Observability - Prysm](/observability/prysm)
- [ ] Prometheus scraping all targets - see [Observability - Prometheus](/observability/prometheus)
- [ ] Perses dashboards deployed - see [Observability - Perses](/observability/perses)
- [ ] Alerting rules configured and routing verified

### Management layer

- [ ] Greenhouse connected to the cluster - see [Management - Greenhouse](/management/greenhouse)
- [ ] Aurora management frontend accessible - see [Management - Aurora](/management/aurora)
- [ ] Cortex placement configured and integrated with Nova - see [Management - Cortex](/management/cortex)

## Operational readiness

Before going live:

1. **Failure testing** - shut down a hypervisor node and verify HA evacuation triggers correctly
2. **Storage resilience** - verify Ceph rebalances after an OSD failure
3. **Network failover** - verify OVN continues routing after a node restart
4. **Backup** - confirm etcd backup for the Kubernetes control plane is in place
5. **Alerting** - trigger a test alert and verify it reaches your on-call channel
