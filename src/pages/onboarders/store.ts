import { writable } from "svelte/store";
import type { Onboarder } from "./onboarder";


export const onboarders = writable<Onboarder[]>([]);
