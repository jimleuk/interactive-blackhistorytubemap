<script>
  import Toolbar from './components/Toolbar.svelte';
  import Panel from './components/Panel.svelte';
  import Table from './components/Table.svelte';
  import {
    tabbedPanelsStore as store,
    registerPanels,
    closeAllPanels,
    togglePanel,
    charities
  } from './store/index.ts';

  registerPanels({
    about: 0,
    charities: 0
  });

  const onClickTab = (name) => () => {
    togglePanel(name);
  };

  const onClosePanel = () => {
    closeAllPanels();
  };

  export let onToggleShowStationNames;
  export let onProfileSearch;
</script>

<div class="toolbar">
  <Toolbar
    tabsState={$store}
    onClickAbout={onClickTab('about')}
    onClickCharities={onClickTab('charities')}
    {onToggleShowStationNames}
    {onProfileSearch}
  />
</div>

<div class="panels">
  {#if $store.about}
    <Panel
      title="Interactive Black History Tube Map"
      subTitle="2021 &middot; SvelteJS hosted on Github Pages"
      onClose={onClosePanel}
    >
      <div style:max-width="640px">
        <p>
          The <a
            href="https://blackculturalarchives.org/shop/black-history-tube-map"
            target="_blank"
            rel="noopener noreferrer"
            title="Link to Official Black History Tube Map">Black History Tube Map</a
          >
          was released by Transport of London in October 2021 to celebrate the 40th anniversary of the
          Black Cultural Archives. The map was researched and designed by historian
          <a href="https://twitter.com/LondonLabrish">Kelly Foster</a>.
        </p>
        <p>
          The <strong>Interactive Black History Tube Map</strong> is a personal research project to learn
          more about the 270 names listed on the original map. The project was started in October 2021
          and release late November 2021. This project is not affliated, not in collaboration nor representative
          of TFL, Black Cultural Archives or the original team who produced the map. This project also
          does not guarantee accurate representation, past or future, of the source material. Any issues
          should be directed to the project's github repository. All rights are reserved to their respective
          copyright holders.
        </p>
        <p>
          For issues and feedback, please submit a ticket <a
            href="https://github.com/jimleuk/interactive-blackhistorytubemap/issues"
            >on the github project page</a
          >
        </p>
      </div>
    </Panel>
  {/if}
  {#if $store.charities}
    <Panel
      title="Charities"
      subTitle="A list of charities found on the map and some extra ones too"
      onClose={onClosePanel}
    >
      <Table data={charities} />
      <div class="mt-3">
        <p>
          Your charity missing? Please submit a ticket <a
            href="https://github.com/jimleuk/interactive-blackhistorytubemap/issues"
            >on the github project page</a
          >
        </p>
      </div>
    </Panel>
  {/if}
</div>

<style>
  .toolbar {
    width: 480px;
  }

  .panels {
    width: auto;
    margin-top: var(--spacing-2);
    margin-bottom: var(--spacing-2);
  }
</style>
