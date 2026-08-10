import { useDispatch } from 'react-redux';
import { logout } from './authSlice';
import { useCustomerMeQuery } from './useCustomerMeQuery';
import { useSelector } from 'react-redux';

const STAGE_LABELS = ['Confirmed', 'Preparing', 'On the way', 'Delivered'];

function ProfileModal({ show, onClose }) {
  const dispatch = useDispatch();
  const { data: customer, isLoading } = useCustomerMeQuery();
  const orders = useSelector((state) => state.orders.items);

  if (!show) return null;

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ position: 'fixed', inset: 0, background: 'rgba(20,6,6,.6)', zIndex: 110 }}
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded"
        style={{ maxWidth: 480, width: '90%', maxHeight: '85vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--maroon-800)' }}>My Account</h3>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        {/* Personal info */}
        {isLoading ? (
          <p className="text-muted">Loading...</p>
        ) : (
          <div className="mb-4">
            <div className="mb-2">
              <small className="text-muted d-block">Name</small>
              <p className="mb-0" style={{ fontWeight: 600 }}>{customer?.fullName}</p>
            </div>
            <div className="mb-2">
              <small className="text-muted d-block">Mobile Number</small>
              <p className="mb-0" style={{ fontWeight: 600 }}>{customer?.phone}</p>
            </div>
            <div className="mb-2">
              <small className="text-muted d-block">Address</small>
              <p className="mb-0" style={{ fontWeight: 600 }}>{customer?.address || '—'}</p>
            </div>
          </div>
        )}

        {/* Order history */}
        <div className="mb-4">
          <h5 style={{ color: 'var(--maroon-800)' }}>Order History</h5>
          {orders.length === 0 ? (
            <p className="text-muted small">No previous orders yet.</p>
          ) : (
            orders.map((order) => (
              <div
                key={order.orderId}
                className="d-flex justify-content-between align-items-center p-2 mb-2"
                style={{ background: 'var(--cream-50)', borderRadius: 12 }}
              >
                <div>
                  <p className="mb-0" style={{ fontWeight: 600, fontSize: 14 }}>Order #{order.orderNumber}</p>
                  <small className="text-muted">{STAGE_LABELS[order.stage]}</small>
                </div>
                <p className="mb-0" style={{ fontWeight: 700, color: 'var(--maroon-800)' }}>{order.total} EGP</p>
              </div>
            ))
          )}
        </div>

        <button
          className="btn w-100"
          style={{ border: '1.5px solid var(--maroon-800)', color: 'var(--maroon-800)', fontWeight: 700 }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileModal;