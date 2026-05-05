---
title: Rook-Ceph Installation Procedure
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

- Kubernetes v1.25 or higher
- `kubectl` configured to communicate with your cluster
- Administrator access to the Kubernetes cluster
- At least 3 worker nodes for a production cluster (1 node minimum for testing)
- Verify compatibility between your Kubernetes version and the Rook version you
  intend to deploy — see the [Rook releases page](https://github.com/rook/rook/releases)
  for version compatibility information

### Storage Requirements

- Raw block devices available on worker nodes (unformatted, no filesystem)
- Minimum 10 GB of storage per OSD
- Devices should not be mounted or in use by the operating system

### Network Requirements

- Network connectivity between all cluster nodes
- Network access between pods is handled by the Kubernetes network plugin (CNI).
  Ensure your CNI supports the required pod-to-pod communication. If you need
  to open ports for external access to Ceph services, the typical ports are
  6789, 3300, and 6800-7300.

### System Requirements

- Linux kernel 4.5 or higher (5.x recommended)
- LVM2 packages installed on all nodes
- Minimum 2 GB RAM per node (4 GB+ recommended)
- `helm` installed if using Helm-based deployment (optional)

## Installation Steps

### Step 1: Clone the Rook Repository

Clone the Rook repository to get the deployment manifests:

```bash
git clone --single-branch --branch release-1.14 https://github.com/rook/rook.git
cd rook/deploy/examples
```

**Note:** Replace `release-1.14` with the desired Rook version. Check the Rook
releases page for the latest stable version, and verify it is compatible with
your Kubernetes version before proceeding.

### Step 2: Deploy the Rook Operator

Install the Rook operator, which manages the Ceph cluster lifecycle:

```bash
# Deploy common resources
kubectl create -f crds.yaml
kubectl create -f common.yaml

# Deploy the Rook operator
kubectl create -f operator.yaml
```

### Step 3: Verify Operator Deployment

Confirm the Rook operator is running:

```bash
kubectl -n rook-ceph get pods
```

**Expected output:**

```
NAME                                  READY   STATUS    RESTARTS   AGE
rook-ceph-operator-<pod-id>           1/1     Running   0          30s
```

Wait until the operator pod shows `Running` status before proceeding.

### Step 4: Create the Ceph Cluster

Deploy a Ceph cluster using the cluster manifest:

```bash
kubectl create -f cluster.yaml
```

This creates a basic Ceph cluster with the following default configuration:

- 3 Mon (Monitor) daemons
- 1 Mgr (Manager) daemon
- OSDs automatically provisioned from available devices
- Dashboard enabled

### Step 5: Monitor Cluster Deployment

Watch the cluster deployment progress:

```bash
kubectl -n rook-ceph get pods -w
```

The deployment is complete when all pods are in `Running` state. This may take
several minutes.

**Expected pods:**

- `rook-ceph-mon-*` - Monitor daemons (typically 3)
- `rook-ceph-mgr-*` - Manager daemons (typically 2)
- `rook-ceph-osd-*` - OSD daemons (one per device)
- `rook-ceph-crashcollector-*` - Crash collectors (one per node)

### Step 6: Verify Cluster Health

Check the Ceph cluster health:

```bash
# Deploy the Rook toolbox for cluster management
kubectl create -f toolbox.yaml

# Wait for toolbox to be ready
kubectl -n rook-ceph rollout status deployment/rook-ceph-tools

# Check cluster status
kubectl -n rook-ceph exec -it deployment/rook-ceph-tools -- ceph status
```

**Healthy cluster output should show:**

```
cluster:
  id:     <cluster-id>
  health: HEALTH_OK

services:
  mon: 3 daemons, quorum a,b,c
  mgr: a(active), standbys: b
  osd: X osds: X up, X in
```

## Configuration Options

### Customizing the Cluster

Edit `cluster.yaml` to customize your deployment before creating the cluster:

#### Storage Configuration

Specify which devices to use for OSDs:

```yaml
storage:
  useAllNodes: true
  useAllDevices: false
  deviceFilter: "^sd[b-z]"  # Use sdb, sdc, etc.
```

Or specify devices explicitly:

```yaml
storage:
  nodes:
  - name: "node1"
    devices:
    - name: "/dev/sdb"
  - name: "node2"
    devices:
    - name: "/dev/sdc"
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
  provider: host  # or multus for advanced networking
  # Uncomment for dual network configuration
  # connections:
  #   encryption:
  #     enabled: true
```

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

Test the storage class:

```bash
# Create a test PVC
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: rbd-pvc
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: rook-ceph-block
EOF

# Verify PVC is bound
kubectl get pvc rbd-pvc
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
kubectl -n rook-ceph get pods -l app=rook-ceph-rgw
```

## Verification

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

# Test CephFS
kubectl create -f csi/cephfs/pvc.yaml
kubectl create -f csi/cephfs/pod.yaml
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

# Verify devices are available and unused
kubectl -n rook-ceph exec -it deployment/rook-ceph-tools -- ceph-volume inventory
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
deletion. If `kubectl delete` commands hang, you may need to manually remove
finalizers from the relevant custom resources. See the
[Rook cleanup documentation](https://rook.io/docs/rook/latest/Storage-Configuration/ceph-teardown/)
for details.

```bash
# Delete the cluster
kubectl delete -f cluster.yaml

# Delete object storage (if created)
kubectl delete -f object.yaml

# Delete filesystem (if created)
kubectl delete -f filesystem.yaml

# Delete the operator
kubectl delete -f operator.yaml
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

- Official Rook documentation: https://rook.io/docs/rook/latest/
- Ceph documentation: https://docs.ceph.com/
- Rook GitHub repository: https://github.com/rook/rook
- Rook Slack community: https://rook-io.slack.com/

## Notes

- This guide provides a basic Rook-Ceph deployment. While the prerequisites
  describe a production-grade setup, additional considerations apply for
  production environments, including high availability, performance tuning,
  and security hardening.
- Always test deployment procedures in a non-production environment first.
- Keep Rook and Ceph versions updated for security and stability improvements.
