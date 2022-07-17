<script lang="ts">
  import { addTeams, nameOf } from "../../common";
  import Input from "../../components/input/Input.svelte";
  import MultiSelect from "../../components/multiselect/MultiSelect.svelte";
  import type { Column } from "../../components/table/Table.d.ts";
  import Table from "../../components/table/Table.svelte";
  import { tags } from "../tags/store.js";
  import type { Tag } from "../tags/Tag.d.ts";
  import { teams } from "./store.ts";
  import type { Team } from "./Team.d.ts";


  const defaultTeam = (): Team => ({
    id: teamId++,
    name: "",
    slots: 1,
    tags: [],
  });

  let teamId = 0;
  let newTeam: Team = defaultTeam();

  let nameNode: HTMLInputElement;

  const tagDisplayProp = nameOf<Tag>("name");
  const columns: Column[] = [
    { key: nameOf<Team>("id"), title: "ID" },
    { key: nameOf<Team>("name") },
    { key: nameOf<Team>("slots"), width: 0.1 },
    { key: nameOf<Team>("tags") },
  ];

  function addTeam() {
    $teams = [...$teams, newTeam];
    newTeam = defaultTeam();

    // TODO don't focus if an onscreen keyboard can be shown (e.g. mobile)
    nameNode.focus();
  }

  function mock() {
    $teams = addTeams();
  }
</script>

<h1 on:click={mock} style="text-align: center">Teams</h1>

<Table {columns} rows={$teams} style="width: 80vw" />

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
