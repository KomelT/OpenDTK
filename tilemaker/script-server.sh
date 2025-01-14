#! /bin/bash

# Clone repo
git clone https://github.com/systemed/tilemaker.git

# Run tilemaker
/usr/src/app/tilemaker-server --input ./out/data.mbtiles --static /var/app/tilemaker/server/static