<script>
  export let title;
  export let subTitle;
  export let onClose;
</script>

<div class="root">
  {#if title}
    <div class="header">
      <h2 class="header-title">{title}</h2>
      {#if subTitle}
        <div class="header-meta">{subTitle}</div>
      {/if}
    </div>
  {/if}
  <div class="body">
    <slot />
  </div>
  <div class="footer">
    <button class="footer-close" on:click={onClose}>Done</button>
  </div>
</div>

<style>
  .root {
    background-color: var(--color-white);
    border: 1px solid var(--color-gray-2);
    border-radius: var(--spacing-1);
    font-family: var(--font-2);
  }
  .header {
    padding-top: var(--spacing-2);
    padding-bottom: var(--spacing-2);
    padding-left: var(--spacing-3);
    padding-right: var(--spacing-3);
    border-bottom: 1px solid var(--color-gray-1);
  }
  .header-title {
    margin-top: 0;
    margin-bottom: var(--spacing-1);
    font-size: var(--size-3);
  }
  .header-meta {
    font-size: var(--size-1);
    font-style: italic;
  }
  .body {
    font-size: var(--size-1);
    line-height: 1.8;
    padding-top: var(--spacing-2);
    padding-bottom: var(--spacing-2);
    padding-left: var(--spacing-3);
    padding-right: var(--spacing-3);
  }
  .body :global(p) {
    margin-top: 0;
    margin-bottom: var(--spacing-2);
  }
  .footer {
    padding-top: var(--spacing-1);
    padding-bottom: var(--spacing-2);
    padding-left: var(--spacing-3);
    padding-right: var(--spacing-3);
  }
  .footer button {
    background-color: var(--color-gray-1);
  }
</style>
