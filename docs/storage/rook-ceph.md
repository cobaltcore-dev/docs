---
title: Installing Rook-Ceph on Kubernetes
order: 25
---

# Installing Rook-Ceph on Kubernetes

## Overview

This guide provides step-by-step instructions for deploying a Ceph storage
cluster using the Rook operator on Kubernetes. Rook automates the deployment,
configuration, and management of Ceph clusters within Kubernetes environments.

The instructions here are meant only as a general guideline. We recommend that
you use the instructions found in the [official Rook
documentation](https://rook.io/docs/rook/latest/) and the [upstream Ceph
documentation](https://docs.ceph.com/).

## Prerequisites

Before beginning the installation, ensure the following requirements are met:

### Kubernetes Cluster Requirements

- Kubernetes v1.31 through v1.37
- `kubectl` configured to communicate with your cluster
- Administrator access to the Kubernetes cluster
- At least 3 worker nodes for the standard `cluster.yaml` used by this guide
- Verify compatibility between your Kubernetes version and the Rook version you
  intend to deploy - see the [Rook releases page](https://github.com/rook/rook/releases)
  for version compatibility information

### Storage Requirements

- Raw block devices available on worker nodes (unformatted, no filesystem)
- At least 10 GB per OSD for testing; size production OSDs for the expected
  workload, recovery headroom, and Ceph release guidance
- Devices should not be mounted or in use by the operating system

### Network Requirements

- Network connectivity between all cluster nodes
- Network access between pods is handled by the Kubernetes network plugin (CNI).
  Ensure your CNI supports the required pod-to-pod communication. If you need
  to open ports for external access to Ceph services, the typical ports are
  6789, 3300, and 6800-7300.

### System Requirements

- A Linux kernel supported by the selected Kubernetes and Ceph releases
- LVM2 packages installed on all nodes
- CPU and memory sized for the planned Ceph daemons and workload
- `helm` installed if using Helm-based deployment (optional)

## Install Rook-Ceph

The examples below pin Rook `v1.20.7`, which supports the Kubernetes range
listed above. Select another tagged release and follow its compatibility guide
if your Kubernetes version falls outside that range.

```bash
git clone --depth 1 --branch v1.20.7 https://github.com/rook/rook.git
cd rook/deploy/examples

# Install the Rook operator
kubectl create -f crds.yaml
kubectl create -f common.yaml
kubectl create -f csi-operator.yaml
kubectl create -f operator.yaml

# Wait for the operator before configuring the Ceph cluster
kubectl -n rook-ceph rollout status deployment/rook-ceph-operator
```

Run the remaining commands from the `rook/deploy/examples` directory so that
paths such as `cluster.yaml`, `filesystem.yaml`, and `csi/` resolve correctly.

## Configuration Options

### Customizing the Cluster

Edit `cluster.yaml` to customize your deployment before creating the cluster:

#### Storage Configuration

Specify which devices to use for OSDs:

```yaml
storage:
  useAllNodes: true
  useAllDevices: false
  deviceFilter: "^sd[b-z]"  # Use sdb, sdc, etc.
```

Or specify devices explicitly:

```yaml
storage:
  useAllNodes: false
  useAllDevices: false
  nodes:
  - name: "node1"
    devices:
    - name: "sdb"
  - name: "node2"
    devices:
    - name: "sdc"
```

#### Resource Limits

Set resource limits for Ceph daemons:

```yaml
resources:
  mon:
    limits:
      cpu: "2000m"
      memory: "4Gi"
    requests:
      cpu: "1000m"
      memory: "2Gi"
  osd:
    limits:
      cpu: "2000m"
      memory: "4Gi"
    requests:
      cpu: "1000m"
      memory: "2Gi"
```

#### Network Configuration

Configure network settings for client and cluster traffic:

```yaml
network:
  provider: host  # or multus for advanced networking
  # Uncomment for dual network configuration
  # connections:
  #   encryption:
  #     enabled: true
```

## Deploy the Ceph Cluster

After reviewing the settings above and updating `cluster.yaml`, create the
cluster and wait for it to become ready:

::: danger Select storage devices before deployment
The upstream `cluster.yaml` enables `useAllDevices: true`. Do not apply it until
you have set `useAllDevices: false` and selected the intended devices, unless
every eligible raw device on every selected node is dedicated to Ceph.
:::

```bash
kubectl create -f cluster.yaml
kubectl -n rook-ceph get cephcluster -w
```

Press `Ctrl+C` after the cluster reports `Ready`.

### Dashboard Access

Enable and access the Ceph dashboard:

```bash
# The dashboard is enabled by default in cluster.yaml

# Get the dashboard password
kubectl -n rook-ceph get secret rook-ceph-dashboard-password \
  -o jsonpath="{['data']['password']}" | base64 --decode && echo

# Port-forward to access the dashboard
kubectl -n rook-ceph port-forward service/rook-ceph-mgr-dashboard 8443:8443
```

Access the dashboard at: `https://localhost:8443`

Username: `admin`
Password: (from the command above)

## Creating Storage Classes

### Block Storage (RBD)

Create a storage class for block devices:

```bash
kubectl create -f csi/rbd/storageclass.yaml
```

### File Storage (CephFS)

Deploy the CephFS filesystem:

```bash
kubectl create -f filesystem.yaml
```

Create a storage class for shared filesystem:

```bash
kubectl create -f csi/cephfs/storageclass.yaml
```

### Object Storage (RGW)

Deploy the object storage service:

```bash
kubectl create -f object.yaml
```

Wait for the RGW pods to be ready:

```bash
kubectl -n rook-ceph wait --for=condition=Ready pod \
  -l app=rook-ceph-rgw --timeout=5m
```

## Verification

### Install the Ceph Toolbox

Install the toolbox used by the health and troubleshooting commands below:

```bash
kubectl create -f toolbox.yaml
kubectl -n rook-ceph rollout status deployment/rook-ceph-tools
```

### Verify All Storage Types

Check that all storage components are operational:

```bash
# Check block storage
kubectl get storageclass rook-ceph-block

# Check filesystem storage
kubectl get storageclass rook-cephfs

# Check object storage
kubectl -n rook-ceph get cephobjectstore
```

### Test Storage Functionality

Create test workloads using each storage type:

```bash
# Test RBD block storage
kubectl create -f csi/rbd/pvc.yaml
kubectl create -f csi/rbd/pod.yaml
kubectl wait --for=condition=Ready pod/csirbd-demo-pod --timeout=5m

# Test CephFS
kubectl create -f csi/cephfs/pvc.yaml
kubectl create -f csi/cephfs/pod.yaml
kubectl wait --for=condition=Ready pod/csicephfs-demo-pod --timeout=5m
```

## Troubleshooting

### Common Issues

**Operator not starting:**

```bash
# Check operator logs
kubectl -n rook-ceph logs -l app=rook-ceph-operator
```

**OSDs not starting:**

```bash
# Check OSD prepare logs
kubectl -n rook-ceph logs -l app=rook-ceph-osd-prepare
```

Run these read-only checks directly on the affected storage node, replacing
`/dev/sdX` with the intended OSD device:

```bash
lsblk -f
sudo wipefs --no-act /dev/sdX
```

**Cluster stuck in HEALTH_WARN:**

```bash
# Check detailed cluster status
kubectl -n rook-ceph exec -it deployment/rook-ceph-tools -- ceph health detail

# Check for common issues
kubectl -n rook-ceph exec -it deployment/rook-ceph-tools -- ceph -s
```

## Cleanup

To remove the Rook-Ceph cluster:

**Note:** Rook uses Kubernetes finalizers to protect resources from accidental
deletion and to enforce dependency order. Do not remove those finalizers
manually. If deletion stalls, check for dependent resources and operator errors
before continuing. See the
[Rook cleanup documentation](https://rook.io/docs/rook/latest/Storage-Configuration/ceph-teardown/)
for details.

```bash
# Delete the example workloads and claims created by this guide
kubectl delete -f csi/rbd/pod.yaml --ignore-not-found
kubectl delete -f csi/rbd/pvc.yaml --ignore-not-found
kubectl delete -f csi/cephfs/pod.yaml --ignore-not-found
kubectl delete -f csi/cephfs/pvc.yaml --ignore-not-found

# Delete the storage classes
kubectl delete -f csi/rbd/storageclass.yaml --ignore-not-found
kubectl delete -f csi/cephfs/storageclass.yaml --ignore-not-found

# Delete the troubleshooting toolbox
kubectl delete -f toolbox.yaml --ignore-not-found

# Delete object storage (if created)
kubectl delete -f object.yaml --ignore-not-found

# Delete filesystem (if created)
kubectl delete -f filesystem.yaml --ignore-not-found

# Delete the cluster after its dependent resources are gone
kubectl delete -f cluster.yaml

# Delete the operator
kubectl delete -f operator.yaml
kubectl delete -f csi-operator.yaml
kubectl delete -f common.yaml
kubectl delete -f crds.yaml
```

**Cleaning up storage on nodes (CAUTION: This deletes all data):**

Run the following on each node that had OSDs. In addition to removing the Rook
data directory, the raw block devices used by OSDs must be wiped before they
can be reused:

```bash
# Remove Rook data directory
sudo rm -rf /var/lib/rook

# Wipe each OSD device (replace /dev/sdX with the actual device name)
sudo sgdisk --zap-all /dev/sdX
sudo wipefs --all /dev/sdX
sudo partprobe /dev/sdX
```

## Next Steps

After successful installation:

1. Configure monitoring with Prometheus and Grafana
2. Set up backup and disaster recovery procedures
3. Implement resource quotas and limits
4. Configure advanced networking if required
5. Review and adjust Ceph configuration parameters
6. Set up regular maintenance schedules

## Additional Resources

- [Official Rook documentation](https://rook.io/docs/rook/latest/)
- [Ceph documentation](https://docs.ceph.com/)
- [Rook GitHub repository](https://github.com/rook/rook)
- [Rook Slack community](https://slack.rook.io/)

## Notes

- This guide provides a basic Rook-Ceph deployment. While the prerequisites
  describe a production-grade setup, additional considerations apply for
  production environments, including high availability, performance tuning,
  and security hardening.
- Always test deployment procedures in a non-production environment first.
- Keep Rook and Ceph versions updated for security and stability improvements.
