---
title: Keystone (Identity)
order: 40
---

# Keystone (Identity)

Keystone is the OpenStack identity service. It authenticates users and services, and provides the service catalog that clients use to discover API endpoints.

## Role in CobaltCore

All OpenStack services (Nova, Neutron, Cinder, Glance) authenticate requests through Keystone. Users, service accounts, and automation tools obtain tokens from Keystone before calling any OpenStack API.

## Key concepts

| Concept | Description |
|---|---|
| **Domain** | Top-level grouping of users and projects |
| **Project** | A tenant - the unit of resource ownership and quota enforcement |
| **User** | An identity that can authenticate and receive tokens |
| **Role** | A set of permissions assigned to a user within a project |
| **Service catalog** | The list of services and their endpoint URLs, returned with each token |

## Deployment

Keystone is deployed via Helm as part of the OpenStack chart set. It uses a MariaDB database for its identity store.

::: info
Detailed configuration documentation (LDAP integration, federation, domain configuration) is being added. See the [OpenStack Keystone docs](https://docs.openstack.org/keystone/latest/) in the meantime.
:::
