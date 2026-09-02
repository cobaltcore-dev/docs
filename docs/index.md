---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "CobaltCore"
  text: "Open Source OpenStack Distribution on Kubernetes"
  image:
    src: https://raw.githubusercontent.com/cobaltcore-dev/.github/refs/heads/main/assets/Logo_Cobalt_Core_background_black.svg
    alt: CobaltCore logo

  tagline: Run KVM-based virtual machines at scale with Kubernetes-native operations, OpenStack cloud APIs, and distributed Ceph storage - fully open source.
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/
    - theme: alt
      text: Overview
      link: /overview/
    - theme: alt
      text: Architecture
      link: /overview/architecture

features:
  - title: Kubernetes-native operations
    details: Hypervisors, storage clusters, and network configuration managed declaratively through Kubernetes operators and Helm - no manual runbooks.
  - title: OpenStack cloud APIs
    details: Nova, Neutron, Cinder, Keystone, and Glance provide the cloud APIs your users and automation tools already know.
  - title: High availability by default
    details: Automatic hypervisor evacuation, Ceph stretched clusters with Arbiter quorum, and OVN-based networking for resilient VM workloads.
  - title: Intelligent placement
    details: Cortex enriches Nova scheduling with real-time cluster state for better resource utilization and workload performance.
  - title: Full observability
    details: Prysm, Prometheus, and Perses provide metrics, alerting, and dashboards across every layer of the stack.
  - title: Aurora management frontend
    details: A unified UI for managing VMs, networks, and storage - backed by Greenhouse for team-scoped monitoring and operations.
---
