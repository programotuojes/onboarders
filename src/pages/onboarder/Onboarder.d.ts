import type { Team } from "../team/Team";

export interface Onboarder {
  id: number;
  name: string;
  rotation: number;
  preferences: Team[];
  assignedTeam?: Team;
}
