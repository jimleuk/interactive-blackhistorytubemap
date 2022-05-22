<script>
  export let data = [];
</script>

<table>
  <thead>
    <tr>
      <th style:min-width="200px">Organisation</th>
      <th style:min-width="150px">Station</th>
      <th>Website</th>
    </tr>
  </thead>
  <tbody>
    {#each data as entry}
      <tr>
        <td>{entry.org}</td>
        <td
          >{#if entry.station}{entry.station}{:else}&dash;{/if}</td
        >
        <td>
          <a href={entry.url} rel="nofollow">{entry.url}</a>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  th {
    text-align: left;
  }
</style>
