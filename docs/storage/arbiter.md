---
title: Arbiter
order: 40
outline: deep
---

# Arbiter

::: tip Source Code
[github.com/cobaltcore-dev/external-arbiter-operator](https://github.com/cobaltcore-dev/external-arbiter-operator)
:::

Arbiter deploys external Ceph monitors at a tiebreaker site, enabling Ceph clusters to maintain quorum across two data centers. Without Arbiter, a two-site cluster loses quorum whenever one site becomes unavailable — Arbiter adds a lightweight third monitor at a separate site to break the tie.

## Why Arbiter?

In a stretched Ceph cluster spanning two availability zones (AZ-A and AZ-B), monitors are split evenly between the two sites. If either AZ loses connectivity, neither side can reach a majority — the cluster is unable to make quorum decisions and becomes unavailable.

Arbiter deploys an external monitor (`mon.ext-a`) at a third site. This monitor does not store data but participates in quorum, so the cluster survives a full AZ failure:

![Arbiter quorum diagram](/assets/project-owned/diagrams/purpose-external-arbiter-operator.png)

::: warning Important scope
Arbiter restores **control-plane quorum** — it does not guarantee data redundancy. Data availability depends on OSD replication across the two primary sites.
:::

## How it works

The Arbiter operator watches the Ceph cluster for quorum loss. When quorum is lost between the two primary sites, the operator:

1. Reads the current Ceph cluster state
2. Reserves an external monitor ID
3. Deploys a lightweight monitor on the remote (tiebreaker) cluster
4. Updates Ceph configuration so the new monitor joins quorum

The operator also continuously monitors the remote cluster to verify its availability and ensure the necessary RBAC permissions are in place.

## Deployment

### Prerequisites

- A Ceph cluster managed by Rook running on the primary cluster
- A second (tiebreaker) Kubernetes cluster reachable from the primary cluster
- `cert-manager` installed on the primary cluster

### Install

```bash
helm install --create-namespace --namespace arbiter-operator \
  --values values.yaml \
  arbiter-operator oci://ghcr.io/cobaltcore-dev/charts/external-arbiter-operator
```

### Configure

Create the remote cluster and arbiter resources:

```bash
# Create the secret with kubeconfig for the tiebreaker cluster
kubectl apply -f secret.yaml -n arbiter-operator

# Register the tiebreaker cluster
kubectl apply -f remote-cluster.yaml -n arbiter-operator

# Deploy the arbiter monitor
kubectl apply -f remote-arbiter.yaml -n arbiter-operator

# Watch until ready
kubectl get remotearbiter -n arbiter-operator -w

# Verify the arbiter joined quorum
kubectl exec deployment/rook-ceph-tools -n rook-ceph -it -- ceph mon dump
```

### CRDs

| Resource | Role |
|---|---|
| `RemoteCluster` | Represents the tiebreaker Kubernetes cluster; references the kubeconfig secret |
| `RemoteArbiter` | Triggers deployment of the external monitor on the `RemoteCluster` |

## See also

- [Storage — Ceph](./ceph)
- [Storage — Rook](./rook)
- [Arbiter GitHub repository](https://github.com/cobaltcore-dev/external-arbiter-operator)
