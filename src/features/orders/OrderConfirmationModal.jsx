function OrderConfirmationModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ position: 'fixed', inset: 0, background: 'rgba(20,6,6,.6)', zIndex: 130 }}
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded text-center"
        style={{ maxWidth: 420, width: '90%' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ color: 'var(--green-600)' }}>✅ Your order has been received</h2>

        <p className="text-muted">Order No.</p>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--maroon-800)' }}>
          #{order.orderNumber}
        </p>

        <p className="text-muted">Estimated arrival time</p>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--gold-500)' }}>
          25–35 min
        </p>

        <button
          className="btn w-100 mt-3"
          style={{ background: 'var(--maroon-800)', color: '#fff' }}
          onClick={onClose}
        >
          OK, thanks
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmationModal;