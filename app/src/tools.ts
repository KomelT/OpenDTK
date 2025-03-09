export function getCordsFromSearchParam(
	defLon: number,
	defLat: number,
	defZoom: number,
) {
	return {
		longitude: Number.parseFloat(getSearchParam("lon")) || defLon,
		latitude: Number.parseFloat(getSearchParam("lat")) || defLat,
		zoom: Number.parseFloat(getSearchParam("zoom")) || defZoom,
	};
}

export function getBooleanSearchParam(param: string): boolean {
  return getSearchParam(param) === "true";
}

function getSearchParam(param: string): string {
	return new URLSearchParams(window.location.search).get(param) || "";
}
