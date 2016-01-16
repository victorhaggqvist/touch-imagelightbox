#!/bin/bash
git clone --depth=0 git@github.com:victorhaggqvist/touch-imagelightbox.git --branch gh-pages gh-pages
rm -rf gh-pages/*
cp demo/* gh-pages
git add .
git commit -m "$(git rev-parse --git-dir=../.git --short HEAD)"
git push origin gh-pages
