---
title: Swift to Ceph migration with Chorus
order: 35
outline: deep
---

# Swift-to-Ceph migration with Chorus

This guide explains how to deploy Chorus for a migration from OpenStack Swift to Ceph RGW, configure the two storage endpoints, copy and verify data, and switch clients to Ceph.

Chorus uses the Swift API for both endpoints in this migration. RGW provides a Swift-compatible API, so applications can keep using Swift after their endpoint is changed. Chorus copies data in one direction: from Swift to Ceph.

## Before you start

Plan the migration and confirm that you have:

- A target Kubernetes cluster and a context with permission to deploy into the chorus namespace. Example context: cluster-region-1.
- The reviewed Chorus Helm chart and approved, pinned container images. The reference deployment used chart system/chorus version 0.4.0 and Chorus v0.7.11; confirm the supported chart and application versions for your environment.
- The identity endpoint, region name, Swift source endpoint, and Ceph RGW Swift endpoint. Use the endpoint catalog for the target environment as the source of truth.
- An approved secret store for the Chorus master and Redis passwords and for storage credentials. Do not commit secrets to values files or put them in shell history.
- A persistent volume class for Redis and cluster secret integration that can provide the secret references used by the deployment.
- A project ID and access to the Swift source and Ceph destination.
- A change window for verification and client cutover. If write capture is not configured and tested, the window must include a source write freeze.
- kubectl, chorctl for the deployed Chorus version, and an authenticated OpenStack CLI if you need to look up the project ID.

