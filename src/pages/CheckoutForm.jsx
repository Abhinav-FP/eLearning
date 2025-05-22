// components/CheckoutForm.js
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      stripe._options.clientSecret,
      { payment_method: { card: cardElement } }
    );

    setLoading(false);
    if (error) {
      console.error('Payment failed:', error);
      alert(error.message);
    } else {
      console.log('Payment succeeded!', paymentIntent);
      alert('Payment successful!');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <CardElement options={{ hidePostalCode: true }} />
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem'
        }}
      >
        {loading ? 'Processing…' : 'Pay ₹20.00'}
      </button>
    </form>
  );
}
