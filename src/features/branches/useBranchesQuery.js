import { useQuery } from '@tanstack/react-query';
import api from '../../shared/api/axiosClient';
import { ENDPOINTS } from '../../shared/api/endpoints';

export function useBranchesQuery() {
  return useQuery({
    queryKey: ['branches'],
    queryFn: async () => {
      const response = await api.get(ENDPOINTS.branches);
      return response.data;
    },
  });
}