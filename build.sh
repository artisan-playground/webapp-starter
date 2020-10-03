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

if [[ "${args[0]}" = "vue-app" ]]; then
    echo "vue-app"
    rm -Rf dist
    mv vue-app/dist dist
elif [[ "${args[0]}" = "react-app" ]]; then
    echo "react-app"
    rm -Rf dist
    mv react-app/build dist
fi

