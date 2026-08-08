import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setOrderReview } from './ordersSlice';
import { useSubmitReviewMutation } from './useSubmitReviewMutation';

function ReviewModal({ orderId, onClose }) {
    const submitReviewMutation = useSubmitReviewMutation();

    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    if (!orderId) return null;

    const handleSubmit = () => {
        if (rating === 0) return;
        submitReviewMutation.mutate(
            { orderId, rating, comment },
            { onSuccess: () => setSubmitted(true) }
        );
    };

    const handleClose = () => {
        setRating(0);
        setComment('');
        setSubmitted(false);
        onClose();
    };

    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ position: 'fixed', inset: 0, background: 'rgba(20,6,6,.6)', zIndex: 140 }}
            onClick={handleClose}
        >
            <div
                className="bg-white p-4 rounded text-center"
                style={{ maxWidth: 380, width: '90%' }}
                onClick={(e) => e.stopPropagation()}
            >
                {!submitted ? (
                    <>
                        <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--maroon-800)' }}>
                            Rate your order
                        </h3>

                        <div className="d-flex justify-content-center gap-1 my-3" style={{ fontSize: 32 }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    role="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    style={{ color: (hoverRating || rating) >= star ? 'var(--gold-500)' : 'var(--line)' }}
                                >
                                    ★
                                </span>
                            ))}
                        </div>

                        <textarea
                            className="form-control mb-3"
                            rows={3}
                            placeholder="Anything you want to say about the order? (optional)"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        <button
                            className="btn w-100"
                            style={{ background: 'var(--gold-500)', color: 'var(--maroon-950)', fontWeight: 800 }}
                            onClick={handleSubmit}
                        >
                            Submit Review
                        </button>
                    </>
                ) : (
                    <>
                        <p style={{ fontSize: 40 }}>🙏</p>
                        <p style={{ color: 'var(--green-600)', fontWeight: 700 }}>
                            Your review has been received, thank you!
                        </p>
                        <button className="btn w-100 mt-2" style={{ background: 'var(--maroon-800)', color: '#fff' }} onClick={handleClose}>
                            Close
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ReviewModal;