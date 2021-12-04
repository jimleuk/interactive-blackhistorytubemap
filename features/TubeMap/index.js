import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';
import { SVG } from 'https://cdn.skypack.dev/@svgdotjs/svg.js';
import 'https://cdn.skypack.dev/@svgdotjs/svg.panzoom.js';
import { csvParse } from "https://cdn.skypack.dev/d3-dsv@3";

export const ACTIONS = {
  TOGGLE_LABELS: 'TOGGLE_LABELS',
}
class TubeMap extends LitElement {
  DATASET_CACHE = {};

  static properties = {
    asset: { attribute: true },
    data: { attribute: true },
    width: { attribute: true, type: 'number' },
    height: { attribute: true, type: 'number' },
    zoomMin: { attribute: true, type: 'number' },
    zoomMax: { attribute: true, type: 'number' },
    boundLeft: { attribute: true, type: 'number' },
    boundRight: { attribute: true, type: 'number' },
    boundTop: { attribute: true, type: 'number' },
    boundBottom: { attribute: true, type: 'number' },
    svg: { attribute: false },
  }

  static styles = css`
    :host {
      display: block;
    }
  `

  constructor() {
    super();
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.renderAsset();
    this.renderData();
    this.bindEvents();
  }

  render() {
    if (!this.svg) return html`<svg />`;
    return html`${this.svg.node}`;
  }

  async update(props) {
    super.update(props);
    if (props.has('width') || props.has('height')) this.resize();
    if (props.has('data')) this.renderData();
  }

  resize() {
    if (!this.svg) return;
    this.svg.size(this.width, this.height)
  }

  async renderAsset() {
    const res = await fetch(this.asset);
    this.svg = SVG(await res.text());
    this.svg.size(this.width, this.height);
    this.svg.panZoom({
      zoomMin: this.zoomMin,
      zoomMax: this.zoomMax,
      margins: { top: this.boundTop, bottom: this.boundBottom, left: this.boundLeft, right: this.boundRight }
    });
  }

  async renderData() {
    if (!this.svg || !this.data) return;
    if (!this.DATASET_CACHE[this.data]) {
      const response = await fetch(this.data);
      const data = csvParse(await response.text());
      this.DATASET_CACHE[this.data] = data;
    }
    this.renderLabels(this.DATASET_CACHE[this.data]);
  }

  renderLabels(data) {
    const labelElements = this.svg.find('#labels');
    data.forEach(item => {
      const id = `#label_${item.id}`;
      const [label] = labelElements.find(id);
      if (!label) return;

      const parts = item.display_name.split('\\n');
      const og = label.first('tspan');
      const [x] = og.attr('x');
      const [y] = og.attr('y');
      const lineHeight = 4;
      label.text(add => {
        parts.forEach((part, idx) => {
          add.tspan(part).attr({ x, y: y + (lineHeight * idx) });
        })
      });
    });
  }

  bindEvents() {
    this.svg.on('click', (e) => {
      const node = e.composedPath().find(node => (node.tagName === 'text' || node.tagName === 'circle') && node.id);
      if (!node) return;
      const value = node.id.replace('label_', '');
      this.dispatchEvent(new CustomEvent('select', {
        detail: { value },
        bubbles: true,
        composed: true,
      }));
    });
  }
}

customElements.define('tube-map', TubeMap)