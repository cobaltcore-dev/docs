---
title: Gardener
order: 30
outline: deep
---

# Gardener

[Gardener](https://gardener.cloud) manages the lifecycle of Kubernetes clusters in CobaltCore. It is responsible for creating, upgrading, scaling, and deleting clusters — what Gardener calls "Shoot" clusters.

In CobaltCore, Gardener provisions the Kubernetes clusters that the hypervisor operators, OpenStack services, and storage components run on.

## Key concepts

- **Garden cluster** — the control plane where Gardener itself runs and where you create Shoot resources
- **Shoot cluster** — a Kubernetes cluster managed by Gardener; this is where CobaltCore workloads run
- **Machine Controller Manager (MCM)** — manages the underlying nodes (machines) of a Shoot cluster

## Common operations

### Restart a reconciliation

If a Shoot is stuck or needs to re-apply its desired state, trigger a retry:

```bash
kubectl annotate shoot <shoot-name> -n <project-namespace> gardener.cloud/operation=retry
```

### Reprovision a node

To force a node to be deleted and reprovisioned by the Machine Controller Manager:

```bash
kubectl annotate node <node-name> node.machine.sapcloud.io/trigger-deletion-by-mcm=true
```

MCM will drain the node, delete it, and provision a replacement. See the [MCM FAQ](https://gardener.cloud/docs/other-components/machine-controller-manager/faq/) for additional node deletion options.

### Trigger other Shoot operations

Gardener supports several operations via the `gardener.cloud/operation` annotation:

| Value | Effect |
|---|---|
| `retry` | Retry a failed or stuck reconciliation |
| `reconcile` | Force a full reconciliation |
| `rotate-credentials-complete` | Complete a credentials rotation |

See the [Gardener Shoot operations docs](https://gardener.cloud/docs/gardener/shoot-operations/shoot_operations/) for the full list.
