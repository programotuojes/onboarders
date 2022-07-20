import { writable } from "svelte/store";
import type { Tag } from "./tag";


export const tags = writable<Tag[]>([]);
