import type { Onboarder } from "./pages/onboarder/Onboarder";
import type { Team } from "./pages/team/Team";


export function assignOnboarders(teams: Team[], onb: Onboarder[]): Onboarder[] {
  const onboarders = [...onb].sort((a, b) => b.rotation - a.rotation);

  for (let onboarder of onboarders) {
    if (onboarder.preferences.length === 0) {
      continue;
    }

    const preference = onboarder.preferences.filter(x => x.slots > 0)[0];
    if (!preference) {
      continue;
    }

    onboarder.assignedTeam = preference;
    preference.slots -= 1;
  }

  const remainingTeams = teams.filter(x => x.slots > 0);
  const remainingOnboarders = onboarders.filter(x => x.assignedTeam === undefined);

  for (let onboarder of remainingOnboarders) {
    if (remainingTeams.length === 0) {
      return;
    }

    const assigned = remainingTeams[0];

    onboarder.assignedTeam = assigned;
    assigned.slots -= 1;

    if (assigned.slots <= 0) {
      remainingTeams.shift();
    }
  }

  return onboarders;
}


export const nameOf = <T>(name: Extract<keyof T, string>): string => name;


const assetWise = {
  id: -3,
  name: "AssetWise",
  slots: 2,
};

const cost = {
  id: -2,
  name: "Synchro Cost",
  slots: 1,
};

const iModel = {
  id: -1,
  name: "iModel transformations",
  slots: 3,
};

export function addTeams(): Team[] {
  return [assetWise, cost, iModel];
}

export function addOnboarders(): Onboarder[] {
  return [
    {
      id: -6,
      name: "Petras Tamošiūnas",
      rotation: 1,
      preferences: [assetWise, iModel],
    },
    {
      id: -5,
      name: "Tomas Virbalas",
      rotation: 3,
      preferences: [cost],
    },
    {
      id: -4,
      name: "Gustas Klevinskas",
      rotation: 4,
      preferences: [cost]
    },
    {
      id: -3,
      name: "Lukas Lukošius",
      rotation: 3,
      preferences: [assetWise]
    },
    {
      id: -2,
      name: "Inga Lingutė",
      rotation: 2,
      preferences: [assetWise, cost]
    },
    {
      id: -1,
      name: "Rokas Burokas",
      rotation: 3,
      preferences: []
    }
  ];
}
