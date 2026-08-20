import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from './shared/components/Header';
import Footer from './shared/components/Footer';
import BottomNav from './shared/components/BottomNav';
import CartDrawer from './features/cart/CartDrawer';
import AuthModal from './features/auth/AuthModal';
import ProfileModal from './features/auth/ProfileModal';
import CheckoutModal from './features/checkout/CheckoutModal';
import OrderConfirmationModal from './features/orders/OrderConfirmationModal';
import TrackingModal from './features/orders/TrackingModal';
import ReviewModal from './features/orders/ReviewModal';
import { simulateOrderProgress } from './features/orders/simulateOrderProgress';
import { addOrder } from './features/orders/ordersSlice';
import DriverApp from './features/driver/DriverApp';
import HomeMenu from './features/menu/HomeMenu';

function CustomerApp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [showCart, setShowCart] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [trackingOrderId, setTrackingOrderId] = useState(null);
  const [reviewOrderId, setReviewOrderId] = useState(null);
  const [authIntent, setAuthIntent] = useState(null);
  // account button: logged in → profile, not logged in → login
  const handleAccountClick = () => {
    if (token) {
      setShowProfile(true);
    } else {
      setAuthIntent(null);
      setShowAuth(true);
    }
  };

  // cart's checkout button: logged in → go straight to checkout, else → ask to login first
  const handleCheckoutRequest = () => {
    setShowCart(false);
    if (token) {
      setShowCheckout(true);
    } else {
      setAuthIntent('checkout');
      setShowAuth(true);
    }
  };

  // called after a successful login/signup from AuthModal
  const handleAuthSuccess = () => {
    if (authIntent === 'checkout') {
      setShowCheckout(true);
    }
    setAuthIntent(null);
  };

  return (
    <>
      <div className='page'>
        <Header onCartClick={() => setShowCart(true)} onAccountClick={handleAccountClick} />
        <main className='content' style={{backgroundColor:'var(--cream-50)'}}>
          <Outlet context={{ onTrackOrder: setTrackingOrderId, onRateOrder: setReviewOrderId }} />
        </main>

        <Footer />
      </div>

      <CartDrawer
        show={showCart}
        onClose={() => setShowCart(false)}
        onCheckout={handleCheckoutRequest}
      />

      <AuthModal
        show={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={handleAuthSuccess}
      />

      <ProfileModal
        show={showProfile}
        onClose={() => setShowProfile(false)}
      />

      <CheckoutModal
        show={showCheckout}
        onClose={() => setShowCheckout(false)}
        onOrderConfirmed={(order) => {
          dispatch(addOrder(order));
          setConfirmedOrder(order);
          simulateOrderProgress(order.orderId);
          navigate('/orders');
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
  const role = useSelector((state) => state.auth.role);

  // Driver is still gated — logging in as driver shows only the driver interface
  if (role === 'driver') {
    return <DriverApp />;
  }

  // Everyone else (including guests) sees the full browsable customer site
  return <CustomerApp />;
}

export default App;