---
title: "Bridging CNCF and OpenInfra: Kubernetes as the Unified Control Plane for Sovereign Cloud"
date: 2026-03-23
order: 2
---

# Bridging CNCF and OpenInfra: Kubernetes as the Unified Control Plane for Sovereign Cloud

**Speaker:** Michael Schmidt, SAP SE  
**Event:** KubeCon + CloudNativeCon Europe 2026, Amsterdam

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 8px; margin: 2rem 0;">
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

Europe's cloud infrastructure landscape is fragmented, making interoperable and sovereign cloud platforms hard to build. In this talk at KubeCon EU 2026, Michael Schmidt from SAP walks through CobaltCore, a Kubernetes-enabled OpenStack distribution that bridges the CNCF and OpenInfra ecosystems, and how it runs in production at SAP Cloud Infrastructure.

## Why not just pick one

A lot of infrastructure teams are stuck between two worlds. The CNCF ecosystem gives you declarative, operator-driven lifecycle management. OpenInfra gives you mature IaaS APIs that existing workloads, tooling, and teams already depend on. Many workloads simply cannot be replatformed to a fully cloud-native design, so dropping OpenStack is not on the table.

CobaltCore's answer is to run a containerised OpenStack managed by Kubernetes. CRDs and operators become the control plane for the full stack: bare metal nodes, hypervisors, storage, networking, and the OpenStack services themselves. Users and automation tools keep calling the same Nova, Neutron, Cinder, Keystone, and Glance APIs. Everything behind those APIs is now driven by reconciliation loops.

## The Apeiro Reference Architecture

The talk goes into depth on the **Apeiro Reference Architecture**, the technical blueprint of the [IPCEI-CIS](https://ipcei-cis.eu/) initiative, the EU programme for building a sovereign, interoperable cloud and edge infrastructure across member states.

Apeiro defines how open-source components are composed across five areas that CobaltCore implements directly:

- **[Bare metal automation](https://ironcore.dev/baremetal/):** zero-touch provisioning from physical node to working hypervisor
- **Vendor-agnostic networking:** OVN-based fabric decoupled from specific hardware
- **Large-scale Kubernetes operations:** fleet management across thousands of nodes
- **Security and compliance management:** policy enforcement, audit, and regulatory alignment
- **Signed software delivery with end-to-end provenance:** every component traceable from source to deployment

CobaltCore is both a production implementation of Apeiro and a direct contribution back to it. SAP's deployment is the proof point that the reference architecture holds at scale.

---

*Want to run it yourself? See the [Getting Started guide](/getting-started/) or the [Architecture overview](/overview/architecture).*
