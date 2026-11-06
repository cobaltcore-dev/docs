---
title: Downstream Ceph image releases
order: 15
outline: deep
---

# Downstream Ceph image releases (proposal)

> **Proposal:** This page describes a proposed internal process for managing CobaltCore's downstream Ceph image releases. The workflow and coordination ADRs remain authoritative for provider handover, build evidence, test gates, and production approval. This page does not implement automation or change those decisions.

## Purpose and scope

CobaltCore maintains a Ceph fork so that production fixes and features can be delivered on the required schedule without waiting for every upstream pull request to merge. Upstream contribution remains the first priority: a downstream change should have an upstream pull request and tracker reference, or a documented reason why it is downstream-only. The fork release can include the required backports while upstream review is still in progress.

This proposal covers the internal release view of that work: how the team selects changes for a downstream version, tracks progress, assembles a changelog, and ties the planned release to the exact tested image. It complements the existing decisions for the fork workflow, SAP–Clyso coordination contract, test plan, and release notes template.

The supplied workflow ADR names the latest Squid stable release as the current backport target. Confirm the target stable line for each release and update the workflow decision when that target changes. The milestone examples in the Releases view may therefore reflect a later target line.

## Sources of truth

Use the project dashboard to manage and review release work. Use the artifacts below to establish what was built, tested, approved, and shipped.

| Record | Purpose | Authority |
|---|---|---|
| Cloud storage project, **Releases** view | Internal planning, assignees, candidate changes, and progress by release milestone | Planning view; it does not prove image contents or release approval |
| Pull request in `cobaltcore-dev/ceph` | Downstream patch, review, merge state, commit, and links to upstream work and tracker | Source for the fork change and its review history |
| Tracker issue | Customer need, problem statement, and prioritization | Source for why the change is needed |
| Build manifest | Upstream base, exact included PRs/commits, image digest, package versions, and test evidence | Source of truth for the contents and evidence of a built image |
| Release notes | Operator-facing summary, risks, validation, and rollout information | Published summary derived from the manifest and approvals |

The dashboard should link to the release tracking item, each downstream PR, relevant upstream PRs and tracker issues, the build manifest, and the release notes. A row marked approved or completed is a planning signal; inclusion is verified from the manifest and the fork commit.

## Proposed use of the Releases view

The existing Releases view is filtered to Ceph storage milestones (shown as `milestone:*cobaltcore-storage`) and groups work by target release line. The screenshot includes groups such as `squid-19.2.7-cobaltcore-storage` and `tentacle-20.2.4-cobaltcore-storage`, plus a release tracking item such as `Release tracking: v20.2.4-fasttrack-1`. These are useful examples of the view's current organization, not a decision on the permanent release naming scheme.

For each candidate image, create one release tracking item in the relevant milestone group. Keep the downstream PRs that are proposed for that image in the same group. The tracking item should identify the release owner, target Ceph stable line and base version, candidate image identifier, planned cut date, and links to the manifest/build and release notes as they become available.

Use the current project fields consistently:

| Field | Proposed meaning |
|---|---|
| **Title** | PR title for a change; `Release tracking: <candidate-id>` for the release record |
| **Assignees** | Person responsible for the PR, or internal release owner for the release record |
| **Status** | Work progress; use `In progress` while preparing a candidate and `Completed` after the release record is closed |
| **Labels** | `release-management` identifies release-managed changes; `status:approved` marks a change approved for planned inclusion under the team's current convention |

Document the meanings of statuses and labels in the project description or team guidance before relying on them for reporting. Do not treat `status:approved` as proof that the PR is merged, present in an image, or approved for production. The release record should link the final build manifest and the approval record.

## Proposed release workflow

