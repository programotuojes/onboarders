import type { Tag } from "../tags/Tag";

export interface Team {
  id: number;
  name: string;
  slots: number;
  tags: Tag[];
}
