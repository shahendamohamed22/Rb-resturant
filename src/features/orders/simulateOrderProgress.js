import { store } from '../../app/store';
import { updateOrderStage } from './ordersSlice';

// Simulates the driver's real actions (§7.5: receive → ship → deliver)
// happening automatically over time, until the real backend/SignalR is ready.
export function simulateOrderProgress(orderId) {
  const stageDelays = [
    { stage: 1, delay: 5000 },  // Preparing, after 5s
    { stage: 2, delay: 12000 }, // On the way, after 12s
    { stage: 3, delay: 20000 }, // Delivered, after 20s
  ];

  stageDelays.forEach(({ stage, delay }) => {
    setTimeout(() => {
      store.dispatch(updateOrderStage({ orderId, stage }));
    }, delay);
  });
}