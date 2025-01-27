#!/bin/bash

OSM_PBF_FILE="https://mirror.komelt.dev/osm/europe/slovenia-latest.osm.pbf"
CONTOUR_SHP_FILE="https://mirror.komelt.dev/gurs/DTM_SLO_RELIEF.zip"

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
if [ -f "./tmp/DTM_SLO_RELIEF_EL_PLASTNICE_VZHOD_L_line.shp" ] && [ -f "./tmp/DTM_SLO_RELIEF_EL_PLASTNICE_ZAHOD_L_line.shp" ]; then
  echo "File ./tmp/data.osm.pbf already exists. Skipping download..."
else
  if [ -f "./tmp/DTM_SLO_RELIEF.zip" ]; then
    echo "File ./tmp/DTM_SLO_RELIEF.zip already exists. Skipping download..."
  else
    wget $CONTOUR_SHP_FILE -O ./tmp/DTM_SLO_RELIEF.zip
    if [ $? -ne 0 ]; then
      echo "Failed to download contour SHP files"
      exit 1
    fi
  fi

  unzip ./tmp/DTM_SLO_RELIEF.zip -d ./DTM_SLO_RELIEF
  unzip ./DTM_SLO_RELIEF/DTM_SLO_RELIEF_EL_PLASTNICE_* -d ./tmp_contour

  mv ./tmp_contour/*.shp ./tmp/
  mv ./tmp_contour/*.shx ./tmp/

  rm -rf ./DTM_SLO_RELIEF*
  rm -rf ./tmp_contour
fi

echo -e "Done\n"

# Run tilemaker
/usr/src/app/tilemaker ./tmp/data.osm.pbf \
  --output ./out/data.mbtiles \
  --config ./out/config.json \
  --process ./out/process.lua \
  --store /tmp