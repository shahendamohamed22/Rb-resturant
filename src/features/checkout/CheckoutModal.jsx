import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../shared/api/axiosClient';
import { ENDPOINTS } from '../../shared/api/endpoints';
import { selectCartSubtotal, clearCart } from '../cart/cartSlice';

function CheckoutModal({ show, onClose, onOrderConfirmed }) {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);
    const subtotal = useSelector(selectCartSubtotal);
    const selectedBranch = useSelector((state) => state.branch.selectedBranch);
    const customerName = useSelector((state) => state.auth.fullName);

    const [name, setName] = useState(customerName || '');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    if (!show) return null;

    const fee = selectedBranch?.deliveryFee ?? 0;
    const total = subtotal + fee;

    const handleConfirm = async (e) => {
        e.preventDefault();
        if (!name || !phone || !address) {
            setErrorMsg('Please fill in all required fields.');
            return;
        }

        setSubmitting(true);
        setErrorMsg('');

        try {
            const response = await api.post(
                ENDPOINTS.orders,
                {
                    branchId: selectedBranch.id,
                    items: items.map((item) => ({
                        menuItemId: item.menuItemId,
                        quantity: item.quantity,
                        // only sent for custom builder items (menuItemId is null)
                        ...(item.menuItemId === null && {
                            customName: { ar: item.nameAr, en: item.nameEn },
                            customDescription: { ar: item.descAr, en: item.descEn },
                            unitPrice: item.price,
                        }),
                    })),
                    customerName: name,
                    customerPhone: phone,
                    deliveryAddress: address,
                    notes,
                    paymentMethod,
                    subtotal,       
                    deliveryFee: fee, 
                    total,          
                },
                { headers: { 'Idempotency-Key': crypto.randomUUID() } }
            );

            dispatch(clearCart());
            onOrderConfirmed(response.data); // pass the created order up
            onClose();
        } catch (err) {
            setErrorMsg('Something went wrong placing your order. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ position: 'fixed', inset: 0, background: 'rgba(20,6,6,.6)', zIndex: 120 }}
            onClick={onClose}
        >
            <div
                className="bg-white p-4 rounded"
                style={{ maxWidth: 480, width: '90%', maxHeight: '90vh', overflowY: 'auto' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--maroon-800)' }}>Checkout</h3>
                    <button className="btn-close" onClick={onClose}></button>
                </div>

                <form onSubmit={handleConfirm}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mobile Number</label>
                        <input className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Delivery Address</label>
                        <input className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Order notes (optional)</label>
                        <textarea className="form-control" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label d-block">Payment Method</label>
                        <div className="d-flex gap-2">
                            <button
                                type="button"
                                className="btn flex-fill"
                                style={{
                                    border: '1.5px solid var(--maroon-800)',
                                    background: paymentMethod === 'cash' ? 'var(--maroon-800)' : 'transparent',
                                    color: paymentMethod === 'cash' ? '#fff' : 'var(--maroon-800)',
                                }}
                                onClick={() => setPaymentMethod('cash')}
                            >
                                Cash on delivery
                            </button>
                            <button
                                type="button"
                                className="btn flex-fill"
                                style={{
                                    border: '1.5px solid var(--maroon-800)',
                                    background: paymentMethod === 'card' ? 'var(--maroon-800)' : 'transparent',
                                    color: paymentMethod === 'card' ? '#fff' : 'var(--maroon-800)',
                                }}
                                onClick={() => setPaymentMethod('card')}
                            >
                                Card payment
                            </button>
                        </div>
                    </div>

                    <div className="border-top pt-3 mb-3">
                        <div className="d-flex justify-content-between fw-bold fs-5">
                            <span>Amount to pay</span>
                            <span style={{ color: 'var(--maroon-800)' }}>{total} EGP</span>
                        </div>
                    </div>

                    {errorMsg && <p className="text-danger">{errorMsg}</p>}

                    <button
                        type="submit"
                        className="btn w-100"
                        style={{ background: 'var(--gold-500)', color: 'var(--maroon-950)', fontWeight: 800 }}
                        disabled={submitting}
                    >
                        {submitting ? 'Placing order...' : 'Confirm Order'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CheckoutModal;