import type { ControlPosition, IControl, Map as LMap, Unit } from "maplibre-gl";
import { DOM } from "./dom.ts";

export interface ScaleControlOptions {
	maxWidth?: number;
	unit?: "imperial" | "metric" | "nautical";
	updateWhenIdle?: boolean;
}

const defaultOptions: ScaleControlOptions = {
	maxWidth: 100,
	unit: "metric",
};

export class TopoScale implements IControl {
	_map: LMap;
	_container: HTMLElement;
	_dummyContainer: HTMLElement;
	options: ScaleControlOptions;

	/**
	 * @param options - the control's options
	 */
	constructor(options?: ScaleControlOptions) {
		this.options = { ...defaultOptions, ...options };
	}

	getDefaultPosition(): ControlPosition {
		return "bottom-left";
	}

	_onMove = () => {
		this.updateScale(this._map, this._container, this.options);
	};

	/** {@inheritDoc IControl.onAdd} */
	onAdd(map: LMap) {
		this._map = map;

		// Create the TopoScale control container
		const el = window.document.createElement("div");
		el.className = "topo-scale";
		this._container = this._map.getContainer().appendChild(el);

		// Create scale text
		const el1 = window.document.createElement("p");
		this._container.appendChild(el1);

		// Create scale control
		const el2 = window.document.createElement("select");
		for (const unit of ["5000", "10000", "25000", "50000"]) {
			const option = window.document.createElement("option");
			option.value = unit;
			option.text = unit;
			el2.appendChild(option);
		}
		el2.onchange = () => {
			this.goToScale(this._map, Number.parseInt(el2.value));
		};
		this._container.appendChild(el2);

		this._dummyContainer = DOM.create("div", "", map.getContainer());
		this._dummyContainer.style.visibility = "hidden";
		this._dummyContainer.style.width = "1cm";

		this._map.on("move", this._onMove);
		this._onMove();

		return this._container;
	}

	/** {@inheritDoc IControl.onRemove} */
	onRemove() {
		DOM.remove(this._container);
		this._map.off("move", this._onMove);
		this._map = undefined;
	}

	/**
	 * Set the scale's unit of the distance
	 *
	 * @param unit - Unit of the distance (`'imperial'`, `'metric'` or `'nautical'`).
	 */
	setUnit = (unit: Unit) => {
		this.options.unit = unit;
		this.updateScale(this._map, this._container, this.options);
	};

	getScale(map: LMap): number {
		const y = map._container.clientHeight / 2;
		const x = map._container.clientWidth / 2;
		const optWidth = this._dummyContainer.clientWidth;

		const left = map.unproject([x - optWidth / 2, y]);
		const right = map.unproject([x + optWidth / 2, y]);

		const maxMeters = left.distanceTo(right);

		return maxMeters;
	}

	updateScale(map: LMap, container: HTMLElement, options: ScaleControlOptions) {
		const scale = this.getScale(map);

		const scaleText = container.querySelector("p");

		if (scaleText) {
			scaleText.innerHTML = `1cm je ${Number.parseInt(scale.toString())} na zemljevidu`;
		}
	}

	goToScale(map: LMap, newScal: number) {
		let scale = this.getScale(map);
		const newScale = newScal / 100;

		if (scale < newScale) {
			while (
				Number.parseInt(scale.toString()) < Number.parseInt(newScale.toString())
			) {
				scale = this.getScale(map);
				map.setZoom(map.getZoom() - 0.001);
			}
		} else if (scale > newScale) {
			while (
				Number.parseInt(scale.toString()) > Number.parseInt(newScale.toString())
			) {
				scale = this.getScale(map);
				map.setZoom(map.getZoom() + 0.001);
			}
		}

		console.log(map.getZoom());
	}
}
