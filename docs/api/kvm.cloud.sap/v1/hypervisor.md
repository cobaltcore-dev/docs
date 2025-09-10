---
title: Hypervisor
weight: 1
description: Hypervisor CRD
---

Packages:

- [kvm.cloud.sap/v1](#kvmcloudsapv1)

# kvm.cloud.sap/v1

Resource Types:

- [Hypervisor](#hypervisor)




## Hypervisor
<sup><sup>[↩ Parent](#kvmcloudsapv1 )</sup></sup>






Hypervisor is the Schema for the hypervisors API

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
    </thead>
    <tbody><tr>
      <td><b>apiVersion</b></td>
      <td>string</td>
      <td>kvm.cloud.sap/v1</td>
      <td>true</td>
      </tr>
      <tr>
      <td><b>kind</b></td>
      <td>string</td>
      <td>Hypervisor</td>
      <td>true</td>
      </tr>
      <tr>
      <td><b><a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.27/#objectmeta-v1-meta">metadata</a></b></td>
      <td>object</td>
      <td>Refer to the Kubernetes API documentation for the fields of the `metadata` field.</td>
      <td>true</td>
      </tr><tr>
        <td><b><a href="#hypervisorspec">spec</a></b></td>
        <td>object</td>
        <td>
          HypervisorSpec defines the desired state of Hypervisor<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#hypervisorstatus">status</a></b></td>
        <td>object</td>
        <td>
          HypervisorStatus defines the observed state of Hypervisor<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### Hypervisor.spec
<sup><sup>[↩ Parent](#hypervisor)</sup></sup>



HypervisorSpec defines the desired state of Hypervisor

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
    </thead>
    <tbody><tr>
        <td><b>createCertManagerCertificate</b></td>
        <td>boolean</td>
        <td>
          Require to issue a certificate from cert-manager for the hypervisor, to be used for
secure communication with the libvirt API.<br/>
          <br/>
            <i>Default</i>: false<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>customTraits</b></td>
        <td>[]string</td>
        <td>
          CustomTraits are used to apply custom traits to the hypervisor.<br/>
          <br/>
            <i>Default</i>: []<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>evacuateOnReboot</b></td>
        <td>boolean</td>
        <td>
          EvacuateOnReboot request an evacuation of all instances before reboot.<br/>
          <br/>
            <i>Default</i>: true<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>highAvailability</b></td>
        <td>boolean</td>
        <td>
          HighAvailability is used to enable the high availability handling of the hypervisor.<br/>
          <br/>
            <i>Default</i>: true<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>installCertificate</b></td>
        <td>boolean</td>
        <td>
          InstallCertificate is used to enable the installations of the certificates via kvm-node-agent.<br/>
          <br/>
            <i>Default</i>: true<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>lifecycleEnabled</b></td>
        <td>boolean</td>
        <td>
          LifecycleEnabled enables the lifecycle management of the hypervisor via hypervisor-operator.<br/>
          <br/>
            <i>Default</i>: true<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>reboot</b></td>
        <td>boolean</td>
        <td>
          Reboot request an reboot after successful installation of an upgrade.<br/>
          <br/>
            <i>Default</i>: false<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>skipTests</b></td>
        <td>boolean</td>
        <td>
          SkipTests skips the tests during the onboarding process.<br/>
          <br/>
            <i>Default</i>: false<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>version</b></td>
        <td>string</td>
        <td>
          OperatingSystemVersion represents the desired operating system version.<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### Hypervisor.status
<sup><sup>[↩ Parent](#hypervisor)</sup></sup>



HypervisorStatus defines the observed state of Hypervisor

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
    </thead>
    <tbody><tr>
        <td><b>numInstances</b></td>
        <td>integer</td>
        <td>
          Represent the num of instances<br/>
          <br/>
            <i>Default</i>: 0<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b><a href="#hypervisorstatuscapabilities">capabilities</a></b></td>
        <td>object</td>
        <td>
          The capabilities of the hypervisors as reported by libvirt.<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#hypervisorstatusconditionsindex">conditions</a></b></td>
        <td>[]object</td>
        <td>
          Represents the Hypervisor node conditions.<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>hypervisorId</b></td>
        <td>string</td>
        <td>
          HypervisorID is the unique identifier of the hypervisor in OpenStack.<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#hypervisorstatusinstancesindex">instances</a></b></td>
        <td>[]object</td>
        <td>
          Represents the Hypervisor hosted Virtual Machines<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>libVirtVersion</b></td>
        <td>string</td>
        <td>
          Represents the LibVirt version.<br/>
          <br/>
            <i>Default</i>: unknown<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#hypervisorstatusoperatingsystem">operatingSystem</a></b></td>
        <td>object</td>
        <td>
          Represents the Operating System status.<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>serviceId</b></td>
        <td>string</td>
        <td>
          ServiceID is the unique identifier of the compute service in OpenStack.<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>specHash</b></td>
        <td>string</td>
        <td>
          <br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b><a href="#hypervisorstatusupdatestatus">updateStatus</a></b></td>
        <td>object</td>
        <td>
          Represents the Hypervisor update status.<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### Hypervisor.status.capabilities
<sup><sup>[↩ Parent](#hypervisorstatus)</sup></sup>



The capabilities of the hypervisors as reported by libvirt.

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
    </thead>
    <tbody><tr>
        <td><b>cpuArch</b></td>
        <td>string</td>
        <td>
          The hosts CPU architecture (not the guests).<br/>
          <br/>
            <i>Default</i>: unknown<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>cpus</b></td>
        <td>int or string</td>
        <td>
          Total host cpus available as a sum of cpus over all numa cells.<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>memory</b></td>
        <td>int or string</td>
        <td>
          Total host memory available as a sum of memory over all numa cells.<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### Hypervisor.status.conditions[index]
<sup><sup>[↩ Parent](#hypervisorstatus)</sup></sup>



Condition contains details for one aspect of the current state of this API Resource.

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
    </thead>
    <tbody><tr>
        <td><b>lastTransitionTime</b></td>
        <td>string</td>
        <td>
          lastTransitionTime is the last time the condition transitioned from one status to another.
This should be when the underlying condition changed.  If that is not known, then using the time when the API field changed is acceptable.<br/>
          <br/>
            <i>Format</i>: date-time<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>message</b></td>
        <td>string</td>
        <td>
          message is a human readable message indicating details about the transition.
This may be an empty string.<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>reason</b></td>
        <td>string</td>
        <td>
          reason contains a programmatic identifier indicating the reason for the condition's last transition.
Producers of specific condition types may define expected values and meanings for this field,
and whether the values are considered a guaranteed API.
The value should be a CamelCase string.
This field may not be empty.<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>status</b></td>
        <td>enum</td>
        <td>
          status of the condition, one of True, False, Unknown.<br/>
          <br/>
            <i>Enum</i>: True, False, Unknown<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>type</b></td>
        <td>string</td>
        <td>
          type of condition in CamelCase or in foo.example.com/CamelCase.<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>observedGeneration</b></td>
        <td>integer</td>
        <td>
          observedGeneration represents the .metadata.generation that the condition was set based upon.
For instance, if .metadata.generation is currently 12, but the .status.conditions[x].observedGeneration is 9, the condition is out of date
with respect to the current state of the instance.<br/>
          <br/>
            <i>Format</i>: int64<br/>
            <i>Minimum</i>: 0<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### Hypervisor.status.instances[index]
<sup><sup>[↩ Parent](#hypervisorstatus)</sup></sup>





<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
    </thead>
    <tbody><tr>
        <td><b>active</b></td>
        <td>boolean</td>
        <td>
          Represents the instance state.<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>id</b></td>
        <td>string</td>
        <td>
          Represents the instance ID (uuidv4).<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>name</b></td>
        <td>string</td>
        <td>
          Represents the instance name.<br/>
        </td>
        <td>true</td>
      </tr></tbody>
</table>


### Hypervisor.status.operatingSystem
<sup><sup>[↩ Parent](#hypervisorstatus)</sup></sup>



Represents the Operating System status.

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
    </thead>
    <tbody><tr>
        <td><b>firmwareDate</b></td>
        <td>string</td>
        <td>
          FirmwareDate<br/>
          <br/>
            <i>Format</i>: date-time<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>firmwareVendor</b></td>
        <td>string</td>
        <td>
          FirmwareVendor<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>firmwareVersion</b></td>
        <td>string</td>
        <td>
          FirmwareVersion<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>hardwareModel</b></td>
        <td>string</td>
        <td>
          HardwareModel<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>hardwareSerial</b></td>
        <td>string</td>
        <td>
          HardwareSerial<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>hardwareVendor</b></td>
        <td>string</td>
        <td>
          HardwareVendor<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>kernelName</b></td>
        <td>string</td>
        <td>
          KernelName<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>kernelRelease</b></td>
        <td>string</td>
        <td>
          KernelRelease<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>kernelVersion</b></td>
        <td>string</td>
        <td>
          KernelVersion<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>prettyVersion</b></td>
        <td>string</td>
        <td>
          PrettyVersion<br/>
        </td>
        <td>false</td>
      </tr><tr>
        <td><b>version</b></td>
        <td>string</td>
        <td>
          Represents the Operating System version.<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>


### Hypervisor.status.updateStatus
<sup><sup>[↩ Parent](#hypervisorstatus)</sup></sup>



Represents the Hypervisor update status.

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
    </thead>
    <tbody><tr>
        <td><b>inProgress</b></td>
        <td>boolean</td>
        <td>
          Represents a running Operating System update.<br/>
          <br/>
            <i>Default</i>: false<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>retry</b></td>
        <td>integer</td>
        <td>
          Represents the number of retries.<br/>
          <br/>
            <i>Default</i>: 3<br/>
        </td>
        <td>true</td>
      </tr><tr>
        <td><b>installed</b></td>
        <td>string</td>
        <td>
          Represents the Operating System installed update version.<br/>
          <br/>
            <i>Default</i>: unknown<br/>
        </td>
        <td>false</td>
      </tr></tbody>
</table>
