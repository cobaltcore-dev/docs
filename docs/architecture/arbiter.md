---
title: Arbiter
---

# Arbiter 

## About This Project

The external-arbiter-operator (Arbiter) works with Rook-provisioned Ceph
clusters to deploy external arbiters (monitors) that are not managed by Rook
but that participate in consensus.

The operator also monitors the remote cluster to verify its availability and
ensure that the tenant has sufficient permissions to handle the deployment of
Arbiter.

## Requirements and Setup

### Required Tools

The following tools are required on your development machine:

- `sed`
- `openssl`
- `make`
- `git`
- `golang`
- `lima` (or another method to provision Kubernetes locally, such as Minikube)
- `kubectl`
- `docker` (or any compatible container engine, such as Podman)
- `helm`

The remaining dependencies are provisioned via Go tools, including the
Kubebuilder toolset.

## Quick Start

What follows is a quick walkthrough on how to prepare the environment, run the
operator locally, and deploy an external monitor.

### Clone and Setup

```bash
# Clone the Rook repository: https://github.com/rook/rook 

#Run `make deps`:
make deps

# Create OSD for Ceph
limactl disk create osd --size=8G

# Create VM instance
limactl create --name=k8s ./contrib/vm.yaml

# Start VM
limactl start k8s

# Use kubeconfig provided by VM
export KUBECONFIG="${HOME}/.lima/k8s/copied-from-guest/kubeconfig.yaml"
```

### Install Prerequisites

```bash
# Install cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.19.2/cert-manager.yaml

# Install Rook operator
kubectl apply -f ./rook/deploy/examples/crds.yaml
kubectl apply -f ./rook/deploy/examples/common.yaml
kubectl apply -f ./rook/deploy/examples/operator.yaml
kubectl apply -f ./rook/deploy/examples/csi-operator.yaml

# Create Ceph cluster
kubectl apply -f ./rook/deploy/examples/cluster-test.yaml

# (Optional) Install Ceph toolbox
kubectl apply -f ./rook/deploy/examples/toolbox.yaml
```

### Build and Install Operator

```bash
# Build image
limactl shell k8s sudo nerdctl --namespace k8s.io build \
  -t localhost:5000/cobaltcore-dev/external-arbiter-operator:latest \
  -f ./Dockerfile .

# Dry run operator install via Helm
helm install --dry-run --create-namespace --namespace arbiter-operator \
  --values ./contrib/charts/external-arbiter-operator/local.yaml \
  arbiter-operator ./contrib/charts/external-arbiter-operator

# Install operator via Helm chart
helm install --create-namespace --namespace arbiter-operator \
  --values ./contrib/charts/external-arbiter-operator/local.yaml \
  arbiter-operator ./contrib/charts/external-arbiter-operator
```

### Configure and Deploy Arbiter

```bash
# Create namespace, user, role, rolebinding, kubeconfig and secret for arbiter
./hack/configure-k8s-user.sh

# Create secret with remote cluster access configuration
kubectl apply -f ./contrib/k8s/examples/secret.yaml -n arbiter-operator

# Create remote cluster resource
kubectl apply -f ./contrib/k8s/examples/remote-cluster.yaml -n arbiter-operator

# Create remote arbiter resource
kubectl apply -f ./contrib/k8s/examples/remote-arbiter.yaml -n arbiter-operator

# Watch until Arbiter is ready
kubectl get remotearbiter -n arbiter-operator -w

# Check that Arbiter has joined quorum
kubectl exec deployment/rook-ceph-tools -n rook-ceph -it -- ceph mon dump
```

### Cleanup

```bash
# Remove Helm chart
helm uninstall --namespace arbiter-operator arbiter-operator

# Stop VM
limactl stop k8s

# Delete VM
limactl delete k8s
```

## Make Goals

Useful make commands for development:

```bash
# Build binary
make

# Prettify project, run linters, etc.
make pretty

# Run tests
make test

# Regenerate Kubernetes resources
make gen

# Copy CRD definitions to Helm chart
make helm
```

## Configuration

### Deployment Configuration

Deployment manifests are managed by Helm. The `values.yaml` file lists all
available configuration options.

### Resource Configuration

The following example resources are provided:

- `secret.yaml` - Kubeconfig secret for arbiter installation
- `remote-cluster.yaml` - RemoteCluster resource definition
- `remote-arbiter.yaml` - RemoteArbiter resource definition

## How to Run

### Prerequisites

Before running the operator, ensure the following conditions are met:

1. A Ceph cluster operated by Rook is already up and running on the source
   Kubernetes cluster
1. Resources (pods, services) from the target (arbiter) cluster are reachable
   from the source (operator/Rook) cluster and vice versa

### Deployment Steps

1. Create a user on the target cluster.
1. Create the target namespace on the target cluster.
1. Grant the user permissions to manage deployments, secrets, configmaps, their
   statuses, and finalizers.
1. Provision the target user kubeconfig on the source cluster via secret.
1. Deploy the operator on the source cluster.
1. Create a RemoteCluster resource on the source cluster, referencing the target
   user kubeconfig secret.
1. Create a RemoteArbiter resource on the source cluster, referencing the
   RemoteCluster.
1. Watch until resources are ready.
1. Verify that the arbiter has joined the quorum by running `ceph mon dump`.

## See Also
[Arbiter Repository](https://github.com/cobaltcore-dev/external-arbiter-operator?tab=readme-ov-file)
