import { useMyOrdersQuery } from './useOrdersQueries';

const STAGE_LABELS = ['Confirmed', 'Preparing', 'On the way', 'Delivered'];

function OrdersSection({ onTrackOrder, onRateOrder }) {
    const { data: orders, isLoading, error } = useMyOrdersQuery();

    if (isLoading) return <section id="orders" className="container py-5"><p>Loading...</p></section>;
    if (error) return <section id="orders" className="container py-5"><p>Something went wrong.</p></section>;

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
                            <span className="badge" style={{ background: order.stage === 3 ? 'var(--green-600)' : 'var(--blue-600)' }}>
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
                            {order.stage === 3 && order.customerReceivedAt && !order.hasReview && (
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