import type { LayerSpecification, StyleSpecification } from "maplibre-gl";

// Documentation: https://maplibre.org/maplibre-style-spec/

export const openDTK: StyleSpecification = {
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
	],
};

const terrains: LayerSpecification[] = [
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
];
openDTK.layers.push(...terrains);

const roads: LayerSpecification[] = [
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
		id: "slabsi_kolovoz",
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
			"line-gap-width": 1,
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
			"line-width": 1,
		},
	},
	{
		id: "obcinska_cesta",
		type: "line",
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: ["all", ["==", "$type", "LineString"], ["in", "class", "tertiary"]],
		layout: { "line-cap": "square", "line-join": "bevel" },
		paint: {
			"line-color": "#000",
			"line-gap-width": 2,
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
			"line-gap-width": 2,
		},
	},
	{
		id: "regionalna_cesta",
		type: "line",
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: ["all", ["==", "$type", "LineString"], ["in", "class", "primary"]],
		layout: { "line-cap": "square", "line-join": "bevel" },
		paint: {
			"line-color": "#000",
			"line-gap-width": 2,
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
			"line-gap-width": 2,
		},
	},
	{
		id: "avto_cesta",
		type: "line",
		source: "openmaptiles",
		"source-layer": "transportation",
		filter: ["all", ["==", "$type", "LineString"], ["in", "class", "motorway"]],
		layout: { "line-cap": "square", "line-join": "bevel" },
		paint: {
			"line-color": "#000",
			"line-gap-width": 2,
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
			["in", "class", "tertiary", "secondary", "primary", "trunk", "motorway"],
		],
		layout: { "line-cap": "square", "line-join": "bevel" },
		paint: {
			"line-color": "#fff",
			"line-width": 2,
		},
	},
];
openDTK.layers.push(...roads);

const labels: LayerSpecification[] = [
	{
		id: "place-other",
		type: "symbol",
		metadata: { "mapbox:group": "1444849242106.713" },
		source: "openmaptiles",
		"source-layer": "place",
		filter: [
			"!in",
			"class",
			"city",
			"town",
			"village",
			"state",
			"country",
			"continent",
		],
		layout: {
			"text-font": ["KlokanTech Noto Sans Bold"],
			"text-letter-spacing": 0.1,
			"text-max-width": 9,
			"text-size": 12,
			"text-transform": "uppercase",
			visibility: "visible",
		},
		paint: {
			"text-color": "#633",
			"text-halo-color": "rgba(255,255,255,0.8)",
			"text-halo-width": 1.2,
		},
	},
];
openDTK.layers.push(...labels);