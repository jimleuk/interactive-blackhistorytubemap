<script>
  export let data = {};
</script>

<div class="root">
  <div class="card-left">
    <div class="header">
      <a
        class="data-img"
        href={data.imageUrl ? data.imageUrl : undefined}
        style={data.imageUrl ? `background-image:url(${data.imageUrl})` : undefined}
        title={data.imageAttribution ? `Source: ${data.imageAttribution}` : undefined}
      >
        {#if data.imageAttribution}
          <div class="data-img-attribution">
            {data.imageAttribution}
          </div>
        {/if}
      </a>
    </div>
  </div>
  <div class="card-right">
    <div class="body">
      <div class="content">
        <div class="columns">
          <div class="column" style:flex-grow="1">
            <h2>{data.name}</h2>
            <p>
              {#if data.dateStart}{data.dateStart}{/if}{#if data.dateEnd}- {data.dateEnd}{/if}
            </p>
          </div>
          {#if data.stationName}
            <div class="column">
              <div class="station-badge line-{data.stationLineCode}">
                {data.stationName}
              </div>
            </div>
          {/if}
        </div>
        <p>{data.description}</p>
        <div class="columns">
          {#if data.infoUrl}
            <div class="column">
              <a class="content-info-url" href={data.infoUrl}>More Info</a>
            </div>
          {/if}
          {#if data.infoUrl && data.imageAttribution}
            <div class="columns-separator">&middot;</div>
          {/if}
          {#if data.imageAttribution}
            <div class="column">
              <p class="content-img-attribution">
                Image credit: {data.imageAttribution}
              </p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .root {
    display: flex;
    max-width: 100%;
    font-family: var(--font-2);
    background-color: var(--color-white);
    padding-top: var(--spacing-2);
    padding-bottom: var(--spacing-2);
  }
  .card-right {
    flex-grow: 1;
    padding-right: var(--spacing-2);
  }

  .header {
    width: 120px;
    height: 120px;
    position: relative;
    padding: var(--spacing-1);
  }

  .body {
    padding: var(--spacing-1);
  }

  .footer {
    padding: var(--spacing-1);
  }

  .data-img {
    display: block;
    height: 100%;
    width: auto;
    background-position: top;
    background-size: contain;
    box-shadow: 0 0px 2px rgb(0 0 0 / 50%);
  }

  .data-img-attribution {
    position: absolute;
    bottom: var(--spacing-2);
    left: var(--spacing-2);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 50%;
    padding-left: 5px;
    padding-right: 5px;
    background-color: var(--color-black);
    color: var(--color-white);
    font-size: var(--size-1);
    opacity: 0.5;
    pointer-events: none;
    border-radius: var(--spacing-1);
  }

  .content h2 {
    margin: 0;
    font-size: var(--size-2);
  }
  .content p {
    font-size: var(--size-1);
    margin-top: 0;
    margin-bottom: var(--spacing-1);
  }

  .content p.content-img-attribution {
    font-size: calc(var(--size-1) * 0.9);
    color: var(--color-gray-3);
    margin-bottom: 0;
    word-break: break-word;
  }

  .content-info-url {
    font-size: calc(var(--size-1) * 0.9);
  }

  .footer-tags {
    padding: 0;
    margin: 0;
    list-style: none;
    font-family: var(--font-1);
  }

  .tag {
    display: inline-block;
    padding: calc(var(--spacing-1) / 2) var(--spacing-1);
    background-color: yellowgreen;
    border-radius: var(--spacing-1);
    font-size: var(--size-1);
    text-transform: capitalize;
    color: var(--color-white);
    border: 0;
    cursor: pointer;
  }

  .columns {
    display: flex;
  }
  .columns-separator {
    padding-left: var(--spacing-1);
    padding-right: var(--spacing-1);
  }

  .station-badge {
    font-size: calc(var(--size-1) * 0.9);
    color: var(--color-white);
    padding-left: var(--spacing-1);
    padding-right: var(--spacing-1);
    padding-top: calc(var(--spacing-1) / 2);
    padding-bottom: calc(var(--spacing-1) / 2);
    border-radius: calc(var(--spacing-1) / 2);
  }
</style>
