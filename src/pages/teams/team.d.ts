import type { Tag } from "../tags/tag";

export interface Team {
  id: number;
  name: string;
  slots: number;
  remainingSlots: number;
  tags: Tag[];
}
