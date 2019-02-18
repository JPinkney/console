#!/usr/bin/env bash

set -e

pushd frontend
yarn install
yarn run build
echo $?
pwd
ls -la ./public/dist
popd
