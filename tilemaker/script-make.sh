#! /bin/bash

OSM_PBF_FILE="https://download.geofabrik.de/europe/slovenia-latest.osm.pbf"

# Chech if ./out/data.mbtiles exists
if [ -f "./out/data.mbtiles" ]; then
  echo "File ./out/data.mbtiles already exists"
  exit 0
fi

mkdir -p ./tmp

# Check if OSM PBF file exists
if [ -f "./tmp/data.osm.pbf" ]; then
  echo "File ./tmp/data.osm.pbf already exists. Skipping download..."
else
  wget -O ./tmp/data.osm.pbf $OSM_PBF_FILE
fi

# Run tilemaker
/usr/src/app/tilemaker ./tmp/data.osm.pbf \
  --output ./out/data.mbtiles \
  --config ./out/config.json \
  --process ./out/process.lua \
  --store /tmp

# Remove downloaded OSM PBF file
rm -rf ./tmp/*
