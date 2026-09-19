import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../shared/api/axiosClient';
import { ENDPOINTS } from '../../shared/api/endpoints';

export function useSubmitReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, rating, comment }) => {
      const response = await api.post(ENDPOINTS.submitReview(orderId), {
        rating,
        comment,
        orderId,
      });
      return { orderId, ...response.data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myOrders'] });
    },
  });
}