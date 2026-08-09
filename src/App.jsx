import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from './shared/components/Header';
import Footer from './shared/components/Footer';
import BottomNav from './shared/components/BottomNav';
import CartDrawer from './features/cart/CartDrawer';
import AuthModal from './features/auth/AuthModal';
import HeroSection from './shared/components/HeroSection';
import MenuSection from './features/menu/MenuSection';
import BuilderSection from './features/builder/BuilderSection';
import BranchesSection from './features/branches/BranchesSection';
import CheckoutModal from './features/checkout/CheckoutModal';
import OrderConfirmationModal from './features/orders/OrderConfirmationModal';
import OrdersSection from './features/orders/OrdersSection';
import TrackingModal from './features/orders/TrackingModal';
import ReviewModal from './features/orders/ReviewModal';
import { simulateOrderProgress } from './features/orders/simulateOrderProgress';
import { addOrder } from './features/orders/ordersSlice';
import DriverApp from './features/driver/DriverApp';

function CustomerApp() {
  const dispatch = useDispatch();

  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [trackingOrderId, setTrackingOrderId] = useState(null);
  const [reviewOrderId, setReviewOrderId] = useState(null);

  return (
    <>
      <Header onCartClick={() => setShowCart(true)} onAccountClick={() => {}} />

      <HeroSection />
      <MenuSection />
      <BuilderSection />

      <OrdersSection
        onTrackOrder={(orderId) => setTrackingOrderId(orderId)}
        onRateOrder={(orderId) => setReviewOrderId(orderId)}
      />

      <BranchesSection />
      <Footer />

      <CartDrawer
        show={showCart}
        onClose={() => setShowCart(false)}
        onCheckout={() => { setShowCart(false); setShowCheckout(true); }}
      />

      <CheckoutModal
        show={showCheckout}
        onClose={() => setShowCheckout(false)}
        onOrderConfirmed={(order) => {
          dispatch(addOrder(order));
          setConfirmedOrder(order);
          simulateOrderProgress(order.orderId);
        }}
      />

      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      <TrackingModal
        orderId={trackingOrderId}
        onClose={() => setTrackingOrderId(null)}
        onReviewRequested={(orderId) => {
          setTrackingOrderId(null);
          setReviewOrderId(orderId);
        }}
      />

      <ReviewModal
        orderId={reviewOrderId}
        onClose={() => setReviewOrderId(null)}
      />

      <BottomNav onCartClick={() => setShowCart(true)} />
    </>
  );
}

function App() {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  // Not logged in → show ONLY the auth screen, nothing else
  if (!token) {
    return <AuthModal show={true} onClose={() => {}} forceOpen />;
  }

  // Logged in as driver → show driver interface
  if (role === 'driver') {
    return <DriverApp />;
  }

  // Logged in as customer → show the full customer site
  return <CustomerApp />;
}

export default App;