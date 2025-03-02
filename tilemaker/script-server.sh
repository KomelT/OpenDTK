#!/bin/bash

if [ -z "$TILEMAKER_SERVER_URL" ]; then
  TILEMAKER_SERVER_URL="http://localhost/tileserver"
fi

sed -i "s|http://localhost/tileserver|${TILEMAKER_SERVER_URL}|g" ./static/spec.json

sed -i "s|http://localhost/tileserver|${TILEMAKER_SERVER_URL}|g" ./static/style.json

# Run tilemaker
/usr/src/app/tilemaker-server --input ./out/data.mbtiles --static /var/app/static