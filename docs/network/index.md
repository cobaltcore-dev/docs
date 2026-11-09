---
title: Networking
order: 1
---

# Networking

CobaltCore is generally agnostic of the underlying data center network, but its reference implementation expects a vendor-based network provisioned with [WireAPI](https://wireapi.dev/) and integrated with OpenStack services for further provisioning and lifecycle management.

## Provision Network with WireAPI

WireAPI is a [Kubernetes-native Network Operator](https://wireapi.dev/architecture-overview.html) that automates the provisioning and lifecycle management of network devices. It extends the Kubernetes API with declarative, multi-vendor network automation, letting you manage physical network infrastructure with the same tools and workflows you use for your applications. Network devices and their configurations are represented as Kubernetes objects, bridging your cloud-native environment with your networking hardware.

## Getting Started

Check out WireAPI's [getting started](https://wireapi.dev/overview/getting-started.html) guide and [Tutorials](https://wireapi.dev/tutorials/).

## Neutron Integration

TBD

## Load Balancing with Octavia

TBD
