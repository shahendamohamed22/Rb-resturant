import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import api from '../../shared/api/axiosClient';
import { ENDPOINTS } from '../../shared/api/endpoints';
import { setCustomerReceived } from './ordersSlice';

export function useCustomerReceivedMutation() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (orderId) => {
      const response = await api.post(ENDPOINTS.customerReceived(orderId));
      return { orderId, ...response.data };
    },
    onSuccess: (data) => {
      // only update Redux AFTER the server confirms it worked
      dispatch(setCustomerReceived(data.orderId));
    },
  });
}