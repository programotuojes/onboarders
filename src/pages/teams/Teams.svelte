<script lang="ts">
  import { nameOf } from "../../common";
  import Input from "../../components/input/Input.svelte";
  import MultiSelect from "../../components/multiselect/MultiSelect.svelte";
  import type { Column } from "../../components/table/table.d.ts";
  import Table from "../../components/table/Table.svelte";
  import { tags } from "../tags/store.js";
  import type { Tag } from "../tags/tag.d.ts";
  import { teams } from "./store.ts";
  import type { Team } from "./team.d.ts";


  const defaultTeam = (): Team => ({
    id: teamId++,
    name: "",
    slots: 1,
    remainingSlots: 1,
    tags: [],
  });

  let teamId = 0;
  let newTeam: Team = defaultTeam();

  let nameNode: HTMLInputElement;

  const tagDisplayProp = nameOf<Tag>("name");
  const columns: Column[] = [
    { key: nameOf<Team>("name") },
    { key: nameOf<Team>("slots") },
    { key: nameOf<Team>("tags") },
  ];

  function addTeam() {
    newTeam.remainingSlots = newTeam.slots;
    $teams = [...$teams, newTeam];
    newTeam = defaultTeam();

    // TODO don't focus if an onscreen keyboard can be shown (e.g. mobile)
    nameNode.focus();
  }
</script>

<h1 style="text-align: center">Teams</h1>

<Table {columns} rows={$teams} />

<form on:submit|preventDefault={addTeam}>
  <Input
    bind:inputNode={nameNode}
    bind:value={newTeam.name}
    label="Team name"
  />

  <Input
    bind:value={newTeam.slots}
    label="Slots"
    min="1"
    type="number"
  />

  <MultiSelect
    bind:selected={newTeam.tags}
    data={$tags}
    displayProp={tagDisplayProp}
    label="Tags"
  />

  <button>Add</button>
</form>

<style lang="postcss">
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
