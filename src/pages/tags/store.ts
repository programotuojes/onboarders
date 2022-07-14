import { writable } from "svelte/store";
import type { Tag } from "./Tag";


export const tags = writable<Tag[]>([]);
