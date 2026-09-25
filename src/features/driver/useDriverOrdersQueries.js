import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../shared/api/axiosClient';
import { ENDPOINTS } from '../../shared/api/endpoints';

export function useDriverNewOrdersQuery() {
  return useQuery({
    queryKey: ['driverOrders', 'new'],
    queryFn: async () => (await api.get(ENDPOINTS.driverNewOrders)).data,
    refetchInterval: 15000,
  });
}

export function useDriverMyOrdersQuery(status) {
  return useQuery({
    queryKey: ['driverOrders', 'mine', status],
    queryFn: async () => (await api.get(ENDPOINTS.driverMyOrders(status))).data,
    refetchInterval: 15000,
  });
}

function useDriverOrderAction(endpointFn) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, status }) => api.post(endpointFn(orderId), { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['driverOrders'] }); // invalidates 'new' and every 'mine' status variant
    },
  });
}

export function useReceiveOrderMutation() {
  return useDriverOrderAction(ENDPOINTS.driverReceive);
}
export function useShipOrderMutation() {
  return useDriverOrderAction(ENDPOINTS.driverShip);
}
export function useDeliverOrderMutation() {
  return useDriverOrderAction(ENDPOINTS.driverDeliver);
}