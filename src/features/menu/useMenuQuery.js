import { useQuery } from '@tanstack/react-query';
import api from '../../shared/api/axiosClient';
import { ENDPOINTS } from '../../shared/api/endpoints';


export function useMenuQuery(branchId) {
  return useQuery({
    queryKey: ['menu', branchId],
    queryFn: async () => {
      const response = await api.get(ENDPOINTS.menu(branchId));
      return response.data;
    },
  });
}