<script lang="ts">
  import { addOnboarders, nameOf } from "../../common.ts";
  import Input from "../../components/input/Input.svelte";
  import MultiSelect from "../../components/multiselect/MultiSelect.svelte";
  import type { Column } from "../../components/table/Table.d.ts";
  import Table from "../../components/table/Table.svelte";
  import { teams } from "../teams/store.ts";
  import type { Team } from "../teams/Team.d.ts";
  import type { Onboarder } from "./Onboarder.d.ts";


  const defaultOnboarder = (): Onboarder => ({
    id: onboarderId++,
    name: "",
    preferences: [],
    rotation: 1
  });

  let onboarderId = 0;
  let newOnboarder: Onboarder = defaultOnboarder();
  let onboarders: Onboarder[] = [];

  let nameNode: HTMLInputElement;

  const teamDisplayProp: string = nameOf<Team>("name");
  const columns: Column[] = [
    {
      key: nameOf<Onboarder>("id"),
      title: "ID"
    },
    { key: nameOf<Onboarder>("name") },
    { key: nameOf<Onboarder>("rotation") },
    {
      key: nameOf<Onboarder>("preferences"),
      title: "Preferred teams"
    }
  ];

  function addOnboarder() {
    onboarders = [...onboarders, newOnboarder];
    newOnboarder = defaultOnboarder();

    // TODO don't focus if an onscreen keyboard can be shown (e.g. mobile)
    nameNode.focus();
  }

  function mock() {
    onboarders = addOnboarders();
  }
</script>

<h1 on:click={mock} style="text-align: center">Onboarders</h1>

<Table {columns} rows={onboarders} style="width: 80vw" />

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

  <MultiSelect
    bind:selected={newOnboarder.preferences}
    data={$teams}
    displayProp={teamDisplayProp}
    label="Preferred teams"
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
