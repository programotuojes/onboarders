import type { Team } from "../teams/Team";

export interface Onboarder {
  id: number;
  name: string;
  rotation: number;
  preferences: Team[];
  assignedTeam?: Team;
}