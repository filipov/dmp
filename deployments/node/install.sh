#!/usr/bin/env bash

VERSION=v14.11.0

rm -rf ./deployments/node/interpreter || echo 'Not exists'

curl https://nodejs.org/dist/$VERSION/node-$VERSION-darwin-x64.tar.gz --output node.tar.gz

tar -xJvf node.tar.gz -C ./deployments/node

mv ./deployments/node/node-$VERSION-darwin-x64 ./deployments/node/interpreter

rm ./node.tar.gz
