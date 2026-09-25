import { useOrderDetailQuery } from '../orders/useOrdersQueries';

function PaymentModal({ orderId, iframeUrl, initialStatus, onClose, onPaid }) {
    const { data: order } = useOrderDetailQuery(orderId);

    const currentStatus = order?.payment?.status;

    if (currentStatus && currentStatus !== initialStatus) {
        onPaid();
        return null;
    }

    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ position: 'fixed', inset: 0, background: 'rgba(20,6,6,.75)', zIndex: 200 }}
        >
            <div className="bg-white rounded" style={{ width: '95%', maxWidth: 480, height: '85vh', position: 'relative' }}>
                <button
                    className="btn-close position-absolute"
                    style={{ top: 10, right: 10, zIndex: 1 }}
                    onClick={onClose}
                ></button>
                <iframe
                    src={iframeUrl}
                    title="Payment"
                    style={{ width: '100%', height: '100%', border: 'none', borderRadius: 12 }}
                />
            </div>
        </div>
    );
}

export default PaymentModal;