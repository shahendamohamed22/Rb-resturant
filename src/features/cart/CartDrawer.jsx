import { useSelector, useDispatch } from 'react-redux';
import { changeQuantity, removeItem, selectCartSubtotal } from './cartSlice';

// TODO: delivery fee will come from the selected branch (§7.3 GET /branches)
// hardcoded for now until the branches feature is built

function CartDrawer({ show, onClose, onCheckout }) {

  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const subtotal = useSelector(selectCartSubtotal);
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);
  
  const fee = items.length ? (selectedBranch?.deliveryFee ?? 0) : 0;
  const total = subtotal + fee;

  return (
    <div
      className={`offcanvas offcanvas-start ${show ? 'show' : ''}`}
      style={{ visibility: show ? 'visible' : 'hidden' }}
    >
      <div
        className="offcanvas-header"
        style={{ background: 'var(--maroon-950)', color: 'var(--cream-50)' }}
      >
        <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-400)' }}>
          Your Cart
        </h3>
        <button className="btn-close btn-close-white" onClick={onClose}></button>
      </div>

      <div className="offcanvas-body">
        {items.length === 0 ? (
          <div className="text-center py-5" style={{ color: 'var(--ink-600)' }}>
            🍔<br />Your cart is empty, add something tasty!
          </div>
        ) : (
          items.map((item) => (
            <div key={item.localId} className="d-flex gap-3 border-bottom py-3">
              <div className="flex-grow-1">
                <h5 style={{ color: 'var(--maroon-800)' }}>{item.nameEn}</h5>
                <small style={{ color: 'var(--ink-600)' }}>{item.descEn}</small>
                <div className="d-flex align-items-center gap-2 mt-2">
                  <button
                    className="btn btn-sm border"
                    onClick={() => dispatch(changeQuantity({ localId: item.localId, delta: -1 }))}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="btn btn-sm border"
                    onClick={() => dispatch(changeQuantity({ localId: item.localId, delta: 1 }))}
                  >
                    +
                  </button>
                  <span
                    className="ms-auto text-danger"
                    role="button"
                    onClick={() => dispatch(removeItem(item.localId))}
                  >
                    Remove
                  </span>
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', color: 'var(--maroon-800)' }}>
                {item.price * item.quantity} EGP
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-3 border-top">
        <div className="d-flex justify-content-between">
          <span>Subtotal</span>
          <span>{subtotal} EGP</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Delivery Fee</span>
          <span>{fee} EGP</span>
        </div>
        <div className="d-flex justify-content-between fw-bold fs-5 mt-2">
          <span>Total</span>
          <span style={{ color: 'var(--maroon-800)' }}>{total} EGP</span>
        </div>
        <button
          className="btn w-100 mt-3"
          style={{ background: 'var(--maroon-800)', color: 'var(--gold-300)' }}
          disabled={items.length === 0}
          onClick={onCheckout}
        >
          Checkout & Pay
        </button>
      </div>
    </div>
  );
}

export default CartDrawer;