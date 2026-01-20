import type { League } from '@/interfaces/league.interface';
import axios from 'axios';

export const getLeagues = async (): Promise<League[]> => {
  const response = await axios.get<League[]>(`http://localhost:8080/leagues/all`);

  return response.data;
};;
