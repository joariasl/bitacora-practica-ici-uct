#!/usr/bin/env sh

out=bitacora.zip
local=$(pwd)

rm -f $out

pushd ng/dist
grunt build
zip -r $local/$out .
popd

pushd www
zip -r $local/$out . -x ".gitignore" "composer.json" "*/composer.json" "*/composer.lock"
popd
