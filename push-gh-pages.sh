#!/bin/bash
rm -rf gh-pages
git clone --depth=1 git@github.com:victorhaggqvist/touch-imagelightbox.git --branch gh-pages gh-pages
rm -rf gh-pages/*
cp demo/* gh-pages
pushd gh-pages
git add .
git commit -m "$(git rev-parse --git-dir=../.git --short HEAD)"
git push origin gh-pages --force
popd
