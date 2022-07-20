import type { Onboarder } from "./pages/onboarders/onboarder";
import type { Team } from "./pages/teams/team";


export function assignTeams(onboarders: Onboarder[], teams: Team[]): Onboarder[] {
  const teamSlots = teams.map(x => x.slots).reduce((acc, slots) => acc + slots, 0);

  if (teamSlots !== onboarders.length) {
    console.log("Team slots", teamSlots);
    console.log("Onboarders", onboarders.length);
    throw new Error("The total number of slots and onboarders are different");
  }

  const sorted = [...onboarders].sort((a, b) => getWeight(b) - getWeight(a));

  for (const onboarder of sorted) {
    const availableTeams = onboarder.preferredTeams.filter(x => x.remainingSlots > 0);

    if (availableTeams.length > 0) {
      onboarder.assignedTeam = availableTeams[0];
      availableTeams[0].remainingSlots -= 1;
      continue;
    }

    assignByTags(onboarder, teams);
  }

  const remainingTeams = teams.filter(x => x.remainingSlots > 0);

  for (const onboarder of sorted.filter(x => x.assignedTeam === undefined)) {
    const team = remainingTeams[0];

    onboarder.assignedTeam = team;
    team.remainingSlots -= 1;

    if (team.remainingSlots === 0)
      remainingTeams.shift();
  }

  return onboarders;
}

function getWeight(onboarder: Onboarder): number {
  return onboarder.priority * 10 + onboarder.rotation;
}

function assignByTags(onboarder: Onboarder, teams: Team[]) {
  for (const preferredTag of onboarder.preferredTags) {
    const teamsFromTags = teams.filter(team => team.remainingSlots > 0 && team.tags.includes(preferredTag));

    if (teamsFromTags.length === 0)
      continue;

    onboarder.assignedTeam = teamsFromTags[0];
    teamsFromTags[0].remainingSlots -= 1;

    return;
  }
}
