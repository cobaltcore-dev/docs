#!/usr/bin/env bash

# This script builds the API documentation
set -euox pipefail

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "git is not installed. Please install git to proceed."
    exit 1
fi

repos=(
  "git@github.com:cobaltcore-dev/openstack-hypervisor-operator.git"
  "git@github.com:cobaltcore-dev/kvm-node-agent.git"
)

mkdir -p build/
pushd build
GOBIN=`pwd` go install github.com/ahmetb/gen-crd-api-reference-docs@v0.3.0
for repo in "${repos[@]}"; do
  git clone --depth 1 --single-branch "$repo" || true
done
popd

for repo in openstack-hypervisor-operator kvm-node-agent; do
  api_dir=$(find build/$repo/api | egrep "(v1|v1alpha)$")
  ./build/gen-crd-api-reference-docs -api-dir ./$api_dir -config ./hack/config.json -template-dir ./hack/template/ -out-file ./docs/api/$repo.md
done