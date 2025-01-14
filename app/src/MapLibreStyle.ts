import type { StyleSpecification } from "maplibre-gl";

// Documentation: https://maplibre.org/maplibre-style-spec/

export const openDtkStyle: StyleSpecification = {
	version: 8,
	name: "OpenDTK",
	sources: {
		openmaptiles: {
			type: "vector",
			url: `${import.meta.env.VITE_TILEMAKER_SERVER_URL}/spec.json`,
		},
	},
	layers: [
		{
			id: "ozadje",
			type: "background",
			paint: {
				"background-color": "#fff",
			},
		},
		{
			id: "gozd",
			type: "fill",
			source: "openmaptiles",
			"source-layer": "landcover",
			filter: ["==", "class", "wood"],
			paint: {
				"fill-color": "#c8e2d0",
			},
		},
		{
			id: "zgradba",
			type: "fill",
			source: "openmaptiles",
			"source-layer": "building",
			paint: {
				"fill-color": "#000",
			},
		},
		{
			id: "pespot",
			type: "line",
			source: "openmaptiles",
			"source-layer": "transportation",
			filter: ["all", ["==", "$type", "LineString"], ["in", "class", "path"]],
			layout: { "line-cap": "square", "line-join": "bevel" },
			paint: {
				"line-color": "#000",
				"line-dasharray": [2, 3],
			},
		},
		{
			id: "sirsa-steza",
			type: "line",
			source: "openmaptiles",
			"source-layer": "transportation",
			filter: [
				"all",
				["==", "$type", "LineString"],
				["in", "tracktype", "grade5", "grade6"],
			],
			layout: { "line-cap": "square", "line-join": "bevel" },
			paint: {
				"line-color": "#000",
				"line-dasharray": [10, 3],
			},
		},
		{
			id: "slabsi-kolovoz",
			type: "line",
			source: "openmaptiles",
			"source-layer": "transportation",
			filter: [
				"all",
				["==", "$type", "LineString"],
				["in", "tracktype", "grade3", "grade4"],
			],
			layout: { "line-cap": "square", "line-join": "bevel" },
			paint: {
				"line-color": "#000",
				"line-dasharray": [25, 3],
			},
		},
		{
			id: "kolovoz",
			type: "line",
			source: "openmaptiles",
			"source-layer": "transportation",
			filter: [
				"all",
				["==", "$type", "LineString"],
				["in", "tracktype", "grade1", "grade2"],
			],
			layout: { "line-cap": "square", "line-join": "bevel" },
			paint: {
				"line-color": "#000",
			},
		},
		{
			id: "lokalna_cesta",
			type: "line",
			source: "openmaptiles",
			"source-layer": "transportation",
			filter: ["all", ["==", "$type", "LineString"], ["in", "class", "minor"]],
			layout: { "line-cap": "square", "line-join": "bevel" },
			paint: {
				"line-color": "#000",
				"line-gap-width": 2,
			},
		},
		{
			id: "lokalna_cesta_bg",
			type: "line",
			source: "openmaptiles",
			"source-layer": "transportation",
			filter: ["all", ["==", "$type", "LineString"], ["in", "class", "minor"]],
			layout: { "line-cap": "square", "line-join": "bevel" },
			paint: {
				"line-color": "#fff",
				"line-width": 2,
			},
		},
		{
			id: "obcinska_cesta",
			type: "line",
			source: "openmaptiles",
			"source-layer": "transportation",
			filter: [
				"all",
				["==", "$type", "LineString"],
				["in", "class", "tertiary"],
			],
			layout: { "line-cap": "square", "line-join": "bevel" },
			paint: {
				"line-color": "#000",
				"line-gap-width": 3,
			},
		},
		{
			id: "drzavna_cesta",
			type: "line",
			source: "openmaptiles",
			"source-layer": "transportation",
			filter: [
				"all",
				["==", "$type", "LineString"],
				["in", "class", "secondary"],
			],
			layout: { "line-cap": "square", "line-join": "bevel" },
			paint: {
				"line-color": "#000",
				"line-gap-width": 3,
			},
		},
		{
			id: "regionalna_cesta",
			type: "line",
			source: "openmaptiles",
			"source-layer": "transportation",
			filter: [
				"all",
				["==", "$type", "LineString"],
				["in", "class", "primary"],
			],
			layout: { "line-cap": "square", "line-join": "bevel" },
			paint: {
				"line-color": "#000",
				"line-gap-width": 3,
			},
		},
		{
			id: "hitra_cesta",
			type: "line",
			source: "openmaptiles",
			"source-layer": "transportation",
			filter: ["all", ["==", "$type", "LineString"], ["in", "class", "trunk"]],
			layout: { "line-cap": "square", "line-join": "bevel" },
			paint: {
				"line-color": "#000",
				"line-gap-width": 3,
			},
		},
		{
			id: "avto_cesta",
			type: "line",
			source: "openmaptiles",
			"source-layer": "transportation",
			filter: [
				"all",
				["==", "$type", "LineString"],
				["in", "class", "motorway"],
			],
			layout: { "line-cap": "square", "line-join": "bevel" },
			paint: {
				"line-color": "#000",
				"line-gap-width": 3,
			},
		},
		{
			id: "cesta_bg",
			type: "line",
			source: "openmaptiles",
			"source-layer": "transportation",
			filter: [
				"all",
				["==", "$type", "LineString"],
				[
					"in",
					"class",
					"tertiary",
					"secondary",
					"primary",
					"trunk",
					"motorway",
				],
			],
			layout: { "line-cap": "square", "line-join": "bevel" },
			paint: {
				"line-color": "#fff",
				"line-width": 3,
			},
		},
	],
};

/*
https://wiki.openstreetmap.org/wiki/Key:highway

motorway  > avtocesta
trunk     > hitra cesta
primary   > regionalna cesta
secondary > državna cesta
tertiary  > občinska cesta
minor     > lokalna cesta
path      > ozka steza / pešpot
service	  > IDFK
track			> Kolovoz
raceway   > IDFK
busway
bus_guideway
ferry
motorway_construction
trunk_construction
primary_construction
secondary_construction
tertiary_construction
minor_construction
path_construction
service_construction
track_construction
raceway_construction

{
			id: "slabsi_kolovoz",
			type: "line",
			source: "openmaptiles",
			"source-layer": "transportation",
			filter: ["all", ["==", "$type", "LineString"], ["in", "class", "track"]],
			layout: { "line-cap": "square", "line-join": "bevel" },
			paint: {
				"line-color": "#000",
				"line-dasharray": [40, 3],
			},
		},
		{
			id: "sirsa_cesta",
			type: "line",
			source: "openmaptiles",
			"source-layer": "transportation",
			filter: ["all", ["==", "$type", "LineString"], ["in", "subclass", "path"]],
			layout: { "line-cap": "square", "line-join": "bevel" },
			paint: {
				"line-color": "#000",
				"line-dasharray": [15, 3],
			},
		},
*/
