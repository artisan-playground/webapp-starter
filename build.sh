#!/bin/bash

pushd vue-app
yarn install
yarn build
popd

# pushd react-app
# yarn install
# yarn build
# popd


# docker build -t nazt/webapp-starter .
# docker run --rm -it -p4000:4000 --init nazt/webapp-starter