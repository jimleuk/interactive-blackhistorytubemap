<script>
  import { mapOverlayStore } from './store/mapOverlay';
  import TubeMap from './components/TubeMap.svelte';

  export let onNodeClick = () => undefined;

  let overlayError = null;
  let overlayData = [];

  mapOverlayStore.subscribe((store) => {
    overlayError = store.error;
    overlayData = store.data;
  });
</script>

<TubeMap
  zoomMin="1"
  zoomMax="10"
  boundLeft="100"
  boundRight="100"
  boundTop="100"
  boundBottom="100"
  onNodeClick={({ value }) => {
    const node = overlayData.find((datum) => datum.code === value);
    onNodeClick(node);
  }}
  data={overlayData}
/>
