<script lang="ts">
  import { addOnboarders, nameOf } from "../../common.ts";
  import Input from "../../components/input/Input.svelte";
  import MultiSelect from "../../components/multiselect/MultiSelect.svelte";
  import type { Column } from "../../components/table/table.d.ts";
  import Table from "../../components/table/Table.svelte";
  import { tags } from "../tags/store.ts";
  import type { Tag } from "../tags/tag.d.ts";
  import { teams } from "../teams/store.ts";
  import type { Team } from "../teams/team.d.ts";
  import type { Onboarder } from "./onboarder.d.ts";
  import { onboarders } from "./store.ts";


  const defaultOnboarder = (): Onboarder => ({
    id: onboarderId++,
    name: "",
    previousTeams: [],
    preferredTeams: [],
    preferredTags: [],
    rotation: 1,
    priority: 0,
  });

  let onboarderId = 0;
  let newOnboarder: Onboarder = defaultOnboarder();

  let nameNode: HTMLInputElement;

  const teamDisplayProp: string = nameOf<Team>("name");
  const tagDisplayProp: string = nameOf<Tag>("name");
  const columns: Column[] = [
    {
      key: nameOf<Onboarder>("id"),
      title: "ID",
    },
    { key: nameOf<Onboarder>("name") },
    { key: nameOf<Onboarder>("rotation") },
    { key: nameOf<Onboarder>("priority") },
    {
      key: nameOf<Onboarder>("preferredTeams"),
      title: "Teams",
    },
    {
      key: nameOf<Onboarder>("preferredTags"),
      title: "Tags",
    },
  ];

  function addOnboarder() {
    $onboarders = [...$onboarders, newOnboarder];
    newOnboarder = defaultOnboarder();

    // TODO don't focus if an onscreen keyboard can be shown (e.g. mobile)
    nameNode.focus();
  }

  function mock() {
    // $onboarders = addOnboarders();
  }
</script>

<h1 on:click={mock} style="text-align: center">Graduates</h1>

<Table {columns} rows={$onboarders} style="width: 80vw" />

<form on:submit|preventDefault={addOnboarder}>
  <Input
    bind:inputNode={nameNode}
    bind:value={newOnboarder.name}
    label="Name"
  />

  <Input
    bind:value={newOnboarder.rotation}
    label="Rotation"
    max="4"
    min="1"
    type="number"
  />

  <Input
    bind:value={newOnboarder.priority}
    label="Priority"
    max="9"
    min="0"
    type="number"
  />

  <MultiSelect
    bind:selected={newOnboarder.previousTeams}
    data={$teams}
    displayProp={teamDisplayProp}
    label="Previous teams"
    maxSelected="3"
    maxSelectedMessage="3 teams already selected"
  />

  <MultiSelect
    bind:selected={newOnboarder.preferredTeams}
    data={$teams}
    displayProp={teamDisplayProp}
    label="Preferred teams"
    showPosition
  />

  <MultiSelect
    bind:selected={newOnboarder.preferredTags}
    data={$tags}
    displayProp={tagDisplayProp}
    label="Preferred tags"
  />

  <button>Add</button>
</form>

<style lang="postcss">

  form {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
  }

  button {
    height: 2rem;
    margin-top: 1rem;
  }

</style>
