import { useMutation } from '@tanstack/react-query';
import api from '../../shared/api/axiosClient';
import { ENDPOINTS } from '../../shared/api/endpoints';

export function useChargePaymentMutation() {
  return useMutation({
    mutationFn: async (orderId) => {
      const response = await api.post(
        ENDPOINTS.paymentCharge(orderId),
        null,
        { headers: { 'Idempotency-Key': crypto.randomUUID() } }
      );
      return response.data; // { paymentId, status, redirectUrl, clientSecret }
    },
  });
}