#!/bin/bash

pushd vue-app
yarn install
yarn build
popd

pushd react-app
yarn install
yarn build
popd