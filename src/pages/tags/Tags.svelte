<script lang="ts">
  import { nameOf } from "../../common";
  import Input from "../../components/input/Input.svelte";
  import type { Column } from "../../components/table/table.d.ts";
  import Table from "../../components/table/Table.svelte";
  import { tags } from "./store.ts";
  import type { Tag } from "./tag.d.ts";


  const columns: Column[] = [
    { key: nameOf<Tag>("id"), title: "ID" },
    { key: nameOf<Tag>("name") }
  ];

  const defaultTag = (): Tag => ({
    id: tagId++,
    name: ""
  });

  let tagId: number = 0;
  let newTag: Tag = defaultTag();

  function add() {
    $tags = [...$tags, newTag];
    newTag = defaultTag();
  }
</script>

<h1>Tags</h1>

<Table {columns} rows={$tags} />

<form on:submit|preventDefault={add}>
  <Input bind:value={newTag.name} label="Name" />
  <button>Add</button>
</form>

<style lang="postcss">

  h1 {
    text-align: center;
  }

  form {
    align-items: center;
    display: flex;
    gap: 1rem;
    justify-content: center;

    @media (max-width: 600px) {
      align-items: center;
      flex-direction: column;
    }
  }

  button {
    height: 2rem;
    margin-top: 1rem;
  }
</style>
