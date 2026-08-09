import { useSelector, useDispatch } from 'react-redux';
import { updateOrderStage, markDriverAssigned } from '../orders/ordersSlice';
import { logout } from '../auth/authSlice';


const STAGE_LABELS = ['Confirmed', 'Preparing', 'On the way', 'Delivered'];

function DriverApp() {
    const dispatch = useDispatch();
    const fullName = useSelector((state) => state.auth.fullName);
    const allOrders = useSelector((state) => state.orders.items);

    // "New" = confirmed or preparing, not yet picked up by any driver
    const newOrders = allOrders.filter((o) => o.stage <= 1 && !o.driverAssigned);

    // "Active" = this driver has picked it up (stage 1-2), not delivered yet
    const activeOrders = allOrders.filter((o) => o.driverAssigned && o.stage < 3);

    // "Completed today" = delivered
    const completedOrders = allOrders.filter((o) => o.stage === 3);

    const handleReceive = (orderId) => {
        dispatch(updateOrderStage({ orderId, stage: 1 }));
        dispatch(markDriverAssigned(orderId));
    };

    const handleShip = (orderId) => {
        dispatch(updateOrderStage({ orderId, stage: 2 }));
    };

    const handleDeliver = (orderId) => {
        dispatch(updateOrderStage({ orderId, stage: 3 }));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--cream-50)' }}>
            {/* Driver header */}
            <header style={{ background: 'var(--maroon-950)', color: 'var(--cream-50)' }} className="py-3 mb-4">
                <div className="container d-flex justify-content-between align-items-center">
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-400)', margin: 0 }}>
                            R Burger — Driver
                        </h4>
                        <small style={{ color: 'var(--gold-200)' }}>Welcome, {fullName}</small>
                    </div>
                    <button
                        className="btn btn-sm"
                        style={{ border: '1.5px solid rgba(255,255,255,.3)', color: 'var(--gold-300)' }}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="container pb-5">
                {/* New Orders */}
                <section className="mb-5">
                    <h5 style={{ color: 'var(--maroon-800)' }}>New Orders</h5>
                    {newOrders.length === 0 ? (
                        <p className="text-muted">No new orders right now.</p>
                    ) : (
                        newOrders.map((order) => (
                            <div
                                key={order.orderId}
                                className="d-flex justify-content-between align-items-center p-3 mb-2"
                                style={{ background: '#fff', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)' }}
                            >
                                <div>
                                    <h6 className="mb-1">Order #{order.orderNumber}</h6>
                                    <small className="text-muted">{order.total} EGP — {order.paymentMethod || 'cash'}</small>
                                </div>
                                <button
                                    className="btn btn-sm"
                                    style={{ background: 'var(--blue-600)', color: '#fff' }}
                                    onClick={() => handleReceive(order.orderId)}
                                >
                                    Receive
                                </button>
                            </div>
                        ))
                    )}
                </section>

                {/* Active Orders */}
                <section className="mb-5">
                    <h5 style={{ color: 'var(--maroon-800)' }}>My Active Orders</h5>
                    {activeOrders.length === 0 ? (
                        <p className="text-muted">No active deliveries.</p>
                    ) : (
                        activeOrders.map((order) => (
                            <div
                                key={order.orderId}
                                className="d-flex justify-content-between align-items-center p-3 mb-2"
                                style={{ background: '#fff', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)' }}
                            >
                                <div>
                                    <h6 className="mb-1">Order #{order.orderNumber}</h6>
                                    <span className="badge" style={{ background: 'var(--blue-600)' }}>
                                        {STAGE_LABELS[order.stage]}
                                    </span>
                                </div>
                                {order.stage === 1 && (
                                    <button
                                        className="btn btn-sm"
                                        style={{ background: 'var(--gold-500)', color: 'var(--maroon-950)' }}
                                        onClick={() => handleShip(order.orderId)}
                                    >
                                        Ship
                                    </button>
                                )}
                                {order.stage === 2 && (
                                    <button
                                        className="btn btn-sm"
                                        style={{ background: 'var(--green-600)', color: '#fff' }}
                                        onClick={() => handleDeliver(order.orderId)}
                                    >
                                        Deliver
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </section>

                {/* Completed */}
                <section>
                    <h5 style={{ color: 'var(--maroon-800)' }}>Completed Today</h5>
                    {completedOrders.length === 0 ? (
                        <p className="text-muted">No completed deliveries yet.</p>
                    ) : (
                        completedOrders.map((order) => (
                            <div
                                key={order.orderId}
                                className="d-flex justify-content-between align-items-center p-3 mb-2"
                                style={{ background: '#fff', borderRadius: 'var(--radius-card)', opacity: 0.7 }}
                            >
                                <h6 className="mb-0">Order #{order.orderNumber}</h6>
                                <span className="badge" style={{ background: 'var(--green-600)' }}>Delivered</span>
                            </div>
                        ))
                    )}
                </section>
            </div>
        </div>
    );
}

export default DriverApp;