import type { Match } from '@/interfaces/match.interface';
import axios from 'axios';

export const getMatches = async (matchDay: number): Promise<Match[]> => {
  const response = await axios.get<Match[]>(
    `http://localhost:8080/matches/getMatches/ec743505-a48b-4e04-a0ee-60edcd286028?matchDay=${matchDay}`,
  );
  return response.data;
};
