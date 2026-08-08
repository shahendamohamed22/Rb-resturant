import { useState } from 'react';
import Header from './shared/components/Header';
import CartDrawer from './features/cart/CartDrawer';
import LoginForm from './features/auth/LoginForm';
import MenuSection from './features/menu/MenuSection';
import BuilderSection from './features/builder/BuilderSection';
import BranchesSection from './features/branches/BranchesSection';
import CheckoutModal from './features/checkout/CheckoutModal';
import { useDispatch } from 'react-redux';
import { addOrder } from './features/orders/ordersSlice';
import OrderConfirmationModal from './features/orders/OrderConfirmationModal';
import OrdersSection from './features/orders/OrdersSection';
import { simulateOrderProgress } from './features/orders/simulateOrderProgress';
import TrackingModal from './features/orders/TrackingModal';
import ReviewModal from './features/orders/ReviewModal';
import HeroSection from './shared/components/HeroSection';
import Footer from './shared/components/Footer';
import BottomNav from './shared/components/BottomNav';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const dispatch = useDispatch();
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [trackingOrderId, setTrackingOrderId] = useState(null);
  const [reviewOrderId, setReviewOrderId] = useState(null);

  return (
    <>
      <Header
        onCartClick={() => setShowCart(true)}
        onAccountClick={() => setShowAuth(true)}
      />

      {/* Hero section */}
      <HeroSection />

      <main style={{ backgroundColor: 'var(--cream-50)' }}>

        <MenuSection />

        <BuilderSection />

        <OrdersSection
          onTrackOrder={(orderId) => setTrackingOrderId(orderId)}
          onRateOrder={(orderId) => setReviewOrderId(orderId)}
        />

        <BranchesSection />
      </main>
      {/* Menu section */}

      <Footer />

      {/* Overlays */}
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
      <LoginForm show={showAuth} onClose={() => setShowAuth(false)} />

      <BottomNav onCartClick={() => setShowCart(true)} />
    </>
  );
}

export default App;