import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import api from '../../shared/api/axiosClient';
import { ENDPOINTS } from '../../shared/api/endpoints';

export function useCustomerMeQuery() {
  const token = useSelector((state) => state.auth.token);

  return useQuery({
    queryKey: ['customerMe'],
    queryFn: async () => {
      const response = await api.get(ENDPOINTS.customerMe);
      return response.data;
    },
    enabled: !!token, // بس تشتغل لو فيه توكن (يعني اليوزر مسجل دخول)
  });
}