1. **Open the release record.** The internal Ceph release owner creates the tracking item under the target stable-line milestone, records the candidate identifier and target base, assigns owners, and links the planning tracker. The owner confirms the target release line with Clyso and SAP stakeholders.
2. **Build the candidate change list.** Add each proposed downstream backport PR to the release group. Confirm that it links to the upstream PR and tracker issue, identifies the target release, and has the required metadata from the coordination contract. If an upstream PR is not available, record the reason and seek the exception required by the agreed workflow.
3. **Agree on inclusion and cutoff.** The internal release owner and relevant reviewers confirm which fixes/features are needed for the candidate and record changes to scope in the PR or tracker. Upstream review remains the priority, while a necessary downstream release need not wait for upstream merge when the workflow's readiness and approval criteria are met. Follow the coordination contract's submission windows and exception process.
4. **Freeze the candidate.** Record the exact fork commit and included PR set. Clyso supplies the build, test evidence, image digest, package manifest, and provider approval as defined by the workflow ADR and coordination contract. The manifest, rather than a manually maintained dashboard list, establishes the final contents.
5. **Complete acceptance and approvals.** SAP verifies package-version reproducibility and runs the applicable gates from the test plan. Record evidence and decisions against the release. Follow the documented internal approval chain before production promotion. A planned or built image is not GA until the required gates and approvals are complete.
6. **Publish and hand over.** Complete the release notes from the approved manifest, including the included changes, known issues, validation evidence, rollback constraints, image reference, and digest. Provide operations with the image path, rollout and rollback guidance, and release notes. Close the release tracking item when the agreed release outcome is recorded.

## Change tracking and changelog

Maintain one dashboard item per downstream PR, including backports. For each item, keep the links and metadata needed to answer:

- What customer need, defect, or upstream change does it address?
- Which tracker issue and upstream PR are associated with the backport?
- Which target line and candidate release is it intended for?
- Who owns it, what is its review/inclusion state, and what test evidence is available?
- Was it actually included in the final image?

The internal release owner reconciles the proposed list with merged fork PRs and the build manifest at candidate freeze. The owner curates the release changelog from changes present in that manifest, grouping entries by type (security, fixed, added, changed, deprecated, or removed) and recording operator impact, risk, tests, and rollback notes where relevant. Do not carry a dashboard item into published release notes unless the manifest confirms that it is in the image.

## Ownership

| Responsibility | Proposed owner |
|---|---|
| Keep the internal release record, scope, candidate list, and changelog current | SAP internal Ceph release owner |
| Develop upstream-first and prepare/review downstream backports | Clyso and contributing engineers, per the workflow ADR |
| Build the image and provide provider test/approval evidence | Clyso, per the coordination contract |
| Verify reproducibility, run SAP acceptance gates, and approve production promotion | SAP, following the test plan and approval chain |
| Publish the release notes and hand off image and rollout details to operations | SAP release owner with operations |

## Naming and open decisions

The supplied workflow ADR lists `v19.2.3c7` as a candidate image naming scheme with the final scheme still open. The Releases view screenshot shows a tracking title `v20.2.4-fasttrack-1`. Treat these as examples until the naming decision is recorded. Define separately the stable-line milestone name, the internal candidate/release identifier, the container tag, and the immutable image digest; they serve different purposes. The manifest and digest identify the built artifact even if its tag is later changed.

Before adopting this proposal as operational guidance, confirm:

- The canonical release and image tag format, including how hotfixes and multiple candidates are numbered.
- Who can approve additions after the candidate cutoff and how such exceptions are recorded.
- The exact meanings and allowed transitions for project statuses and approval labels.
- The canonical link to the Releases view and the location of the signed manifest and release notes.
- Whether the dashboard record is closed at GA, after production rollout, or after the operations handover.

## References

- Fork: [cobaltcore-dev/ceph](https://github.com/cobaltcore-dev/ceph)
- Upstream tracker: [Ceph issue 75029](https://tracker.ceph.com/issues/75029)
- Build workflow: [build-ceph-custom.yml](https://github.com/cobaltcore-dev/ceph/actions/workflows/build-ceph-custom.yml)
- Workflow ADR: `0001-ceph-fork-workflow.md`
- Test plan: `0002-ceph-fork-workflow-test-plan.md`
- Release notes template: `0003-ceph-fork-workflow-release-notes-template.md`
- SAP–Clyso coordination contract: `0042-ceph-fork-coordination-contract.md`
