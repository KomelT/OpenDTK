#!/bin/bash

if [ -z "$MIRROR_URL" ]; then
  MIRROR_URL="https://mirror.komelt.dev"
fi

OSM_PBF_FILE="${MIRROR_URL}/osm/europe/slovenia-latest.osm.pbf"
CONTOUR_SHP_FILE="${MIRROR_URL}/gurs/DTM_SLO_RELIEF_EL_PLASTNICE_EPSG4326_line.zip"

# Chech if ./out/data.mbtiles exists
if [ -f "./out/data.mbtiles" ]; then
  echo "File ./out/data.mbtiles already exists"
  exit 0
fi

mkdir ./tmp

# Check if OSM PBF file exists
if [ -f "./tmp/data.osm.pbf" ]; then
  echo "File ./tmp/data.osm.pbf already exists. Skipping download..."
else
  wget -O ./tmp/data.osm.pbf $OSM_PBF_FILE
fi

if [ $? -ne 0 ]; then
  echo "Downloading OSM PBF file failed"
  exit 1
fi

# Check if contour SHP files exists
if [ -f "./tmp/DTM_SLO_RELIEF_EL_PLASTNICE_EPSG4326_line.shp" ]; then
  echo "File ./tmp/DTM_SLO_RELIEF_EL_PLASTNICE_EPSG4326_line.shp already exists. Skipping download..."
else
  if [ -f "./tmp/DTM_SLO_RELIEF_EL_PLASTNICE_EPSG4326_line.zip" ]; then
    echo "File ./tmp/DTM_SLO_RELIEF_EL_PLASTNICE_EPSG4326_line.zip already exists. Skipping download..."
  else
    wget $CONTOUR_SHP_FILE -O ./tmp/DTM_SLO_RELIEF_EL_PLASTNICE_EPSG4326_line.zip
    if [ $? -ne 0 ]; then
      echo "Failed to download contour DTM_SLO_RELIEF_EL_PLASTNICE_EPSG4326_line.zip file"
      exit 1
    fi
  fi

  unzip ./tmp/DTM_SLO_RELIEF_EL_PLASTNICE_EPSG4326_line.zip -d ./tmp
fi

echo -e "Done\n"

# Run tilemaker
/usr/src/app/tilemaker ./tmp/data.osm.pbf \
  --output ./out/data.mbtiles \
  --config ./out/config.json \
  --process ./out/process.lua \
  --store /tmp
