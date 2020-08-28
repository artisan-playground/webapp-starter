#!/bin/bash
set -e

args=("$@")

if [ $# -lt 1 ]; then
      echo "No arguments supplied"
      exit -1
fi

pushd "${args[0]}"
yarn install
yarn build
popd
