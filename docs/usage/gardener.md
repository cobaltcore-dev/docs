---
title: Gardener
---


# Gardener

### Operations through Annotations

Some annotations are highlighted below, though [check the docs](https://gardener.cloud/docs/gardener/shoot-operations/shoot_operations/) for more details.

#### Restart a Reconciliation

Trigger a retry of a reconciliation

```bash
(⎈|g-qa-de-200:garden-ccloud)$ kubectl annotate shoots cc-b0-qa-de-1 gardener.cloud/operation=retry
```

#### Reprovision a node

To reprovision a node apply the following annotation to it `node.machine.sapcloud.io/trigger-deletion-by-mcm=true`, e.g.:

```shell=
(⎈|cc-b0-qa-de-1:monsoon3)$ k annotate nodes shoot--ccloud--cc-b0-qa-de-1-bb086-orabos-z1-78465-z6fvh node.machine.sapcloud.io/trigger-deletion-by-mcm=true
```

Alternatives are described in the [MCM FAQ](https://gardener.cloud/docs/other-components/machine-controller-manager/faq/#how-to-delete-machine-object-immedietly-if-i-dont-have-access-to-it)
