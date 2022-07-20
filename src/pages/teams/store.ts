import { writable } from "svelte/store";
import type { Team } from "./team";


export const teams = writable<Team[]>([]);
