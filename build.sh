#!/usr/bin/env sh

BASEDIR=$(dirname $0)
out=bitacora.zip
local=$(pwd)

rm -f $BASEDIR/$out

pushd $BASEDIR/ng/dist
grunt build
zip -r $local/$out .
popd

pushd $BASEDIR/www
zip -r $local/$out . -x ".gitignore" "composer.json" "*/composer.json" "*/composer.lock"
popd
