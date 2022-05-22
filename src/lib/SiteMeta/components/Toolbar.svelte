<script>
  export let tabsState = {};
  export let onClickAbout;
  export let onClickCharities;
  export let onToggleShowStationNames;
  export let onProfileSearch;

  import ProfileSearchInputContainer from '$lib/Profiles/ProfileSearchInputContainer.svelte';
</script>

<div class="root">
  <div class="columns">
    <div class="column">
      <button on:click={onClickAbout} class:active={tabsState.about}>About</button>
    </div>
    <div class="separator" />
    <div class="column column-grow">
      <div class="search-input">
        <ProfileSearchInputContainer {onProfileSearch} />
      </div>
    </div>
    <div class="separator" />
    <div class="column">
      <button on:click={onClickCharities} class:active={tabsState.charities}>Charities</button>
    </div>
  </div>
  <div class="columns-separator" />
  <div class="columns">
    <div class="column">
      <label class="toggle">
        <input type="checkbox" class="toggle-input" on:change={onToggleShowStationNames} />
        Show station names
      </label>
    </div>
  </div>
</div>

<style>
  .root {
    font-family: var(--font-2);
    background-color: var(--color-white);
    border: 1px solid var(--color-gray-2);
    padding-top: var(--spacing-1);
    padding-bottom: var(--spacing-1);
    padding-left: var(--spacing-1);
    padding-right: var(--spacing-1);
    border-radius: var(--spacing-1);
  }
  .columns {
    display: flex;
  }
  .columns-separator {
    border-top: 1px solid var(--color-gray-2);
    margin-top: var(--spacing-1);
    margin-bottom: var(--spacing-1);
  }
  .column {
    display: flex;
    align-items: center;
  }
  .column-grow {
    flex-grow: 1;
  }

  .separator {
    margin-left: var(--spacing-1);
    margin-right: var(--spacing-1);
    border-right: 1px solid var(--color-gray-2);
  }

  .search-input {
    width: 100%;
    padding-left: var(--spacing-1);
    padding-right: var(--spacing-1);
  }

  .toggle {
    font-size: var(--size-1);
  }
</style>
