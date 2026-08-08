import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import api from '../../shared/api/axiosClient';
import { ENDPOINTS } from '../../shared/api/endpoints';
import { setOrderReview } from './ordersSlice';

export function useSubmitReviewMutation() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async ({ orderId, rating, comment }) => {
      const response = await api.post(ENDPOINTS.submitReview(orderId), { rating, comment });
      return { orderId, ...response.data };
    },
    onSuccess: (data) => {
      dispatch(setOrderReview({ orderId: data.orderId, rating: data.rating, comment: data.comment }));
    },
  });
}