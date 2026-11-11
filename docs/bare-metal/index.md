---
title: Bare Metal Management
order: 1
---

# Bare Metal Management

CobaltCore can use different bare metal operators to provision hardware. In the reference implementation, we use the [Metal Operator](https://ironcore.dev/baremetal/) provided by the [IronCore project](https://ironcore.dev/).

## Overview of the Metal Operator

The [Metal Operator](https://ironcore.dev/baremetal/) provides bare metal management and automation designed to deliver a comprehensive solution for managing physical servers in a Kubernetes-native way. It leverages Kubernetes Custom Resource Definitions (CRDs) to represent servers and their configuration as declarative Kubernetes objects, bridging your cloud-native environment with your hardware. It automates:

- **Discovery** — Automatically detect and register bare metal servers.
- **Provisioning** — Deploy and configure servers using Ignition.
- **Day-2 Operations** — Manage BIOS, firmware, and hardware inventory declaratively.
- **3rd Party Integrations** — Seamlessly integrate with existing tools such as vendor-specific management tools.
- **Kubernetes Support** — Run Kubernetes on bare metal servers with support for Cluster API and Gardener.

## Getting Started

Check out the [Metal Operator](https://ironcore.dev/baremetal/) documentation to learn more.
