import { writable } from "svelte/store";
import type { Team } from "./Team";


export const teams = writable<Team[]>([]);
