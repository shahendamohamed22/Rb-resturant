import { useQuery } from '@tanstack/react-query';
import api from '../../shared/api/axiosClient';
import { ENDPOINTS } from '../../shared/api/endpoints';

export function useBuilderOptionsQuery() {
  return useQuery({
    queryKey: ['builderOptions'],
    queryFn: async () => {
      const response = await api.get(ENDPOINTS.builderOptions);
      return response.data;
    },
  });
}