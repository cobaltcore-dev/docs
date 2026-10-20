---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "CobaltCore Project"
  text: "Infrastructure Management for Cloud Native and Traditional Workloads"
  image:
    src: https://raw.githubusercontent.com/cobaltcore-dev/.github/refs/heads/main/assets/Logo_Cobalt_Core_background_black.svg
    alt: CobaltCore logo

  tagline: Get your cloud running in weeks with Kubernetes-native orchestration and OpenStack-influenced services, fully open source.
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
    - theme: alt
      text: Showroom
      link: /showroom/

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

<div class="VPFeatures" style="padding-top: 3rem; padding-bottom: 0; font-size: 1.5rem; font-weight: 600;">Featured Talk</div>
<div class="VPFeatures" style="padding-top: 1rem; padding-bottom: 3rem;">
  <p style="color: var(--vp-c-text-2); margin-bottom: 1.25rem;">
    Michael Schmidt walks through the core concepts behind CobaltCore Cloud Distribution and how they are applied at scale in SAP Cloud Infrastructure.
  </p>
  <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px;">
    <iframe
      src="https://www.youtube.com/embed/P1xavVMWjhc"
      title="Bridging CNCF and OpenInfra: Kubernetes as the Unified Control Plane for Sovereign Cloud"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    </iframe>
  </div>
  <p style="margin-top: 1rem;">
    <a href="/blog/bridging-cncf-openinfra-kubernetes-control-plane">Read the full write-up →</a>
  </p>
</div>
