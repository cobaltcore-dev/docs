---
title: Minimal Environment
order: 2
outline: deep
---

# Minimal Environment

This guide walks you through deploying the smallest viable CobaltCore environment: one control plane node running the Kubernetes control plane and OpenStack services, and one hypervisor node running KVM virtual machines.

This is not a production configuration — it has no high availability and no redundant storage. It is suitable for exploration, development, and learning how the components fit together.

## What you will deploy

```
┌─────────────────────────────────┐
│  Control Plane Node             │
│  Kubernetes · OpenStack (Helm)  │
│  Ceph (single node)             │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│  Hypervisor Node                │
│  GardenLinux · KVM · libvirt    │
│  Hypervisor Operator agents     │
└─────────────────────────────────┘
```

## Prerequisites

- Two machines (physical or virtual), each with:
  - 8+ CPUs, 32 GB RAM, 200 GB disk
  - Linux OS (Ubuntu 22.04 or equivalent)
  - Network connectivity between them
- `kubectl` installed on your workstation
- `helm` v3 installed
- Basic familiarity with Kubernetes

## Step 1: Bootstrap the Kubernetes cluster

CobaltCore uses [Gardener](https://gardener.cloud) for cluster lifecycle management in production, but for a minimal setup you can use any conformant Kubernetes distribution (k3s, kubeadm, kind with enough resources).

The control plane must be reachable from the hypervisor node.

See [Platform — Bootstrap](/platform/bootstrap) for details on how CobaltCore clusters are set up in production.

## Step 2: Install the Hypervisor Operator

The Hypervisor Operator manages hypervisor node lifecycle. Install it into your cluster:

```bash
helm repo add cobaltcore https://cobaltcore-dev.github.io/charts
helm repo update
helm install hypervisor-operator cobaltcore/hypervisor-operator \
  --namespace cobaltcore-system \
  --create-namespace
```

See [Compute — Hypervisor](/compute/hypervisor) for configuration options.

## Step 3: Register the hypervisor node

Create a `Hypervisor` resource to register your compute node:

```yaml
apiVersion: kvm.cloud.sap/v1
kind: Hypervisor
metadata:
  name: hypervisor-01
spec:
  lifecycleEnabled: true
  highAvailability: false
  version: latest
```

Apply it and verify the node is discovered:

```bash
kubectl apply -f hypervisor.yaml
kubectl get hypervisors
```

## Step 4: Deploy storage (single-node Ceph)

For a minimal setup, deploy Ceph in single-replica mode via Rook:

```bash
helm install rook-ceph cobaltcore/rook-ceph \
  --namespace rook-ceph \
  --create-namespace \
  --set cluster.mon.count=1 \
  --set cluster.mgr.count=1
```

See [Storage — Rook](/storage/rook) for cluster configuration options.

## Step 5: Deploy OpenStack

OpenStack services are deployed via Helm. A minimal configuration enables Nova, Neutron, Cinder, Keystone, and Glance:

```bash
helm install openstack cobaltcore/openstack \
  --namespace openstack \
  --create-namespace \
  --values minimal-values.yaml
```

See [OpenStack](/openstack/) for service-level configuration.

## Step 6: Verify

Check that all components are running:

```bash
kubectl get pods -n cobaltcore-system
kubectl get pods -n rook-ceph
kubectl get pods -n openstack
kubectl get hypervisors
```

Access the OpenStack API endpoint and create a test VM to confirm end-to-end functionality.

## Next steps

- [Full production deployment](/getting-started/full-deployment) — add HA, stretched storage, and the management frontend
- [Compute — Hypervisor](/compute/hypervisor) — configure hypervisor agents and HA
- [Storage — Ceph](/storage/ceph) — tune storage pools and replication
- [OpenStack](/openstack/) — configure individual services
