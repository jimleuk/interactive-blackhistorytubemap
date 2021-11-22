import { SVG } from 'https://cdn.skypack.dev/@svgdotjs/svg.js';
import 'https://cdn.skypack.dev/@svgdotjs/svg.panzoom.js';
import { labelsPeople, labelsStation } from '../../datasets/index.js'

export const ACTIONS = {
  TOGGLE_LABELS: 'TOGGLE_LABELS',
}

const URL_MAP_SVG = `${window.location.origin}/features/tubeMap/assets/map.svg`;

export class TubeMap {
  /** the SVGJS instance */
  mapSVG = null;
  /** holds datasets used to render labels on the map */
  labels = [];
  /** represents an index position in the "labels" array. Used to determine currently selected "labels". */
  labelsCursor = 0;

  constructor(props = {}) {
    this.labels = props.labels || [labelsPeople, labelsStation];
    this.el = props.el || document.createElement('div');
  }

  async init() {
    this.mapSVG = SVG(await fetch(URL_MAP_SVG).then(res => res.text()));
    this.resize();
    this.mapSVG.addTo(this.el).panZoom({
      zoomMin: 1,
      zoomMax: 10,
      margins: { top: 100, bottom: 100, left: 100, right: 100 }
    });
  }

  setLabelsCursor(idx) {
    this.labelsCursor = idx;
  }

  getCurrentLabels() {
    return this.labels[this.labelsCursor];
  }

  resize() {
    const box = this.el.getBoundingClientRect();
    this.mapSVG.size(box.width, box.height-10);
  }

  renderLabels() {
    const labelElements = this.mapSVG.find('#labels');
    this.getCurrentLabels().forEach(item => {
      const id = `#label_${item.id}`;
      const [label] = labelElements.find(id);
      if (!label) {
        console.error(`renderLabels: couldn\'t find ${id}`);
        return;
      }
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

  renderLinks() {
    const labels = this.mapSVG.find('#labels text')
    const hotspots = this.mapSVG.find('#hotspots circle')
    const generateLink = (id) => `${window.location.origin}#stations/${id.replace(/_\d+$/, '')}`;

    labels.forEach(el => {
      const id = el.attr('id').replace('label_', '');
      el.linkTo(generateLink(id));
    });
    hotspots.forEach(el => {
      const id = el.attr('id');
      el.linkTo(generateLink(id));
    });
  }

  render() {
    this.renderLabels();
    this.renderLinks();
  }
}