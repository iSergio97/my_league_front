import type { Standing } from '@/interfaces/standing.interface';
import axios from 'axios';

export const getStandings = async (): Promise<Standing[]> => {
  const response = await axios.get<Standing[]>(
    'http://localhost:8080/standings/getStandings/ec743505-a48b-4e04-a0ee-60edcd286028?journey=1',
  );
  return response.data;
};
