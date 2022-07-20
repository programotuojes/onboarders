<script lang="ts">
  import { fade } from "svelte/transition";
  import type { Column } from "./table.d.ts";


  export let rows: Object[] = [];
  export let columns: Column[] = [];
  export let style = "";

  function capitalize(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
  }

</script>

<table {style}>
  <tr>
    {#each columns as col}
      <th style="width: {col.width}rem">{col.title ?? capitalize(col.key)}</th>
    {/each}
  </tr>
  {#each rows as row (row.id)}
    <tr transition:fade>
      {#each columns as col (col.key + row.id)}
        <td style="width: {col.width}rem">

          {#if Array.isArray(row[col.key]) && row[col.key].length > 0}

            <ol style="padding: 0 0 0 1rem; margin: 0">
              {#each row[col.key] as team}
                <li>{team.name}</li>
              {/each}
            </ol>

          {:else if col.displayFunc !== undefined}

            {col.displayFunc(row[col.key])}

          {:else}

            {row[col.key]}

          {/if}
        </td>
      {/each}
    </tr>
  {/each}

  {#if rows.length === 0}
    <tr>
      <td colspan={columns.length} style="text-align: center"> No data present</td>
    </tr>
  {/if}
</table>

<style lang="postcss">

  /* When using table border, header background isn't fully filled in Chromium */
  /* Therefore, added borders to th and td instead */

  table {
    border-spacing: 0;
    margin: 2rem auto;
  }

  th, td {
    background-color: white;
    border-bottom: var(--border);
    padding: 0.5rem 1rem;
    text-align: start;

    &:first-child { border-left: var(--border); }
    &:last-child { border-right: var(--border); }
  }

  th {
    background-color: gainsboro;
    border-top: var(--border);

    &:first-child { border-top-left-radius: var(--border-radius); }
    &:last-child { border-top-right-radius: var(--border-radius); }
  }

  tr:last-child td {
    &:first-child { border-bottom-left-radius: var(--border-radius); }
    &:last-child { border-bottom-right-radius: var(--border-radius); }
  }

</style>
