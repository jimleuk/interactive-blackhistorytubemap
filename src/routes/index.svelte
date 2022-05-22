<script>
  import { onMount } from 'svelte';
  import App from '$lib/components/Layout/LayoutApp.svelte';
  import Content from '$lib/components/Layout/LayoutContent.svelte';
  import SiteMetaContainer from '$lib/SiteMeta/SiteMetaContainer.svelte';

  import { mapOverlayConfigStore, mapOverlayRegister } from '$lib/TubeMap/store/mapOverlay';
  import TubeMapContainer from '$lib/TubeMap/TubeMapContainer.svelte';

  import * as profileStore from '$lib/Profiles/store/index.ts';
  import ProfileCardTrayContainer from '$lib/Profiles/ProfileCardTrayContainer.svelte';

  const onTubeMapNodeClick = (data) => {
    profileStore.addTopic(data);
  };

  const onToggleShowStationNames = (e) => {
    $mapOverlayConfigStore.current = e.target.checked
      ? mapOverlayRegister.default
      : mapOverlayRegister.bca;
  };

  const onProfileSearch = (data) => {
    profileStore.addTopic({ idRef: data.id });
  };

  onMount(() => {
    $mapOverlayConfigStore.current = mapOverlayRegister.bca;
  });
</script>

<App>
  <Content>
    <TubeMapContainer onNodeClick={onTubeMapNodeClick} />
  </Content>
  <div class="side-panel">
    <div class="toolbar">
      <SiteMetaContainer {onToggleShowStationNames} {onProfileSearch} />
    </div>
    <div class="profile-cards">
      <ProfileCardTrayContainer />
    </div>
  </div>
</App>

<style>
  .side-panel {
    position: absolute;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding-top: var(--spacing-2);
    padding-bottom: var(--spacing-2);
    padding-left: var(--spacing-2);
    padding-right: var(--spacing-2);
    background-color: rgba(0, 0, 0, 0.05);
    border-right: 1px solid var(--color-gray-2);
  }

  .profile-cards {
    max-width: 480px;
    flex-grow: 1;
    overflow: scroll;
    scroll-snap-type: y mandatory;
    border: 1px solid var(--color-gray-2);
  }
</style>
