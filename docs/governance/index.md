---
title: Governance
order: 1
outline: deep
---

# Governance

CobaltCore is governed under the [NeoNephos Foundation](https://neonephos.org/), a Linux Foundation initiative. Project decisions are made transparently through the structures described below.

## Technical Steering Committee

The Technical Steering Committee (TSC) holds all technical oversight for the project — it sets the direction, coordinates across working groups, and maintains the quality and integrity of the codebase and its processes.

The TSC operates under the [NeoNephos project charter](https://github.com/cobaltcore-dev/.github/blob/main/GOVERNANCE.md) and makes decisions by majority vote. Amendments to the charter require a supermajority.

**Current TSC members**

| Name | GitHub |
|---|---|
| Artem Kovalov | [@artemkovalyov](https://github.com/artemkovalyov) |
| Andreas Uhlig | [@auhlig](https://github.com/auhlig) |
| Philipp Imhof | [@phip1611](https://github.com/phip1611) |

TSC meetings are held regularly. Agendas and notes are published in the [`.github` repository](https://github.com/cobaltcore-dev/.github).

## Special Interest Groups

Special Interest Groups (SIGs) are focused working groups that own specific areas of the CobaltCore stack. Each SIG maintains its own roadmap, reviews contributions in its domain, and reports back to the TSC.

### SIG Platform

Owns the platform bootstrap layer — Gardener integration, GardenLinux, IronCore, and the Kubernetes control plane lifecycle.

### SIG Compute

Owns the compute layer — hypervisor lifecycle, KVM node agent, OpenStack Nova integration, and high-availability scheduling.

### SIG Storage

Owns the storage layer — Ceph, Rook, Liquid Ceph, Chorus, and the Arbiter monitor.

### SIG Networking

Owns the networking layer — OVN, OVS, and OpenStack Neutron integration.

### SIG Observability

Owns the observability stack — Prometheus, Perses, Prysm, and alerting rule coverage across the full stack.

## Code of Conduct

All community spaces and contributions are governed by the [NeoNephos Code of Conduct](https://github.com/cobaltcore-dev/.github/blob/main/CODE_OF_CONDUCT.md), which is based on the Contributor Covenant v3.0. Violations can be reported per the instructions in the Code of Conduct.

## How to get involved

- **Contribute** — read the [contribution guidelines](https://github.com/cobaltcore-dev/.github/blob/main/CONTRIBUTING.md) and open a pull request in any repository
- **Join a SIG** — attend the relevant SIG meeting or introduce yourself in the [community channel](/community/)
- **Propose a new SIG** — open a discussion in the [`.github` repository](https://github.com/cobaltcore-dev/.github) describing the scope and initial leads
