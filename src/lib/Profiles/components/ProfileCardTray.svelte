<script>
  import ProfileCard from './ProfileCard.svelte';
  export let data = [];
</script>

{#if data.length}
  <div class="root">
    {#each [...data].reverse() as entry, index}
      {#key entry.id}
        <div class="tray-item">
          <div class="tray-item-content">
            <ProfileCard data={entry} />
          </div>
        </div>
      {/key}
    {/each}
  </div>
{/if}

<style>
  .tray-item {
    scroll-snap-align: start;
    border-bottom: 1px solid var(--color-gray-1);
  }
</style>
