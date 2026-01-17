export interface Match {
  matchId: string; // UUID
  seasonId: string; // UUID
  matchDay: number;
  localTeam: string;
  awayTeam: string;
  matchDate: string; // o string si viene del backend en ISO
  status: string;
  localGol: number;
  awayGol: number;
}