For chorctl v0.7.11, the reference guide uses the [v0.7.11 release](https://github.com/clyso/chorus/releases/tag/v0.7.11).

## 1. Configure the deployment

The reference deployment stores shared Chorus settings separately from settings for a specific region and cluster:

~~~text
values/helm/storage/chorus.yaml
values/helm/storage/region-1/cluster-region-1/chorus.yaml
~~~

Check the public identity, Swift, and Ceph endpoints for the selected region. Treat the endpoint catalog as authoritative; use the resulting endpoint values in the configuration below.

~~~shell
export REGION=region-1

openstack endpoint list --region "$REGION" --service keystone --interface public
openstack endpoint list --region "$REGION" --service swift --interface public
openstack endpoint list --region "$REGION" --service ceph --interface public
~~~

For a new cluster:

1. Create the Chorus master and Redis credentials in the approved secret store for the target region. Configure the cluster secret integration to read them.
2. Use the shared file for common Worker, UI, Redis, and image settings. Put endpoint and secret references in the cluster-specific file. Never put the secret values in either file.
3. Configure the reviewed deployment pipeline to discover the cluster-specific values file. Use the chart system/chorus, Helm release chorus, and namespace chorus.
4. Keep deployments manual and use a test cluster as the promotion gate. Review the rendered configuration and deployment diff before deploying to the target cluster.

The following is a configuration shape. Replace the placeholders with values from the target environment and its secret store:

~~~yaml
chorusSecrets:
  masterPassword: "<SECRET_STORE_REFERENCE_FOR_CHORUS_MASTER>"
  redisPassword: "<SECRET_STORE_REFERENCE_FOR_REDIS>"

chorus:
  storage:
    main: swift-source
    storages:
      swift-source:
        type: SWIFT
        authURL: "<IDENTITY_ENDPOINT>"
        storageEndpointName: swift
        storageEndpointType: object-store
        region: region-1
        storageURL: "<SWIFT_ENDPOINT>"

      ceph-destination:
        type: SWIFT
        authURL: "<IDENTITY_ENDPOINT>"
        storageEndpointName: ceph
        storageEndpointType: object-store-ceph
        region: region-1
        storageURL: "<CEPH_RGW_SWIFT_ENDPOINT>"
~~~

Both aliases must use type SWIFT for the referenced Chorus version. authURL is the identity service endpoint; the public storage endpoints are resolved using the endpoint names and types. Keep storageURL set to the direct API endpoint when the configured Proxy requires it. Do not set authURL to the Ceph RGW URL.

Pin the Proxy, Worker, and UI images to approved registry paths and fixed tags. Do not use floating tags or unapproved development registries. Keep runtime passwords in the secret store and have the deployment's secret integration provide them to Chorus.

## 2. Deploy and check Chorus

Deploy the chorus Helm release into the chorus namespace using the reviewed deployment pipeline. Start in the designated test cluster, inspect the deployment diff, and promote to another cluster only after the test deployment is ready.

Set the Kubernetes context to the target cluster. For example:

~~~shell
export KUBE_CONTEXT=cluster-region-1

kubectl --context "$KUBE_CONTEXT" -n chorus wait \
  --for=condition=Ready pod --all --timeout=180s

kubectl --context "$KUBE_CONTEXT" -n chorus get pods,svc,pvc
~~~

The reference deployment exposes the REST API on port 9671, gRPC on 9670, and the Web UI on 9672. chorctl uses the REST API. In one terminal, forward the REST service:

~~~shell
kubectl --context "$KUBE_CONTEXT" -n chorus \
  port-forward svc/chorus-rest 9671:9671
~~~

In another terminal, check the CLI, Worker, and storage aliases:

~~~shell
export CHORUS_ADDRESS=http://127.0.0.1:9671

chorctl --version
chorctl worker --address "$CHORUS_ADDRESS"
chorctl storage --address "$CHORUS_ADDRESS"
~~~

Confirm that both swift-source and ceph-destination appear and have type SWIFT. Do not point chorctl at port 9670; that is the gRPC endpoint.

## 3. Register project credentials

Chorus uses the OpenStack project ID as the user identifier. Obtain the ID from the authenticated OpenStack context or use the ID supplied for the migration. Register source and destination credentials on their respective aliases. If both endpoints use the same credentials, register them on both aliases; if not, use each endpoint's credentials.

The v0.7.11 CLI passes Swift passwords as process arguments. Use disposable credentials for an interactive test. For a real migration, register credentials using trusted automation and the approved secret-handling process. Never paste a production password into a command, document, or shell history.

For a disposable test project, the command shape is:

~~~shell
export PROJECT_ID="<PROJECT_UUID>"
export SWIFT_USERNAME="<TEST_USERNAME>"
export SWIFT_DOMAIN="<TEST_DOMAIN>"
export SWIFT_TENANT="<TEST_PROJECT_NAME>"
printf 'Disposable test password: '
read -r -s SWIFT_PASSWORD
printf '\n'

chorctl set-user \
  --address "$CHORUS_ADDRESS" \
  --storage swift-source \
  --user "$PROJECT_ID" \
  --type swift \
  --swift-username "$SWIFT_USERNAME" \
  --swift-password "$SWIFT_PASSWORD" \
  --swift-domain "$SWIFT_DOMAIN" \
  --swift-tenant "$SWIFT_TENANT"

chorctl set-user \
  --address "$CHORUS_ADDRESS" \
  --storage ceph-destination \
  --user "$PROJECT_ID" \
  --type swift \
  --swift-username "$SWIFT_USERNAME" \
  --swift-password "$SWIFT_PASSWORD" \
  --swift-domain "$SWIFT_DOMAIN" \
  --swift-tenant "$SWIFT_TENANT"

unset SWIFT_PASSWORD
chorctl storage --address "$CHORUS_ADDRESS"
~~~

Confirm that the project ID is listed under USERS for both aliases. If the endpoints use different credentials, register the correct credentials for each alias.

## 4. Choose the migration mode

Chorus can copy existing objects while also processing new changes, but only when write capture is configured and working. The capture path is either the Chorus Proxy in the client request path or a supported event feed such as Swift webhook ingestion. Configure and test the chosen path before relying on it.

The reference test deployment had Proxy and webhook ingestion disabled. That setup copied an initial snapshot only; it did not copy writes made directly to Swift while the copy was running. For that mode, stop writes to Swift before starting and keep them stopped until verification and cutover are complete. A zero EVENTS count does not show that continuous synchronization is working.

::: warning
Do not treat an initial copy as an online migration unless the Proxy or event feed is enabled, connected, and tested. Without write capture, freeze source writes before the copy.
:::

## 5. Select the buckets and create policies

List the containers visible to the project and confirm the source names and destination names:

~~~shell
chorctl repl buckets \
  --address "$CHORUS_ADDRESS" \
  --from swift-source \
  --to ceph-destination \
  --user "$PROJECT_ID"
~~~

Choose one policy type for the project. Chorus does not allow user-level and bucket-level policies to be active for the same project at the same time.

For selected containers, create one bucket-level policy per source and destination pair. Use the same destination name for a like-for-like copy, or specify a different name if required:

~~~shell
export SOURCE_BUCKET="<SOURCE_CONTAINER>"
export DESTINATION_BUCKET="<DESTINATION_CONTAINER>"

chorctl repl add \
  --address "$CHORUS_ADDRESS" \
  --from swift-source \
  --to ceph-destination \
  --user "$PROJECT_ID" \
  --from-bucket "$SOURCE_BUCKET" \
  --to-bucket "$DESTINATION_BUCKET"
~~~

To copy every existing bucket for the project, create one user-level policy by omitting both bucket flags:

~~~shell
chorctl repl add \
  --address "$CHORUS_ADDRESS" \
  --from swift-source \
  --to ceph-destination \
  --user "$PROJECT_ID"
~~~

A user-level policy includes existing and future buckets and keeps their names unchanged. Remove existing policies of the other type before changing policy type. Review the configured mappings before allowing the copy to run.

## 6. Monitor the copy

Check the policy status and progress periodically:

~~~shell
chorctl repl \
  --address "$CHORUS_ADDRESS" \
  --from swift-source \
  --to ceph-destination \
  --user "$PROJECT_ID"
~~~

Wait for the expected objects to finish copying. Progress reaching 100 percent is necessary, but still verify every expected source and destination pair in the next step.

## 7. Verify each source and destination pair

Run a diff check for every bucket in the migration. For a user-level policy, set the variables for each pair and repeat the check for all buckets. If an old result exists, purge that stored result before starting a fresh check; purging a result does not change either storage.

~~~shell
export SOURCE_BUCKET="<SOURCE_CONTAINER>"
export DESTINATION_BUCKET="<DESTINATION_CONTAINER>"

chorctl diff purge \
  --address "$CHORUS_ADDRESS" \
  --user "$PROJECT_ID" \
  "swift-source:$SOURCE_BUCKET" \
  "ceph-destination:$DESTINATION_BUCKET"

chorctl diff check \
  --address "$CHORUS_ADDRESS" \
  --user "$PROJECT_ID" \
  "swift-source:$SOURCE_BUCKET" \
  "ceph-destination:$DESTINATION_BUCKET" \
  --ignore-etags
~~~

The --ignore-etags option checks object presence and size without comparing ETags. Omit it when ETag comparison is meaningful and required. Diff checks run asynchronously. Monitor and inspect the result:

~~~shell
chorctl diff --address "$CHORUS_ADDRESS"

chorctl diff report \
  --address "$CHORUS_ADDRESS" \
  --user "$PROJECT_ID" \
  "swift-source:$SOURCE_BUCKET" \
  "ceph-destination:$DESTINATION_BUCKET"
~~~

Proceed only when every required pair reports consistent. If a pair differs, keep source writes frozen when using the write-frozen mode, investigate the differences, and repeat the check.

## 8. Cut over clients and clean up

After all required pairs are consistent:

1. Keep source writes stopped if using write-frozen mode.
2. Change client configuration or the endpoint catalog through the approved change process so clients use the Ceph RGW Swift endpoint.
3. Verify clients can read expected data through Ceph. Perform only the approved write validation.
4. Resume writes on the destination only after routing checks pass.
5. Delete completed Chorus policies when they are no longer needed.

If client validation fails, keep writes stopped and follow the migration rollback plan before enabling writes on either endpoint. A policy copies in one direction; it does not copy new Ceph writes back to Swift. Deleting a policy removes Chorus replication state but does not delete source or destination containers or objects.

## Troubleshooting

| Symptom | Check |
|---|---|
| chorctl reports a malformed HTTP response | Use the REST service on port 9671, not the gRPC port 9670. |
| A storage alias is not found | Check that the configured aliases are exactly swift-source and ceph-destination. |
| A policy rejects source and destination types | Both aliases must be SWIFT for the referenced Chorus version. |
| Replication stays at zero | Confirm both aliases, project credentials, endpoint selection, and Worker logs. Do not print secrets while troubleshooting. |
| A policy already exists | Inspect current policies and remove an old one only if abandoning or changing that migration is intended. |

For production use, also validate the selected write-capture design, image provenance, storage capacity, object features used by clients, failure recovery, credential rotation, and rollback before moving customer data.

## Related pages

- [Chorus overview](./chorus.md)
- [Ceph storage](./ceph.md)
