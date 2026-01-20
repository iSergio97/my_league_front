import type { Season } from '@/interfaces/season.interface';
import axios from 'axios';

export const getSeasons = async (leagueId: string): Promise<Season[]> => {
  const response = await axios.get<Season[]>(`http://localhost:8080/seasons/${leagueId}`);
  return response.data;
};
