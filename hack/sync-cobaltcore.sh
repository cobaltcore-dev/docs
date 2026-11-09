#!/usr/bin/env bash

# Puts the documentation of C5C3/cobaltcore into docs/_upstream/cobaltcore, where
# docs/.vitepress/overlay.ts mounts it under /openstack/. npm runs this script
# before `docs:dev` and `docs:build`, and `npm run docs:sync` runs it on its own.
#
# - Without a checkout, it clones C5C3/cobaltcore (branch COBALTCORE_REF, default
#   main) sparsely: docs/ for the pages, tests/ and deploy/ for the files the
#   pages import.
# - An existing checkout is left alone. The CI workflow of this repository and
#   the docs-overlay job of C5C3/cobaltcore put one there before the build.
#   Delete the directory to fetch a fresh copy.
# - With COBALTCORE_SRC set to a C5C3/cobaltcore checkout, it copies docs/,
#   tests/ and deploy/ from there instead, to preview local changes.
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
target="$root/docs/_upstream/cobaltcore"
ref="${COBALTCORE_REF:-main}"

if [[ -n "${COBALTCORE_SRC:-}" ]]; then
  if ! command -v rsync >/dev/null; then
    echo "sync-cobaltcore: copying from COBALTCORE_SRC needs rsync" >&2
    exit 1
  fi
  for dir in docs tests deploy; do
    if [[ ! -d "$COBALTCORE_SRC/$dir" ]]; then
      echo "sync-cobaltcore: $COBALTCORE_SRC/$dir does not exist" >&2
      exit 1
    fi
  done
  mkdir -p "$target"
  rsync -a --delete --exclude .vitepress/cache --exclude .vitepress/dist \
    "$COBALTCORE_SRC/docs" "$COBALTCORE_SRC/tests" "$COBALTCORE_SRC/deploy" "$target/"
  echo "sync-cobaltcore: copied docs/, tests/ and deploy/ from $COBALTCORE_SRC"
  exit 0
fi

if [[ -f "$target/docs/.vitepress/publish.json" ]]; then
  echo "sync-cobaltcore: using $target (delete it to fetch a fresh copy)"
  exit 0
fi
if [[ -e "$target" ]]; then
  echo "sync-cobaltcore: $target holds no docs/.vitepress/publish.json; delete it and run npm run docs:sync" >&2
  exit 1
fi

if ! command -v git >/dev/null; then
  echo "sync-cobaltcore: cloning C5C3/cobaltcore needs git" >&2
  exit 1
fi
mkdir -p "$(dirname "$target")"
git clone --quiet --depth 1 --filter=blob:none --sparse --branch "$ref" \
  https://github.com/C5C3/cobaltcore.git "$target"
git -C "$target" sparse-checkout set docs tests deploy
echo "sync-cobaltcore: cloned C5C3/cobaltcore ($ref) into $target"
