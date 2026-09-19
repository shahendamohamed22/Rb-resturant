import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../shared/api/axiosClient';
import { ENDPOINTS } from '../../shared/api/endpoints';

export function useMyOrdersQuery() {
  return useQuery({
    queryKey: ['myOrders'],
    queryFn: async () => {
      const response = await api.get(ENDPOINTS.myOrders());
      return response.data.items;
    },
  });
}

export function useOrderDetailQuery(orderId) {
  return useQuery({
    queryKey: ['orderDetail', orderId],
    queryFn: async () => {
      const response = await api.get(ENDPOINTS.orderById(orderId));
      return response.data;
    },
    enabled: !!orderId,
    refetchInterval: (query) => {
      return query.state.data?.stage === 3 ? false : 3000;
    },
  });
}

export function useCustomerReceivedMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId) => {
      const response = await api.post(ENDPOINTS.customerReceived(orderId));
      return { orderId, ...response.data };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orderDetail', data.orderId] });
      queryClient.invalidateQueries({ queryKey: ['myOrders'] });
    },
  });
}