import type { Tag } from "../tags/Tag";
import type { Team } from "../teams/Team";


export interface Onboarder {
  id: number;
  name: string;
  rotation: number;
  previousTeams: Team[];
  preferredTeams: Team[];
  preferredTags: Tag[];
  assignedTeam?: Team;
}
