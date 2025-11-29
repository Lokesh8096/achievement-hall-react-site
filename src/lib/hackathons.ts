// Hackathon mapping: hackathon_count -> hackathon name
export const HACKATHONS = {
  1: 'Hackathon-1',
  2: 'Build-for-Telangana',
  3: 'NIAT X Base44',
} as const;

export const getHackathonName = (count: number): string => {
  return HACKATHONS[count as keyof typeof HACKATHONS] || `Hackathon-${count}`;
};

export const getHackathonOptions = () => {
  return Object.entries(HACKATHONS).map(([count, name]) => ({
    value: count,
    label: name,
  }));
};

