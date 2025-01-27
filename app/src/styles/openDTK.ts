import type { LayerSpecification, StyleSpecification } from "maplibre-gl";

// Documentation: https://maplibre.org/maplibre-style-spec/

export const openDTK: StyleSpecification = {
	version: 8,
	name: "OpenDTK",
	sources: {
		opendtk: {
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
	],
};

// Terrain types
openDTK.layers.push(
	...([
		{
			id: "gozd",
			type: "fill",
			source: "opendtk",
			"source-layer": "landcover",
			filter: ["==", "class", "wood"],
			paint: {
				"fill-color": "#d2e6c3",
			},
		},
		{
			id: "zgradba",
			type: "fill",
			source: "opendtk",
			"source-layer": "building",
			paint: {
				"fill-color": "#000",
			},
		},
	] as LayerSpecification[]),
);

// Waterways
openDTK.layers.push(
	...([
		{
			id: "potok-kanal-ozji-5m-obcasno-brez-vode",
			type: "line",
			source: "opendtk",
			"source-layer": "waterway",
			filter: [
				"all",
				["in", "class", "canal", "stream"],
				["!=", "brunnel", "tunnel"],
				["==", "intermittent", 1],
			],
			layout: { "line-cap": "round", visibility: "visible" },
			paint: {
				"line-color": "#322b73",
				"line-width": 1,
				"line-dasharray": [7, 2],
			},
		},
		{
			id: "potok-kanal-ozji-5m",
			type: "line",
			source: "opendtk",
			"source-layer": "waterway",
			filter: [
				"all",
				["in", "class", "canal", "stream"],
				["!=", "brunnel", "tunnel"],
				["==", "intermittent", 0],
			],
			layout: { "line-cap": "round", visibility: "visible" },
			paint: {
				"line-color": "#322b73",
				"line-width": 1,
			},
		},
		{
			id: "vodovje",
			type: "fill",
			source: "opendtk",
			"source-layer": "water",
			filter: ["==", "$type", "Polygon"],
			paint: {
				"fill-color": "#a9b5d6",
				"fill-outline-color": "#322b73",
			},
		},
	] as LayerSpecification[]),
);

// Roads
openDTK.layers.push(
	...([
		{
			id: "pespot",
			type: "line",
			source: "opendtk",
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
			source: "opendtk",
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
			id: "slabsi_kolovoz",
			type: "line",
			source: "opendtk",
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
			source: "opendtk",
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
			source: "opendtk",
			"source-layer": "transportation",
			filter: ["all", ["==", "$type", "LineString"], ["in", "class", "minor"]],
			layout: { "line-cap": "square", "line-join": "bevel" },
			paint: {
				"line-color": "#000",
				"line-gap-width": 1,
			},
		},
		{
			id: "lokalna_cesta_bg",
			type: "line",
			source: "opendtk",
			"source-layer": "transportation",
			filter: ["all", ["==", "$type", "LineString"], ["in", "class", "minor"]],
			layout: { "line-cap": "square", "line-join": "bevel" },
			paint: {
				"line-color": "#fff",
				"line-width": 1,
			},
		},
		{
			id: "obcinska_cesta",
			type: "line",
			source: "opendtk",
			"source-layer": "transportation",
			filter: [
				"all",
				["==", "$type", "LineString"],
				["in", "class", "tertiary"],
			],
			layout: { "line-cap": "square", "line-join": "bevel" },
			paint: {
				"line-color": "#000",
				"line-gap-width": 2,
			},
		},
		{
			id: "drzavna_cesta",
			type: "line",
			source: "opendtk",
			"source-layer": "transportation",
			filter: [
				"all",
				["==", "$type", "LineString"],
				["in", "class", "secondary"],
			],
			layout: { "line-cap": "square", "line-join": "bevel" },
			paint: {
				"line-color": "#000",
				"line-gap-width": 2,
			},
		},
		{
			id: "regionalna_cesta",
			type: "line",
			source: "opendtk",
			"source-layer": "transportation",
			filter: [
				"all",
				["==", "$type", "LineString"],
				["in", "class", "primary"],
			],
			layout: { "line-cap": "square", "line-join": "bevel" },
			paint: {
				"line-color": "#000",
				"line-gap-width": 2,
			},
		},
		{
			id: "hitra_cesta",
			type: "line",
			source: "opendtk",
			"source-layer": "transportation",
			filter: ["all", ["==", "$type", "LineString"], ["in", "class", "trunk"]],
			layout: { "line-cap": "square", "line-join": "bevel" },
			paint: {
				"line-color": "#000",
				"line-gap-width": 2,
			},
		},
		{
			id: "avto_cesta",
			type: "line",
			source: "opendtk",
			"source-layer": "transportation",
			filter: [
				"all",
				["==", "$type", "LineString"],
				["in", "class", "motorway"],
			],
			layout: { "line-cap": "square", "line-join": "bevel" },
			paint: {
				"line-color": "#000",
				"line-gap-width": 2,
			},
		},
		{
			id: "cesta_bg",
			type: "line",
			source: "opendtk",
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
				"line-width": 2,
			},
		},
	] as LayerSpecification[]),
);
