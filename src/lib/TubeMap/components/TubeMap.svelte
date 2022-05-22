<script>
  import { onMount } from 'svelte';
  import tubemapSvgPath from './map.svg';

  export let zoomMin;
  export let zoomMax;
  export let boundLeft;
  export let boundRight;
  export let boundTop;
  export let boundBottom;
  export let data = [];
  export let onNodeClick;

  let wrapper;
  let tubemapSvg = '';
  let tubemap;
  let width;
  let height;

  const loadSvg = async () => {
    const res = await fetch(tubemapSvgPath);
    wrapper.innerHTML = await res.text();
  };

  const initSVG = async () => {
    const { SVG } = await import('@svgdotjs/svg.js');
    await import('@svgdotjs/svg.panzoom.js');

    tubemap = SVG(wrapper.querySelector('svg'));
    tubemap.panZoom({
      zoomMin: zoomMin,
      zoomMax: zoomMax,
      margins: { top: boundTop, bottom: boundBottom, left: boundLeft, right: boundRight }
    });
  };

  const resizeSVG = () => {
    tubemap?.size(width, height);
  };

  const renderLabels = (items) => {
    if (!tubemap) return;
    const labels = tubemap.find('#labels');

    items.forEach((item) => {
      const id = `#label_${item.code}`;
      const label = labels.find(id);
      if (!label) return;

      const parts = item.displayName?.split('\\n') ?? ['UNKNOWN'];
      const og = label.first('tspan');
      const x = og.attr('x')?.[0]?.[0];
      const y = og.attr('y')?.[0]?.[0];
      const lineHeight = 4;
      label.text((add) => {
        parts.forEach((part, idx) => {
          add.tspan(part).attr({ x, y: y + lineHeight * idx });
        });
      });
    });
  };

  const addNodeHandlers = () => {
    tubemap.on('click', (e) => {
      const node = e
        .composedPath()
        .find((node) => (node.tagName === 'text' || node.tagName === 'circle') && node.id);
      if (!node) return;
      const value = node.id.replace('label_', '');
      onNodeClick?.({ value });
    });
  };

  onMount(async () => {
    await loadSvg();
    await initSVG();

    const box = wrapper.getBoundingClientRect();
    width = box.width;
    height = box.height - 10;

    resizeSVG();
    addNodeHandlers();

    // (new ResizeObserver((entries) => {
    //   const box = wrapper.getBoundingClientRect();
    //   width = box.width;
    //   height = box.height - 10;
    //   resizeSVG();
    // })).observe(wrapper);
  });

  $: renderLabels(data);
</script>

<div bind:this={wrapper}>
  {@html tubemapSvg}
</div>

<style>
  div {
    height: 100%;
    font-family: var(--font-1);
  }
</style>
