import { useSelector, useDispatch } from 'react-redux';
import { setCustomerReceived } from './ordersSlice';
import { useCustomerReceivedMutation } from './useCustomerReceivedMutation';


const STAGES = ['Confirmed', 'Preparing', 'On the way', 'Arrived'];

function TrackingModal({ orderId, onClose, onReviewRequested }) {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.orders.items.find((o) => o.orderId === orderId));
    const customerReceivedMutation = useCustomerReceivedMutation();

    if (!order) return null;

    const handleReceived = () => {
        customerReceivedMutation.mutate(orderId, {
            onSuccess: () => onReviewRequested(orderId),
        });
    };

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
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 style={{ color: 'var(--maroon-800)' }}>Order #{order.orderNumber}</h4>
                    <button className="btn-close" onClick={onClose}></button>
                </div>

                {/* Progress bar */}
                <div className="d-flex justify-content-between mb-4">
                    {STAGES.map((label, index) => (
                        <div key={label} className="text-center flex-fill">
                            <div
                                className="mx-auto mb-1 rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                    width: 32,
                                    height: 32,
                                    background: order.stage >= index ? 'var(--green-600)' : 'var(--line)',
                                    color: '#fff',
                                    fontWeight: 700,
                                }}
                            >
                                {order.stage > index ? '✓' : index + 1}
                            </div>
                            <small style={{ color: order.stage >= index ? 'var(--maroon-800)' : '#999' }}>
                                {label}
                            </small>
                        </div>
                    ))}
                </div>

                {order.stage < 3 ? (
                    <p className="text-muted">
                        {order.stage === 0 && 'Confirming your order...'}
                        {order.stage === 1 && 'The chef is preparing your order 👨‍🍳'}
                        {order.stage === 2 && 'Your rider is on the way 🛵'}
                    </p>
                ) : !order.customerReceivedAt ? (
                    <button
                        className="btn w-100"
                        style={{ background: 'var(--green-600)', color: '#fff' }}
                        onClick={handleReceived}
                    >
                        I received my order ✅
                    </button>
                ) : (
                    <p style={{ color: 'var(--green-600)' }}>Delivered ✅</p>
                )}
            </div>
        </div>
    );
}

export default TrackingModal;