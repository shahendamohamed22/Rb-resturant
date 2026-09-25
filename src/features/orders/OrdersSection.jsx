import { useOutletContext } from 'react-router-dom';
import { useMyOrdersQuery } from './useOrdersQueries';
import { useSelector } from 'react-redux';

const STAGE_LABELS = ['Confirmed', 'Preparing', 'On the way', 'Awaiting your confirmation', 'Delivered'];

function OrdersSection() {
    const { onTrackOrder, onRateOrder, onLoginRequest } = useOutletContext();
    const token = useSelector((state) => state.auth.token);
    const { data: orders = [], isLoading, error } = useMyOrdersQuery();

    if (isLoading) return <section id="orders" className="container py-5"><p>Loading...</p></section>;
    if (error) return <section id="orders" className="container py-5"><p>Something went wrong.</p></section>;

    if (!token) {
        return (
            <section id="orders" className="container py-5 text-center">
                <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--maroon-800)' }}>My Orders</h2>
                <p className="text-muted mb-3">Log in to see your orders and track them here.</p>
                <button
                    className="btn"
                    style={{ background: 'var(--maroon-800)', color: 'var(--gold-300)', fontWeight: 800, borderRadius: 10, padding: '10px 24px' }}
                    onClick={onLoginRequest}
                >
                    Log In
                </button>
            </section>
        );
    }

    return (
        <section id="orders" className="container py-5">
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--maroon-800)' }}>My Orders</h2>

            {orders.length === 0 ? (
                <p className="text-muted">You haven't placed any orders yet. Once you order, you'll find all the details here.</p>
            ) : (
                orders.map((order) => (
                    <div
                        key={order.orderId}
                        className="d-flex justify-content-between align-items-center p-3 mb-2"
                        style={{ background: 'var(--cream-50)', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)' }}
                    >
                        <div>
                            <h5>Order #{order.orderNumber} — {order.branchNameAr}</h5>
                            <span className="badge" style={{ background: order.stage === 4 ? 'var(--green-600)' : 'var(--blue-600)' }}>
                                {STAGE_LABELS[order.stage]}
                            </span>
                        </div>
                        <div className="text-end">
                            <p className="mb-1">{order.total} EGP</p>
                            <button
                                className="btn btn-sm"
                                style={{ border: '1px solid var(--maroon-800)', color: 'var(--maroon-800)' }}
                                onClick={() => onTrackOrder(order.orderId)}
                            >
                                Track Order
                            </button>
                            {order.stage === 4 && order.customerReceivedAt && !order.hasReview && (
                                <button
                                    className="btn btn-sm ms-1"
                                    style={{ border: '1px solid var(--gold-500)', color: 'var(--gold-500)' }}
                                    onClick={() => onRateOrder(order.orderId)}
                                >
                                    Rate Order
                                </button>
                            )}
                        </div>
                    </div>
                ))
            )}
        </section>
    );
}

export default OrdersSection;