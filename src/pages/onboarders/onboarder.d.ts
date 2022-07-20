import type { Tag } from "../tags/tag";
import type { Team } from "../teams/team";


export interface Onboarder {
  id: number;
  name: string;
  rotation: number;
  priority: number;
  previousTeams: Team[];
  preferredTeams: Team[];
  preferredTags: Tag[];
  assignedTeam?: Team;
}
